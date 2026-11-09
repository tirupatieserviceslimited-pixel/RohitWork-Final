export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryId: string;
  sku: string;
  specification: string; // Short factual specification
  price: number; // Selling price in INR
  mrp?: number; // MRP when available
  stockStatus: StockStatus;
  images: string[];
  description: string;
  features?: string[];
  specifications?: ProductSpecification[];
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isLatest?: boolean;
  taxLabel?: string; // e.g. "Tax included"
  sourceUrl?: string; // Source URL for catalog traceability
}

export interface Category {
  id: string;
  name: string;
  subtitle?: string;
  slug: string;
  description: string;
  image: string;
  iconName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  sku: string;
  specification: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  orderId: string;
  date: string;
  items: OrderItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  };
  pricing: {
    subtotal: number;
    shippingFee: number;
    grandTotal: number;
  };
  paymentMethod: string;
  status: 'Order Placed' | 'Processing' | 'Dispatched' | 'Delivered';
  estimatedDelivery: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  date: string;
  rating: number; // 1 to 5
  comment: string;
  verifiedPurchase: boolean;
}

export type LeadStatus =
  | 'New Lead'
  | 'Contacted'
  | 'Quoted'
  | 'Confirmed'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled';

export interface LeadCustomerInfo {
  fullName: string;
  mobileNumber: string;
  shopName?: string;
  emitraId?: string;
  district: string;
  deliveryAddress: string;
  pincode: string;
  orderNotes?: string;
}

export interface LeadOrderItem {
  productId: string;
  productName: string;
  sku: string;
  specification: string;
  image: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderLead {
  id: string;
  referenceId: string;
  orderId?: string;
  createdAt: string;
  createdAtTimestamp?: number;
  status: LeadStatus;
  leadStatus?: string;
  paymentMethod: 'COD' | string;
  paymentStatus: 'pending' | 'collected';
  orderTotal?: number;
  deliveryFee?: number;
  finalAmount?: number;
  customer: LeadCustomerInfo;
  items: LeadOrderItem[];
  pricing: {
    subtotal: number;
    shippingFee: number;
    grandTotal: number;
    taxNote?: string;
  };
  adminNotes?: string;
  updatedAt?: string;
  source: string;
  savedToFirebase?: boolean;
}

