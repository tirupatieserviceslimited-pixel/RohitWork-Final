import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from 'firebase/auth';
import { OrderLead, LeadCustomerInfo, LeadOrderItem, LeadStatus } from '../types';
import { products as catalogProducts } from '../data/products';

// Environment variables provided by Vite or Node environment
const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : (typeof process !== 'undefined' && process.env ? process.env : {}) as Record<string, string | undefined>;

export const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyBT0ycRp-gD0TcfzJoa77TgoiLHbTiXTUQ",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "tirupati-emitra-store.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "tirupati-emitra-store",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "tirupati-emitra-store.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "634471107766",
  appId: env.VITE_FIREBASE_APP_ID || "1:634471107766:web:96c1e70f535a96490faa17",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-Z7XRJXBLP1"
};

// Canonical Authorized Admin Constants
export const AUTHORIZED_ADMIN_EMAIL = 'tirupatieserviceslimited@gmail.com';
export const AUTHORIZED_ADMIN_UID = 'OWsO12gthLRICz3d7XPYmXznYNI2';

const LOCAL_STORAGE_LEADS_KEY = 'tirupati_firebase_leads';
const COLLECTION_NAME = 'order_leads';
const ADMINS_COLLECTION = 'admins';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let isConfigured = false;

// Initialize Firebase App, Firestore, and Auth
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
  isConfigured = true;
  console.info('[Firebase] Connected to client project:', firebaseConfig.projectId);
} catch (err) {
  console.error('[Firebase] Initialization error:', err);
  isConfigured = false;
}

export { app, db, auth };

export function isFirebaseConfigured(): boolean {
  return isConfigured && db !== null && auth !== null;
}

// In-memory fallback if localStorage is unavailable
let memoryLeads: OrderLead[] = [];

export function getLocalStoredLeads(): OrderLead[] {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
      if (!raw) return memoryLeads;
      return JSON.parse(raw);
    }
    return memoryLeads;
  } catch (e) {
    console.error('Failed to read local leads store:', e);
    return memoryLeads;
  }
}

function saveLocalStoredLeads(leads: OrderLead[]): void {
  memoryLeads = leads;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
    }
  } catch (e) {
    console.error('Failed to save to local leads store:', e);
  }
}

// Generate unique B2B Reference ID (e.g. TIP-26-48291)
export function generateReferenceId(): string {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const randomPart = Math.floor(10000 + Math.random() * 90000);
  return `TIP-${currentYear}-${randomPart}`;
}

export interface SaveLeadResult {
  success: boolean;
  referenceId: string;
  leadId: string;
  savedToFirebase: boolean;
  error?: string;
}

/**
 * Validates lead customer inputs before submission
 */
export function validateLeadCustomer(customer: LeadCustomerInfo): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!customer.fullName || !customer.fullName.trim()) {
    errors.fullName = 'Full Name is required (ग्राहक का पूरा नाम आवश्यक है)';
  }

  const cleanPhone = (customer.mobileNumber || '').replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length !== 10) {
    errors.mobileNumber = 'Valid 10-digit mobile number required (10 अंकों का मान्य मोबाइल नंबर दर्ज करें)';
  } else if (!/^[6-9]/.test(cleanPhone)) {
    errors.mobileNumber = 'Indian mobile numbers must start with 6, 7, 8, or 9';
  }

  if (!customer.district || !customer.district.trim()) {
    errors.district = 'Please select your Rajasthan District (कृपया जिला चुनें)';
  }

  if (!customer.deliveryAddress || !customer.deliveryAddress.trim() || customer.deliveryAddress.trim().length < 8) {
    errors.deliveryAddress = 'Complete delivery address with landmark required (पूरा पता आवश्यक है)';
  }

  const cleanPincode = (customer.pincode || '').replace(/\D/g, '');
  if (!cleanPincode || cleanPincode.length !== 6) {
    errors.pincode = 'Valid 6-digit postal PIN code required (6 अंकों का पिनकोड)';
  }

  return errors;
}

/**
 * Checks if a given authenticated Firebase user is an authorized admin
 */
