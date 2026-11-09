import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { createOrderLead, validateLeadCustomer, isFirebaseConfigured } from '../services/firebase';
import { LeadCustomerInfo, LeadOrderItem, OrderLead } from '../types';

const RAJASTHAN_DISTRICTS = [
  'Jaipur City',
  'Jaipur Rural',
  'Jodhpur City',
  'Jodhpur Rural',
  'Kota',
  'Bikaner',
  'Ajmer',
  'Udaipur',
  'Alwar',
  'Bhilwara',
  'Sikar',
  'Sri Ganganagar',
  'Barmer',
  'Bharatpur',
  'Pali',
  'Nagaur',
  'Hanumangarh',
  'Churu',
  'Jhunjhunu',
  'Chittorgarh',
  'Tonk',
  'Sawai Madhopur',
  'Dausa',
  'Dholpur',
  'Karauli',
  'Baran',
  'Bundi',
  'Jhalawar',
  'Jalore',
  'Sirohi',
  'Banswara',
  'Dungarpur',
  'Pratapgarh',
  'Rajsamand',
  'Beawar',
  'Balotra',
  'Deeg',
  'Didwana-Kuchaman',
  'Kotputli-Behror',
  'Neem Ka Thana',
  'Phalodi',
  'Salumbar',
  'Sanchore',
  'Shahpura',
  'Other / Outside Rajasthan'
];

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, shippingFee, grandTotal, clearCart } = useCart();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LeadCustomerInfo>({
    fullName: '',
    mobileNumber: '',
    shopName: '',
    emitraId: '',
    district: 'Jaipur City',
    deliveryAddress: '',
    pincode: '',
    orderNotes: ''
  });

  const [claimGst, setClaimGst] = useState(false);
  const [gstEntityName, setGstEntityName] = useState('');
  const [gstinNumber, setGstinNumber] = useState('');

  const [pincodeVerified, setPincodeVerified] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showFirebasePendingModal, setShowFirebasePendingModal] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="w-full bg-surface-container-low min-h-[calc(100vh-280px)] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center bg-surface-container-lowest rounded-xl p-8 shadow-xs border border-outline-variant flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline mb-space-md">
            <span className="material-symbols-outlined text-[36px]">receipt_long</span>
          </div>
          <h2 className="font-section-heading text-[22px] font-bold text-on-surface mb-2">
            Your Order Request is Empty
          </h2>
          <p className="font-body-compact text-[13px] text-on-surface-variant max-w-sm mb-space-lg leading-relaxed">
            Please add eMitra paper reams, PVC cards, lamination films, or consumables to submit an order request.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/products"
              className="h-11 px-space-xl bg-primary text-on-primary font-metadata-label text-[13px] font-bold rounded-lg flex items-center gap-space-xs hover:bg-primary-container transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              <span>Browse Products</span>
            </Link>
            <Link
              to="/order-confirmation/DEMO-TIP-26-88421?demo=true"
              className="h-11 px-4 bg-surface-container hover:bg-surface-container-high text-on-surface font-metadata-label text-[13px] font-semibold rounded-lg flex items-center gap-1 border border-outline-variant transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Preview Demo Confirmation</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const checkPincodeServiceability = () => {
    const pin = formData.pincode.trim();
    if (pin.length === 6 && /^\d+$/.test(pin)) {
      setPincodeVerified(true);
    } else {
      setPincodeVerified(false);
    }
  };

  const freeDeliveryThreshold = 1500;
  const freeDeliveryRemaining = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const prepareLeadPayload = (): OrderLead => {
    const leadItems: LeadOrderItem[] = cart.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      sku: item.product.sku,
      specification: item.product.specification,
      image: item.product.images[0] || '',
      quantity: item.quantity,
      unitPrice: item.product.price,
      totalPrice: item.product.price * item.quantity
    }));

    const combinedNotes = [
      formData.orderNotes?.trim() || '',
      claimGst && gstinNumber ? `[B2B GSTIN: ${gstinNumber.toUpperCase()} | Entity: ${gstEntityName || formData.shopName}]` : '',
      `[Payment: Cash on Delivery (COD)]`
    ].filter(Boolean).join('\n');

    const finalShipping = subtotal >= freeDeliveryThreshold ? 0 : shippingFee;
    const finalTotal = subtotal >= freeDeliveryThreshold ? subtotal : grandTotal;

    return {
      id: 'demo_lead_' + Date.now(),
      referenceId: 'DEMO-TIP-26-88421',
      orderId: 'DEMO-TIP-26-88421',
      createdAt: new Date().toISOString(),
      createdAtTimestamp: Date.now(),
      status: 'New Lead',
      leadStatus: 'new',
      paymentMethod: 'COD',
      paymentStatus: 'pending',
      orderTotal: subtotal,
      deliveryFee: finalShipping,
      finalAmount: finalTotal,
      customer: {
        fullName: formData.fullName || 'Ramesh Chandra Sharma',
        mobileNumber: formData.mobileNumber || '9414012345',
        shopName: formData.shopName || '',
        emitraId: formData.emitraId || '',
        district: formData.district || 'Jaipur City',
        deliveryAddress: formData.deliveryAddress || 'Shop 12, Main Market, Tonk Road',
        pincode: formData.pincode || '302015',
        orderNotes: combinedNotes
      },
      items: leadItems,
      pricing: {
        subtotal,
        shippingFee: finalShipping,
        grandTotal: finalTotal,
        taxNote: 'Inclusive of all taxes'
      },
      source: 'Demo Preview Session',
      savedToFirebase: false
    };
  };

  const handleLaunchDemoConfirmation = () => {
    const demoPayload = prepareLeadPayload();
    sessionStorage.setItem('tirupati_demo_order', JSON.stringify(demoPayload));
    navigate('/order-confirmation/DEMO-TIP-26-88421?demo=true');
  };

  const handleSubmitOrderRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate inputs
    const formErrors = validateLeadCustomer(formData);
    if (claimGst && gstinNumber && gstinNumber.trim().length !== 15) {
      formErrors.gstin = 'Please enter a valid 15-character GSTIN';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setSubmissionError('Please fill in all required delivery fields highlighted in red.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setSubmissionError(null);

    const leadPayload = prepareLeadPayload();

    setIsSubmitting(true);
    try {
      const result = await createOrderLead({
        customer: leadPayload.customer,
        items: leadPayload.items,
        pricing: leadPayload.pricing
      });

      // Show success and reference ID only after Firebase confirms the write
      if (result.success && result.savedToFirebase) {
        // Cache in sessionStorage for receipt view without public read query
        sessionStorage.setItem('tirupati_last_order_' + result.referenceId, JSON.stringify({
          ...leadPayload,
          id: result.leadId,
          referenceId: result.referenceId,
          savedToFirebase: true
        }));
        clearCart();
        navigate(`/order-confirmation/${result.referenceId}`);
      } else {
        // Keep form data and cart intact on failure
        let userFacingError = result.error || 'Cloud Firestore write could not be confirmed. Your cart items and address are preserved. Please verify network and try again.';
        if (result.error && (result.error.includes('Missing or insufficient permissions') || result.error.includes('permission-denied') || result.error.includes('PERMISSION_DENIED'))) {
          userFacingError = 'Database write permission denied: Security rules in Firebase Console (tirupati-emitra-store) have not permitted guest order writes yet. Your cart and entered address remain safely preserved.';
        }
        setSubmissionError(userFacingError);
      }
    } catch (err: unknown) {
      console.error('Order lead submission failed:', err);
      const rawMsg = err instanceof Error ? err.message : 'Database submission failed. Please try again.';
      let userFacingError = rawMsg;
      if (rawMsg.includes('Missing or insufficient permissions') || rawMsg.includes('permission-denied') || rawMsg.includes('PERMISSION_DENIED')) {
        userFacingError = 'Database write permission denied: Security rules in Firebase Console (tirupati-emitra-store) have not permitted guest order writes yet. Your cart and entered address remain safely preserved.';
      }
      setSubmissionError(userFacingError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-surface-container-low min-h-screen pb-16">
      {/* SECURE CHECKOUT STRIP */}
      <div className="w-full bg-[#0e4b9c]/5 border-b border-[#0e4b9c]/10 py-2 px-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[12px] text-slate-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            <span>
              <strong>Direct Kiosk Dispatch:</strong> Cash on Delivery wholesale order connected to central logistics.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">No advance online payment required</span>
        </div>
      </div>

      {/* 1. TOP CHECKOUT CONTEXT BAR */}
      <div className="w-full bg-surface-container-lowest shadow-xs border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop h-16 flex items-center justify-between">
          <div className="flex items-center gap-space-md">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div>
              <span className="font-product-title text-[15px] text-on-surface font-bold tracking-tight block">
                Tirupati International Services Limited
              </span>
              <span className="font-caption-micro text-[11px] text-on-surface-variant tracking-wider block">
                Rajasthan B2B Kiosk Procurement • Fast Guest Checkout
              </span>
            </div>
          </div>

          <Link
            to="/cart"
            className="flex items-center gap-space-xs font-metadata-label text-[13px] text-primary hover:text-on-primary-fixed-variant transition-colors group font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span>Return to Cart</span>
          </Link>
        </div>
      </div>

      {/* 2. CHECKOUT STEPPER PROGRESS RIBBON */}
      <div className="w-full bg-surface-container-low py-3 border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop">
          <div className="flex items-center justify-center gap-space-md sm:gap-space-lg text-[13px]">
            {/* Step 1: Active */}
            <div className="flex items-center gap-space-xs sm:gap-space-sm">
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-caption-micro text-[11px] font-bold shadow-xs">
                1
              </div>
              <span className="font-metadata-label font-bold text-primary">Delivery Details</span>
            </div>
            <div className="w-8 sm:w-16 h-0.5 bg-primary rounded-full"></div>

            {/* Step 2: Confirmation Pending */}
            <div className="flex items-center gap-space-xs sm:gap-space-sm text-on-surface-variant">
              <div className="w-6 h-6 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-caption-micro text-[11px] font-semibold">
                2
              </div>
              <span className="font-metadata-label">Order Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN CHECKOUT CONTENT (62% Left / 38% Right) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-margin-desktop py-space-lg">
        {submissionError && (
          <div className="mb-space-lg p-space-md bg-error-container text-on-error-container rounded-xl flex items-center gap-space-sm border border-error/30 text-[13px]">
            <span className="material-symbols-outlined text-[20px] text-error">error</span>
            <span>{submissionError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* LEFT COLUMN (62% - lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Guest Banner Notification */}
            <div className="bg-secondary-fixed/50 p-space-md rounded-xl flex items-start gap-space-md shadow-xs border border-secondary-container/60">
              <span className="material-symbols-outlined text-primary text-[24px] mt-0.5">badge</span>
              <div className="flex flex-col">
                <h2 className="font-product-title text-[15px] text-on-secondary-fixed font-bold">
                  Express Kiosk Guest Request
                </h2>
                <p className="font-body-compact text-[13px] text-on-secondary-fixed-variant mt-0.5">
                  No login required. Enter your kiosk details and shipping address. Our Jaipur commercial desk will confirm your consignment and issue a B2B GST tax invoice.
                </p>
              </div>
            </div>

            {/* SECTION 1: Contact & Shipping Consignee */}
            <section className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-xs flex flex-col gap-space-md border border-outline-variant">
              <div className="flex items-center gap-space-sm pb-space-xs border-b border-surface-container">
                <span className="material-symbols-outlined text-primary text-[22px]">local_shipping</span>
                <h2 className="font-subheading text-[18px] text-on-surface font-bold">
                  1. Contact & Shipping Consignee
                </h2>
              </div>

              <form onSubmit={handleSubmitOrderRequest} id="checkout-lead-form" className="flex flex-col gap-space-md">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="fullName">
                    Consignee / Full Name <span className="text-error">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra Sharma"
                    className={`h-10 px-space-md bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline text-[14px] border ${
                      errors.fullName ? 'border-error ring-1 ring-error' : 'border-outline-variant focus:border-primary'
                    } outline-none transition-all`}
                  />
                  {errors.fullName && (
                    <span className="font-caption-micro text-[11px] text-error">{errors.fullName}</span>
                  )}
                </div>

                {/* Grid: Phone & Shop Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {/* Mobile Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="mobileNo">
                      Mobile Number (for SMS & Verification) <span className="text-error">*</span>
                    </label>
                    <div className="flex items-center rounded-lg bg-surface-container-low border border-outline-variant focus-within:border-primary transition-all overflow-hidden">
                      <span className="px-3 text-[13px] font-semibold text-on-surface-variant bg-surface-container border-r border-outline-variant">
                        +91
                      </span>
                      <input
                        id="mobileNo"
                        type="tel"
                        maxLength={10}
                        required
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                        placeholder="10-digit mobile number"
                        className="h-10 px-3 bg-transparent w-full text-on-surface placeholder:text-outline text-[14px] outline-none"
                      />
                    </div>
                    {errors.mobileNumber && (
                      <span className="font-caption-micro text-[11px] text-error">{errors.mobileNumber}</span>
                    )}
                  </div>

                  {/* Shop / Firm Name (Optional) */}
                  <div className="flex flex-col gap-1">
                    <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="shopName">
                      Shop / eMitra Kiosk Name <span className="text-outline font-normal">(Optional)</span>
                    </label>
                    <input
                      id="shopName"
                      type="text"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      placeholder="e.g. Sharma eMitra & Stationery"
                      className="h-10 px-space-md bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline text-[14px] border border-outline-variant focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Grid: eMitra ID & District */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  {/* eMitra Kiosk ID */}
                  <div className="flex flex-col gap-1">
                    <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="emitraId">
                      eMitra Kiosk ID <span className="text-outline font-normal">(Optional)</span>
                    </label>
                    <input
                      id="emitraId"
                      type="text"
                      value={formData.emitraId}
                      onChange={(e) => setFormData({ ...formData, emitraId: e.target.value.toUpperCase() })}
                      placeholder="e.g. RJ-JAI-10482"
                      className="h-10 px-space-md bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline text-[14px] border border-outline-variant focus:border-primary outline-none transition-all uppercase font-mono"
                    />
                  </div>

                  {/* District Dropdown */}
                  <div className="flex flex-col gap-1">
                    <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="district">
                      Rajasthan District <span className="text-error">*</span>
                    </label>
                    <select
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="h-10 px-space-md bg-surface-container-low rounded-lg text-on-surface text-[14px] border border-outline-variant focus:border-primary outline-none transition-all"
                    >
                      {RAJASTHAN_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* PIN Code Verification Row */}
                <div className="flex flex-col gap-1">
                  <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="pincode">
                    Postal PIN Code <span className="text-error">*</span>
                  </label>
                  <div className="flex items-center gap-space-sm">
                    <input
                      id="pincode"
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => {
                        setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') });
                        setPincodeVerified(null);
                      }}
                      placeholder="6-digit PIN code"
                      className={`h-10 w-44 px-space-md bg-surface-container-low rounded-lg text-on-surface text-[15px] font-mono border ${
                        errors.pincode ? 'border-error ring-1 ring-error' : 'border-outline-variant focus:border-primary'
                      } outline-none transition-all`}
                    />
                    <button
                      type="button"
                      onClick={checkPincodeServiceability}
                      className="h-10 px-space-md bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container font-metadata-label text-[13px] rounded-lg font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      <span>Check Serviceability</span>
                    </button>
                  </div>
                  {pincodeVerified === true && (
                    <div className="mt-1 flex items-center gap-1 text-[12px] text-[#12B76A] font-semibold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>PIN code {formData.pincode} verified: Regular courier dispatch available across Rajasthan.</span>
                    </div>
                  )}
                  {pincodeVerified === false && (
                    <div className="mt-1 flex items-center gap-1 text-[12px] text-error font-medium">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      <span>Please enter a valid 6-digit Indian PIN code.</span>
                    </div>
                  )}
                  {errors.pincode && (
                    <span className="font-caption-micro text-[11px] text-error">{errors.pincode}</span>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="flex flex-col gap-1">
                  <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="deliveryAddress">
                    Complete Kiosk / Delivery Address <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="deliveryAddress"
                    rows={2}
                    required
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    placeholder="Shop No., Near Landmark, Main Market, Tehsil / City"
                    className={`px-space-md py-2 bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline text-[14px] border ${
                      errors.deliveryAddress ? 'border-error ring-1 ring-error' : 'border-outline-variant focus:border-primary'
                    } outline-none transition-all resize-none`}
                  />
                  {errors.deliveryAddress && (
                    <span className="font-caption-micro text-[11px] text-error">{errors.deliveryAddress}</span>
                  )}
                </div>

                {/* Optional B2B GSTIN Claim Toggle */}
                <div className="mt-space-xs bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm border border-outline-variant/60">
                  <label className="flex items-center gap-space-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={claimGst}
                      onChange={(e) => setClaimGst(e.target.checked)}
                      className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                    />
                    <span className="font-metadata-label text-[13px] font-semibold text-on-surface">
                      Claim GST Input Tax Credit (Need B2B Tax Invoice? Enter GSTIN)
                    </span>
                  </label>

                  {claimGst && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-2 border-t border-surface-container">
                      <div className="flex flex-col gap-1">
                        <label className="font-caption-micro text-[11px] uppercase font-semibold text-on-surface-variant">
                          Registered Firm / Business Name
                        </label>
                        <input
                          type="text"
                          value={gstEntityName}
                          onChange={(e) => setGstEntityName(e.target.value)}
                          placeholder="e.g. Tirupati Kiosk & Tech Solutions"
                          className="h-9 px-space-md bg-surface-container-lowest rounded-lg text-on-surface text-[13px] border border-outline-variant outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-caption-micro text-[11px] uppercase font-semibold text-on-surface-variant">
                          GSTIN (15 Digits Alpha-Numeric)
                        </label>
                        <input
                          type="text"
                          maxLength={15}
                          value={gstinNumber}
                          onChange={(e) => setGstinNumber(e.target.value.toUpperCase())}
                          placeholder="08AAAAA0000A1Z5"
                          className="h-9 px-space-md bg-surface-container-lowest rounded-lg text-on-surface text-[13px] font-mono uppercase tracking-wider border border-outline-variant outline-none focus:border-primary"
                        />
                        {errors.gstin && (
                          <span className="font-caption-micro text-[11px] text-error">{errors.gstin}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Delivery Instructions / Order Note */}
                <div className="flex flex-col gap-1">
                  <label className="font-metadata-label text-[13px] text-on-surface font-semibold" htmlFor="orderNotes">
                    Order Note / Special Dispatch Instructions <span className="text-outline font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="orderNotes"
                    rows={2}
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    placeholder="Mention preferred transport, urgent dispatch need, or kiosk timing..."
                    className="px-space-md py-2 bg-surface-container-low rounded-lg text-on-surface placeholder:text-outline text-[13px] border border-outline-variant focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </form>
            </section>

            {/* SECTION 2: Payment Method - Cash on Delivery Only */}
            <section className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-xs flex flex-col gap-space-md border border-outline-variant">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[22px]">payments</span>
                  <h2 className="font-subheading text-[18px] text-on-surface font-bold">
                    2. Payment Method
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#027A48] font-caption-micro font-bold bg-[#ECFDF3] px-2.5 py-0.5 rounded-full border border-[#D1FADF]">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>100% Risk Free</span>
                </div>
              </div>

              {/* Locked Single Payment Option: Cash on Delivery */}
              <div className="p-4 rounded-xl bg-secondary-fixed/30 border border-primary ring-1 ring-primary flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <span className="material-symbols-outlined text-[22px]">payments</span>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-product-title text-[15px] font-bold text-on-surface">
                      Cash on Delivery — Pay when your order is delivered
                    </span>
                    <span className="text-[11px] font-bold text-primary bg-surface-container-lowest px-2 py-0.5 rounded border border-outline-variant/60">
                      COD Only
                    </span>
                  </div>
                  <p className="font-body-compact text-[13px] text-on-surface-variant mt-1 leading-relaxed">
                    Pay in cash upon physical delivery of sealed stationery cartons directly at your kiosk or shop across Rajasthan. No advance payment, card, UPI, or net banking needed.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-primary/20 flex items-center gap-2 text-xs text-[#027A48] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>Order verified by customer desk telephone call before dispatch.</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (38% - lg:col-span-5, Sticky Order Review) */}
          <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-8">
            <div className="bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-xs flex flex-col gap-space-md border border-outline-variant">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <h2 className="font-subheading text-[18px] text-on-surface font-bold">Order Summary</h2>
                <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-fixed px-2 py-0.5 rounded">
                  {cart.length} {cart.length === 1 ? 'Line Item' : 'Line Items'}
                </span>
              </div>

              {/* Items Preview */}
              <div className="flex flex-col gap-space-sm max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-space-sm p-2 rounded-lg bg-surface-container-low border border-outline-variant/60"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container-lowest shrink-0 p-1 flex items-center justify-center border border-outline-variant/40">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h3 className="font-product-title text-[13px] text-on-surface font-semibold truncate">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-caption-micro text-[11px] text-on-surface-variant">
                          Qty: {item.quantity} ({item.product.specification})
                        </span>
                        <span className="font-metadata-label text-[13px] text-on-surface font-bold">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs border border-outline-variant/60">
                <div className="flex items-center justify-between font-caption-micro text-[11px]">
                  <span className="text-on-surface font-semibold">Free Express Courier at ₹1,500</span>
                  <span className="text-primary font-bold">
                    {freeDeliveryRemaining > 0 ? `₹${freeDeliveryRemaining} remaining` : 'Free Shipping Unlocked!'}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  ></div>
                </div>
                <span className="font-caption-micro text-[10px] text-on-surface-variant">
                  {freeDeliveryRemaining > 0
                    ? `Add ₹${freeDeliveryRemaining} more to qualify for complimentary courier delivery.`
                    : 'Your consignment qualifies for zero delivery surcharge!'}
                </span>
              </div>

              {/* Price Calculation Breakdown */}
              <div className="flex flex-col gap-space-xs py-space-xs text-[13px] font-body-compact border-t border-b border-surface-container">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Item Subtotal</span>
                  <span className="text-on-surface font-semibold font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Logistics & Courier Delivery</span>
                  <span className="text-on-surface font-semibold">
                    {subtotal >= freeDeliveryThreshold ? (
                      <span className="text-[#12B76A] font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>GST (18% Integrated CGST/SGST)</span>
                  <span className="text-on-surface-variant font-medium">Included in Subtotal</span>
                </div>
              </div>

              {/* Total Payable */}
              <div className="flex items-baseline justify-between pt-1">
                <div className="flex flex-col">
                  <span className="font-product-title text-[16px] text-on-surface font-bold">
                    Total Order Value
                  </span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant">
                    Inclusive of all taxes & delivery
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-price-display text-[26px] leading-tight font-bold text-primary font-mono">
                    ₹{(subtotal >= freeDeliveryThreshold ? subtotal : grandTotal).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Primary Submit CTA */}
              <button
                id="place-cod-order-btn"
                type="button"
                onClick={handleSubmitOrderRequest}
                disabled={isSubmitting}
                className="w-full h-12 bg-primary hover:bg-tertiary text-on-primary rounded-lg font-product-title text-[14px] font-bold tracking-wide uppercase shadow-sm hover:shadow transition-all flex items-center justify-center gap-space-sm disabled:opacity-50 cursor-pointer active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSubmitting ? 'sync' : 'verified'}
                </span>
                <span>{isSubmitting ? 'Placing COD Order...' : t('submitCodOrder')}</span>
              </button>

              <button
                type="button"
                onClick={handleLaunchDemoConfirmation}
                className="w-full h-10 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-metadata-label text-[12px] font-bold uppercase transition-colors flex items-center justify-center gap-1 border border-outline-variant"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">visibility</span>
                <span>Preview Confirmation Page (Demo Mode)</span>
              </button>

              <p className="font-caption-micro text-[11px] text-center text-on-surface-variant leading-snug">
                By placing this order, you authorize Tirupati International to verify details via phone and arrange transport dispatch to your Rajasthan kiosk.
              </p>

              {/* Institutional Trust & Pillars */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-2 border border-outline-variant/60">
                <div className="flex items-center gap-2 text-[12px] font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                  <span>100% Genuine Certified Stationery Supplies</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
                  <span>Official B2B Tax Invoice Included with Parcel</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-semibold text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[18px]">published_with_changes</span>
                  <span>Replacement Guarantee for Verified Transit Damage</span>
                </div>
              </div>

              {/* Customer Service Kiosk Hotline */}
              <div className="flex items-center justify-between text-on-surface-variant pt-space-xs font-caption-micro text-[11px] border-t border-surface-container">
                <span>Helpline: <strong className="text-on-surface">+91 97854 20850</strong></span>
                <span>Mon-Sat 9:30 AM - 7 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FIREBASE BACKEND PENDING MODAL */}
      {showFirebasePendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-lg w-full p-6 flex flex-col gap-4 border border-outline-variant animate-in fade-in">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[28px]">warning</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-subheading text-[18px] font-bold text-on-surface">
                  Firebase Database Connection Pending
                </h3>
                <span className="font-caption-micro text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  Live Lead Recording Paused
                </span>
              </div>
            </div>

            <div className="space-y-2 text-[13px] text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-lg border border-outline-variant/60">
              <p>
                <strong className="text-on-surface">Validation Passed:</strong> Your consignee name, 10-digit mobile number, shop name, district, PIN code, and address were successfully verified.
              </p>
              <p>
                However, real order submissions to Cloud Firestore are not confirmed until the client-owned Firebase project credentials are provided. Live orders will not show success until the database connection is verified.
              </p>
              <p className="text-on-surface font-medium">
                You can now preview the complete confirmation-page layout with your entered items and details in marked Demo Mode:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2 border-t border-surface-container">
              <button
                type="button"
                onClick={() => setShowFirebasePendingModal(false)}
                className="w-full sm:w-auto px-4 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-metadata-label text-[13px] font-semibold transition-colors"
              >
                Close & Return
              </button>
              <button
                type="button"
                onClick={handleLaunchDemoConfirmation}
                className="w-full sm:w-auto px-5 h-10 bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                <span>Preview Confirmation Page (Demo Mode)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