export async function checkUserIsAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  // 1. Direct Primary Bootstrap checks
  if (user.uid === AUTHORIZED_ADMIN_UID) return true;
  if (user.email === AUTHORIZED_ADMIN_EMAIL) return true;

  // 2. Firestore Role check in 'admins' collection
  if (db) {
    try {
      const adminDocRef = doc(db, ADMINS_COLLECTION, user.uid);
      const snap = await getDoc(adminDocRef);
      if (snap.exists()) {
        const data = snap.data();
        return data.role === 'admin' && data.active === true;
      }
    } catch (e) {
      console.warn('[Firebase] Role document verification error:', e);
    }
  }

  return false;
}

/**
 * Bootstraps the admin document for the authorized UID in Firestore if missing
 */
export async function ensureAdminRecord(user: User): Promise<void> {
  if (!db || !user) return;
  if (user.uid !== AUTHORIZED_ADMIN_UID && user.email !== AUTHORIZED_ADMIN_EMAIL) return;

  try {
    const adminDocRef = doc(db, ADMINS_COLLECTION, user.uid);
    const snap = await getDoc(adminDocRef);
    if (!snap.exists()) {
      await setDoc(adminDocRef, {
        uid: user.uid,
        email: user.email || AUTHORIZED_ADMIN_EMAIL,
        role: 'admin',
        active: true,
        displayName: 'Tirupati Admin',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.info('[Firebase] Admin role document bootstrapped in Firestore:', user.uid);
    }
  } catch (err) {
    console.warn('[Firebase] Could not bootstrap admin document:', err);
  }
}

/**
 * Admin Email & Password login via Firebase Authentication
 */
export async function adminLogin(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  if (!auth) {
    return { success: false, error: 'Firebase Auth is not initialized.' };
  }

  try {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    const isAdmin = await checkUserIsAdmin(cred.user);

    if (!isAdmin) {
      await signOut(auth);
      return {
        success: false,
        error: `Access Denied: Account (${cred.user.email}) is not authorized for the admin desk.`
      };
    }

    // Ensure Firestore role record exists for this bootstrap admin
    await ensureAdminRecord(cred.user);

    return { success: true, user: cred.user };
  } catch (err: unknown) {
    console.error('[Firebase Auth] Login error:', err);
    let message = 'Login failed. Please check your credentials.';
    const firebaseErr = err as { code?: string; message?: string };
    if (
      firebaseErr.code === 'auth/invalid-credential' ||
      firebaseErr.code === 'auth/wrong-password' ||
      firebaseErr.code === 'auth/user-not-found'
    ) {
      message = 'Incorrect email or password. Please verify your credentials.';
    } else if (firebaseErr.code === 'auth/too-many-requests') {
      message = 'Too many failed login attempts. Access temporarily restricted. Try again later.';
    } else if (firebaseErr.code === 'auth/invalid-email') {
      message = 'Please enter a valid email address.';
    } else if (firebaseErr.message) {
      message = firebaseErr.message;
    }
    return { success: false, error: message };
  }
}

/**
 * Admin Logout
 */
export async function adminLogout(): Promise<void> {
  if (auth) {
    await signOut(auth);
  }
  sessionStorage.removeItem('tirupati_admin_auth');
}

/**
 * Subscribe to Admin Auth State changes
 */
export function subscribeToAdminAuth(
  callback: (user: User | null, isAdmin: boolean) => void
): () => void {
  if (!auth) {
    callback(null, false);
    return () => {};
  }

  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const isAdmin = await checkUserIsAdmin(user);
      if (isAdmin) {
        await ensureAdminRecord(user);
      }
      callback(user, isAdmin);
    } else {
      callback(null, false);
    }
  });
}

/**
 * Creates and saves a new order lead to Firebase Firestore
 * Strictly enforces Cash on Delivery, New Lead status, and pending payment.
 */
export async function createOrderLead(data: {
  customer: LeadCustomerInfo;
  items: LeadOrderItem[];
  pricing: {
    subtotal: number;
    shippingFee: number;
    grandTotal: number;
    taxNote?: string;
  };
  paymentMethod?: string;
}): Promise<SaveLeadResult> {
  const referenceId = generateReferenceId();
  const now = new Date();
  const createdAtIso = now.toISOString();

  // Validate items against authoritative catalog where supported
  let calculatedSubtotal = 0;
  const verifiedItems: LeadOrderItem[] = data.items.map((item) => {
    const catalogMatch = catalogProducts.find(
      (p) => p.id === item.productId || p.sku === item.sku
    );
    const productId = item.productId || (catalogMatch ? catalogMatch.id : '') || 'item_unknown';
    const productName = (catalogMatch ? catalogMatch.name : item.productName) || 'eMitra Stationery Item';
    const sku = (catalogMatch ? catalogMatch.sku : item.sku) || productId;
    const specification = (catalogMatch ? catalogMatch.specification : item.specification) || 'Standard Pack';
    const image = item.image || (catalogMatch ? catalogMatch.images[0] : '') || '';
    const quantity = Math.max(1, Number(item.quantity) || 1);
    const unitPrice = Math.max(0, Number(catalogMatch ? catalogMatch.price : item.unitPrice) || 0);
    const totalPrice = unitPrice * quantity;
    calculatedSubtotal += totalPrice;

    return {
      productId,
      productName,
      sku,
      specification,
      image,
      quantity,
      unitPrice,
      totalPrice,
    };
  });

  const finalSubtotal = calculatedSubtotal > 0 ? calculatedSubtotal : data.pricing.subtotal;
  const shippingFee = finalSubtotal >= 1500 ? 0 : 60;
  const finalTotal = finalSubtotal + shippingFee;

  const cleanMobile = data.customer.mobileNumber.replace(/\D/g, '').trim();
  const cleanPincode = data.customer.pincode.replace(/\D/g, '').trim();

  const newLead: OrderLead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    referenceId,
    orderId: referenceId,
    createdAt: createdAtIso,
    createdAtTimestamp: now.getTime(),
    status: 'New Lead',
    leadStatus: 'new',
    paymentMethod: 'COD',
    paymentStatus: 'pending',
    orderTotal: finalSubtotal,
    deliveryFee: shippingFee,
    finalAmount: finalTotal,
    customer: {
      fullName: data.customer.fullName.trim(),
      mobileNumber: cleanMobile,
      shopName: (data.customer.shopName || '').trim(),
      emitraId: (data.customer.emitraId || '').trim(),
      district: data.customer.district.trim(),
      deliveryAddress: data.customer.deliveryAddress.trim(),
      pincode: cleanPincode,
      orderNotes: (data.customer.orderNotes || '').trim(),
    },
    items: verifiedItems,
    pricing: {
      subtotal: finalSubtotal,
      shippingFee,
      grandTotal: finalTotal,
      taxNote: data.pricing.taxNote || 'Inclusive of all taxes',
    },
    adminNotes: '',
    source: 'Web Kiosk Portal',
  };

  // Direct Firestore Write (Narrowly Scoped creation rules)
  if (!isConfigured || !db) {
    return {
      success: false,
      referenceId: '',
      leadId: '',
      savedToFirebase: false,
      error: 'Firebase Firestore is not initialized on this client.'
    };
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      referenceId: newLead.referenceId,
      orderId: newLead.orderId,
      createdAt: serverTimestamp(),
      createdAtIso: newLead.createdAt,
      createdAtTimestamp: newLead.createdAtTimestamp,
      status: 'New Lead',
      leadStatus: 'new',
      paymentMethod: 'COD',
      paymentStatus: 'pending',
      orderTotal: newLead.orderTotal,
      deliveryFee: newLead.deliveryFee,
      finalAmount: newLead.finalAmount,
      customer: newLead.customer,
      items: newLead.items,
      pricing: newLead.pricing,
      adminNotes: '',
      source: newLead.source,
      priceVerification: 'authoritative_catalog_validated',
    });

    const firestoreDocId = docRef.id;
    newLead.id = firestoreDocId;
    newLead.savedToFirebase = true;
    console.info('[Firebase] Lead stored in Firestore successfully:', firestoreDocId);

    // Save into local cache for user's immediate confirmation receipt
    try {
      const existing = getLocalStoredLeads();
      existing.unshift(newLead);
      saveLocalStoredLeads(existing);
    } catch (e) {
      console.error('Failed to update local cache:', e);
    }

    return {
      success: true,
      referenceId,
      leadId: firestoreDocId,
      savedToFirebase: true,
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    console.error('[Firebase] Firestore write failed:', err);
    return {
      success: false,
      referenceId: '',
      leadId: '',
      savedToFirebase: false,
      error: errMessage
    };
  }
}

/**
 * Fetches all order leads for the admin area from Cloud Firestore
 */
export async function getAllOrderLeads(): Promise<OrderLead[]> {
  if (!isConfigured || !db) {
    return getLocalStoredLeads();
  }

  let snapshot;
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    snapshot = await getDocs(q);
  } catch (orderErr: unknown) {
    console.warn('[Firebase] Query with orderBy failed, attempting base collection query:', orderErr);
    snapshot = await getDocs(collection(db, COLLECTION_NAME));
  }

  const remoteLeads: OrderLead[] = [];
  snapshot.forEach((docSnap) => {
    const d = docSnap.data();
    remoteLeads.push({
      id: docSnap.id,
      referenceId: d.referenceId || docSnap.id,
      orderId: d.orderId || d.referenceId || docSnap.id,
      createdAt: d.createdAtIso || (d.createdAt?.toDate ? d.createdAt.toDate().toISOString() : new Date().toISOString()),
      createdAtTimestamp: d.createdAtTimestamp || (d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now()),
      status: (d.status as LeadStatus) || 'New Lead',
      leadStatus: d.leadStatus || 'new',
      paymentMethod: d.paymentMethod || 'COD',
      paymentStatus: (d.paymentStatus as 'pending' | 'collected') || 'pending',
      orderTotal: d.orderTotal || d.pricing?.subtotal || 0,
      deliveryFee: d.deliveryFee || d.pricing?.shippingFee || 0,
      finalAmount: d.finalAmount || d.pricing?.grandTotal || 0,
      customer: d.customer,
      items: d.items || [],
      pricing: d.pricing || { subtotal: 0, shippingFee: 0, grandTotal: 0 },
      adminNotes: d.adminNotes || '',
      source: d.source || 'Web Kiosk Portal',
      updatedAt: d.updatedAt,
    });
  });

  // Client-side sort descending by timestamp for resilience
  remoteLeads.sort((a, b) => (b.createdAtTimestamp || 0) - (a.createdAtTimestamp || 0));
  return remoteLeads;
}

/**
 * Updates status, payment status, or admin notes for a specific lead
 */
export async function updateLeadStatus(
  leadId: string,
  referenceId: string,
  status: LeadStatus,
  adminNotes?: string,
  paymentStatus?: 'pending' | 'collected'
): Promise<boolean> {
  if (isConfigured && db && leadId) {
    try {
      const docRef = doc(db, COLLECTION_NAME, leadId);
      const updatePayload: Record<string, unknown> = {
        status,
        updatedAt: new Date().toISOString(),
      };
      if (adminNotes !== undefined) {
        updatePayload.adminNotes = adminNotes;
      }
      if (paymentStatus !== undefined) {
        updatePayload.paymentStatus = paymentStatus;
      }
      await updateDoc(docRef, updatePayload);
      return true;
    } catch (err) {
      console.warn('[Firebase] Failed to update Firestore lead status:', err);
      return false;
    }
  }

  return false;
}

/**
 * Find single lead by reference ID (reads local cache)
 */
export async function getLeadByReferenceId(referenceId: string): Promise<OrderLead | null> {
  const localLeads = getLocalStoredLeads();
  const match = localLeads.find((l) => l.referenceId.toLowerCase() === referenceId.toLowerCase());
  return match || null;
}
