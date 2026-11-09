import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { OrderLead } from '../types';
import { getLeadByReferenceId, isFirebaseConfigured } from '../services/firebase';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const [lead, setLead] = useState<OrderLead | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const isExplicitDemo =
    searchParams.get('demo') === 'true' ||
    (orderId ? orderId.startsWith('DEMO') : false);

  useEffect(() => {
    async function loadData() {
      // 1. Check if user just submitted this order in this session
      try {
        if (orderId) {
          const sessionRaw = sessionStorage.getItem('tirupati_last_order_' + orderId);
          if (sessionRaw) {
            const parsed = JSON.parse(sessionRaw) as OrderLead;
            setLead(parsed);
            setLoading(false);
            return;
          }
        }

        const demoRaw = sessionStorage.getItem('tirupati_demo_order');
        if (demoRaw && (isExplicitDemo || !orderId || orderId.startsWith('DEMO'))) {
          const parsed = JSON.parse(demoRaw) as OrderLead;
          setLead(parsed);
          setLoading(false);
          return;
        }
      } catch {
        // ignore
      }

      // 2. Try loading from local leads store if orderId provided
      if (orderId && !orderId.startsWith('DEMO')) {
        try {
          const found = await getLeadByReferenceId(orderId);
          if (found) {
            setLead(found);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error fetching lead details:', e);
        }
      }

      // 3. Fallback to canonical reference demo data
      setLead({
        id: 'demo_default',
        referenceId: 'DEMO-TIP-26-88421',
        createdAt: new Date().toISOString(),
        createdAtTimestamp: Date.now(),
        status: 'New Lead',
        leadStatus: 'new',
        paymentMethod: 'COD',
        paymentStatus: 'pending',
        orderTotal: 890,
        deliveryFee: 0,
        finalAmount: 890,
        customer: {
          fullName: 'Ramesh Chandra Sharma',
          mobileNumber: '9414012345',
          shopName: 'Sharma eMitra & Cyber Cafe',
          emitraId: 'RJ-JAI-10482',
          district: 'Jaipur City',
          deliveryAddress: 'Shop No. 12, Main Market, Opp. Bus Stand, Tonk Road',
          pincode: '302015',
          orderNotes: '[Payment Preference: B2B Proforma Invoice / Bank Transfer]'
        },
        items: [
          {
            productId: 'emitra-paper-100-pages',
            productName: 'eMitra Certificate Paper - 100 GSM Pre-printed',
            sku: 'TIS-EMP-100G',
            specification: 'Ream Pack (500 Sheets) • Pre-printed Guilloche Border',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCtQfsulB23Xm2W0n8XRMVnQ9mHxYNVfFpW1zHFqEFq_3jh4udlQNgGMFPTwD09DPOVwnFlNEqbMOhJFtM8lucwIN26Rg4gJ8uDQzQg3vAsXcS-J_LU5LdCHfyCucdPooIFeCBZRFvmjNMDx5QsxoFdeeFWDlTvX0WXks92R76QwW1DoPWza4WtEcRRYnQg3HzW_W19hReccm04MK8W4kUv540ogglH0XerdAU_k2jC9imDuQWlAQ9W',
            quantity: 2,
            unitPrice: 340,
            totalPrice: 680
          },
          {
            productId: 'photo-paper-4x6',
            productName: 'Klik Inkjet ID Photo Paper - 4x6 inch',
            sku: 'TIS-PP-4X6',
            specification: '100 Sheets • 210 GSM Gloss Finish',
            image:
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCtP-OosuZR_LWqe5QDyqA13fdE1XVduevPlnmEABjkfKU00s21IKhSrOCTGBfgd0x1ZBeLyrNBVeorGPXTjPGVD1xnGdpoEQfq_IKhk1843G2MW8eewHpJZodM7q_YXE7S1-OXl1E95k28Sa00oAkqiZqKZrIgQq5YacYUxEW8FrOyyQCEPaL0eNPvEOtOcY0Xu1hI9CQzx080YThD-77WMywCXvq7nMMXtyXUeaDeIBhbmI6IH1-u',
            quantity: 1,
            unitPrice: 210,
            totalPrice: 210
          }
        ],
        pricing: {
          subtotal: 890,
          shippingFee: 0,
          grandTotal: 890,
          taxNote: 'Inclusive of 18% GST (Official Tax Invoice)'
        },
        source: 'Demo Preview Session',
        savedToFirebase: false
      });
      setLoading(false);
    }

    loadData();
  }, [orderId, isExplicitDemo]);

  // Is this confirmed in real Firestore?
  const isDemoMode =
    isExplicitDemo ||
    !isFirebaseConfigured() ||
    !lead?.savedToFirebase ||
    (orderId ? orderId.startsWith('DEMO') : true);

  const displayRefId = lead?.referenceId || orderId || 'DEMO-TIP-26-88421';
  const orderDate = lead?.createdAt
    ? new Date(lead.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

  const copyRefId = () => {
    navigator.clipboard.writeText(displayRefId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Namaste Tirupati International, I am inquiring about order reference: ${displayRefId}. Shop: ${
      lead?.customer?.shopName || 'Kiosk'
    }, District: ${lead?.customer?.district || 'Rajasthan'}.`
  );

  return (
    <div className="w-full bg-surface-container-low min-h-screen py-6 lg:py-10">
      <div className="max-w-[1120px] mx-auto px-4 lg:px-6 flex flex-col gap-6">
        {/* DEMO PREVIEW MODE WARNING BANNER */}
        {isDemoMode && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs animate-in fade-in">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-700 text-[28px] mt-0.5 shrink-0">
                warning
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-product-title text-[15px] font-bold text-amber-950">
                    DEMO PREVIEW MODE — Backend Connection Pending
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-caption-micro text-[11px] font-bold uppercase tracking-wider">
                    Design Preview
                  </span>
                </div>
                <p className="font-body-compact text-[13px] text-amber-900 mt-1 leading-relaxed">
                  This page renders the exact UI/UX confirmation layout from the reference design. Real order submission will not show confirmed success until the client-owned Firebase project is connected and the lead is written to Cloud Firestore. End-to-end lead testing is pending.
                </p>
              </div>
            </div>
            <Link
              to="/checkout"
              className="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-950 font-metadata-label text-[12px] font-bold rounded-lg whitespace-nowrap transition-colors shrink-0"
            >
              Back to Checkout
            </Link>
          </div>
        )}

        {/* 1. BREADCRUMB / STATUS PATH */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 font-caption-micro text-[12px] text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors">Portal</Link>
            <span className="text-outline-variant">/</span>
            <Link to="/checkout" className="hover:text-primary transition-colors">Checkout</Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-bold">Order Acknowledgment</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1 rounded-full shadow-xs border border-outline-variant">
            <span className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500' : 'bg-emerald-600'}`}></span>
            <span className="font-caption-micro text-[11px] text-on-surface font-semibold uppercase tracking-wider">
              {isDemoMode ? 'Demo Preview' : lead?.status || 'Order Placed'}
            </span>
          </div>
        </div>

        {/* 2. MAIN ORDER CONFIRMATION CONTAINER */}
        <div className="w-full bg-surface-container-lowest rounded-xl shadow-xs p-6 md:p-8 lg:p-10 flex flex-col gap-8 border border-outline-variant">
          {/* Success Banner Module */}
          <div className="flex flex-col sm:flex-row items-start gap-5 pb-6 bg-gradient-to-r from-surface-container-lowest via-surface-container-low/50 to-surface-container-lowest rounded-xl p-5 sm:p-6 border border-emerald-100">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 shadow-xs border border-emerald-200">
              <span
                className="material-symbols-outlined text-emerald-600 text-[36px] sm:text-[40px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-section-heading text-[22px] sm:text-[26px] text-on-surface font-bold tracking-tight">
                  Thank You! Your Order Has Been Received.
                </h1>
                <span className="bg-emerald-100 text-emerald-800 font-caption-micro text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  Confirmed
                </span>
              </div>
              <p className="font-body-base text-[14px] text-on-surface-variant leading-relaxed">
                आपका ऑर्डर अनुरोध सफलतापूर्वक प्राप्त हो गया है। Our Jaipur commercial sales desk is reviewing stock availability and will contact your mobile number for consignment authorization.
              </p>
              <span className="font-caption-micro text-[11px] text-outline">
                {isDemoMode
                  ? 'Demo presentation: Official B2B GST tax invoice will be generated upon live dispatch.'
                  : 'Official B2B GST tax invoice will be issued upon dispatch.'}
              </span>
            </div>
          </div>

          {/* Order Reference Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-surface-container-low p-4 sm:p-5 rounded-xl border border-outline-variant/60">
            {/* Reference ID */}
            <div className="flex flex-col gap-1 bg-surface-container-lowest p-3.5 rounded-lg shadow-xs border border-outline-variant/40">
              <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                Order ID / Reference
              </span>
              <div className="flex items-center justify-between gap-1.5">
                <span className="font-product-title text-[15px] text-primary font-bold font-mono">
                  {displayRefId}
                </span>
                <button
                  type="button"
                  onClick={copyRefId}
                  className="text-outline hover:text-primary transition-colors p-1"
                  title="Copy Reference ID"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {copied ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>
              <span className="font-caption-micro text-[10px] text-outline">
                {isDemoMode ? 'Demo reference identifier' : 'System Reference ID'}
              </span>
            </div>

            {/* Placement Timestamp */}
            <div className="flex flex-col gap-1 bg-surface-container-lowest p-3.5 rounded-lg shadow-xs border border-outline-variant/40">
              <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                Order Placement Date
              </span>
              <span className="font-metadata-label text-[13px] text-on-surface font-semibold">{orderDate}</span>
              <span className="font-caption-micro text-[10px] text-outline">Placement timestamp</span>
            </div>

            {/* Payment / Fulfillment Status */}
            <div className="flex flex-col gap-1 bg-surface-container-lowest p-3.5 rounded-lg shadow-xs border border-outline-variant/40">
              <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                Payment Status
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-metadata-label text-[13px] text-emerald-700 font-bold">
                  {lead?.status || 'B2B Proforma Invoice'}
                </span>
              </div>
              <span className="font-caption-micro text-[10px] text-outline">B2B commercial billing</span>
            </div>

            {/* Logistics Coverage */}
            <div className="flex flex-col gap-1 bg-surface-container-lowest p-3.5 rounded-lg shadow-xs border border-outline-variant/40">
              <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                Estimated Delivery
              </span>
              <span className="font-metadata-label text-[13px] text-on-surface font-semibold">
                {lead?.customer.district || 'Rajasthan Express'}
              </span>
              <span className="font-caption-micro text-[10px] text-outline">2-4 Business Days Window</span>
            </div>
          </div>

          {/* TWO-COLUMN LOGISTICS & BILLING BREAKOUT BLOCK */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Column 1: Consignee & Shipping Details (5 Columns) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
                  <h3 className="font-subheading text-[16px] text-on-surface font-bold">
                    Shipping & Consignee Details
                  </h3>
                </div>
                <span className="font-caption-micro text-[11px] bg-secondary-fixed text-on-secondary-fixed font-bold px-2 py-0.5 rounded">
                  Verified Consignee
                </span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-5 flex flex-col gap-4 shadow-xs border border-outline-variant/60">
                <div className="flex flex-col">
                  <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Consignee Name
                  </span>
                  <span className="font-product-title text-[15px] text-on-surface font-bold mt-0.5">
                    {lead?.customer.fullName || 'Ramesh Chandra Sharma'}
                  </span>
                  <span className="font-body-compact text-[13px] text-on-surface-variant font-medium">
                    {lead?.customer.shopName || 'Sharma eMitra & Cyber Cafe'}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Phone Number
                  </span>
                  <span className="font-body-compact text-[13px] text-on-surface font-semibold mt-0.5">
                    +91 {lead?.customer.mobileNumber || '9414012345'}
                  </span>
                  <span className="font-caption-micro text-[11px] text-emerald-700 font-medium">
                    ✓ Registered SMS Contact
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                    Delivery Address
                  </span>
                  <p className="font-body-compact text-[13px] text-on-surface mt-0.5 leading-relaxed">
                    {lead?.customer.deliveryAddress || 'Shop No. 12, Main Market, Opp. Bus Stand, Tonk Road'}
                    <br />
                    <span className="font-semibold">
                      {lead?.customer.district || 'Jaipur City'}, Rajasthan - {lead?.customer.pincode || '302015'}
                    </span>
                  </p>
                </div>

                {lead?.customer.emitraId && (
                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/60">
                    <div className="flex items-center justify-between">
                      <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                        eMitra Kiosk ID
                      </span>
                      <span className="font-caption-micro text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        Recorded
                      </span>
                    </div>
                    <span className="font-body-compact text-[13px] text-primary font-bold font-mono tracking-wide mt-1 block">
                      {lead.customer.emitraId}
                    </span>
                  </div>
                )}
              </div>

              {/* Fleet Courier notice */}
              <div className="flex items-center gap-3 bg-secondary-fixed/30 p-3.5 rounded-lg border border-secondary-container/40">
                <span className="material-symbols-outlined text-secondary text-[22px]">inventory_2</span>
                <div className="flex flex-col">
                  <span className="font-metadata-label text-[12px] font-bold text-on-secondary-fixed leading-tight">
                    Rajasthan Surface Roadways & Courier
                  </span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant leading-tight">
                    Moisture barrier sealed carton packing for all paper reams
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Order Line Items & Financial Summary (7 Columns) */}
            <div className="md:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
                  <h3 className="font-subheading text-[16px] text-on-surface font-bold">
                    Payment & Order Summary
                  </h3>
                </div>
                <span className="font-caption-micro text-[11px] text-on-surface-variant font-medium">
                  Currency: INR (₹)
                </span>
              </div>

              <div className="bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden border border-outline-variant">
                {/* Line Items List */}
                <div className="divide-y divide-surface-container max-h-72 overflow-y-auto">
                  {lead?.items && lead.items.length > 0 ? (
                    lead.items.map((item, idx) => (
                      <div key={idx} className="p-3.5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 bg-surface-container-low rounded-lg p-1 shrink-0 flex items-center justify-center border border-outline-variant/40">
                            {item.image ? (
                              <img src={item.image} alt={item.productName} className="w-full h-full object-contain mix-blend-multiply" />
                            ) : (
                              <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-product-title text-[13px] text-on-surface font-semibold truncate">
                              {item.productName}
                            </span>
                            <span className="font-caption-micro text-[11px] text-on-surface-variant">
                              {item.specification || `SKU: ${item.sku}`} • Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-price-display text-[15px] font-bold text-on-surface font-mono shrink-0">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))
                  ) : null}
                </div>

                {/* Ledger Financial Calculation */}
                <div className="bg-surface-container-low p-4 sm:p-5 flex flex-col gap-2 border-t border-surface-container">
                  <div className="flex justify-between items-center text-[13px] font-body-compact text-on-surface-variant">
                    <span>Subtotal ({lead?.items.length || 0} Line Items)</span>
                    <span className="font-semibold text-on-surface font-mono">
                      ₹{(lead?.pricing.subtotal || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] font-body-compact text-on-surface-variant">
                    <div className="flex items-center gap-1">
                      <span>Shipping & Handling</span>
                      <span className="font-caption-micro text-[10px] bg-surface-container-high px-1.5 rounded">
                        Standard
                      </span>
                    </div>
                    <span className="font-semibold text-on-surface font-mono">
                      {(lead?.pricing.shippingFee || 0) === 0 ? 'FREE' : `₹${lead?.pricing.shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] font-body-compact text-on-surface-variant">
                    <span>Applicable GST (18%)</span>
                    <span className="font-medium text-on-surface-variant">Included</span>
                  </div>
                  <div className="w-full h-px bg-outline-variant/30 my-1"></div>
                  <div className="flex justify-between items-baseline pt-1">
                    <div className="flex flex-col">
                      <span className="font-subheading text-[16px] text-on-surface font-bold">
                        Total Order Amount
                      </span>
                      <span className="font-caption-micro text-[11px] text-emerald-700 font-bold uppercase tracking-wider">
                        Zero Balance Due
                      </span>
                    </div>
                    <span className="font-price-display text-[24px] text-primary font-bold font-mono">
                      ₹{(lead?.pricing.grandTotal || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. ACTION BUTTONS FLOW */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-surface-container">
            <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap">
              {/* Primary CTA: Track Order */}
              <Link
                to={`/track-order?orderId=${displayRefId}`}
                className="flex-1 sm:flex-none h-11 px-6 bg-primary text-on-primary font-metadata-label text-[13px] font-bold rounded-lg shadow-xs hover:bg-primary-container transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">navigation</span>
                <span>Track Consignment</span>
              </Link>

              {/* Direct WhatsApp Confirmation */}
              <a
                href={`https://wa.me/911412780444?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none h-11 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-metadata-label text-[13px] font-bold rounded-lg shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Dispatch Desk</span>
              </a>
            </div>

            {/* Tertiary Link */}
            <Link
              to="/products"
              className="font-body-compact text-[13px] text-primary font-semibold hover:underline flex items-center gap-1"
            >
              <span>Continue Shopping</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* 4. FACTUAL POLICY REMINDERS */}
          <div className="w-full bg-surface-container-low rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-outline-variant/60">
            <div className="flex items-start gap-3 flex-1">
              <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                assignment_return
              </span>
              <div className="flex flex-col">
                <span className="font-metadata-label text-[13px] text-on-surface font-bold">
                  7-Day Replacement Policy
                </span>
                <p className="font-body-compact text-[12px] text-on-surface-variant leading-snug">
                  Damaged packaging or defective paper batches are eligible for immediate replacement within 7 calendar days of physical delivery.
                </p>
              </div>
            </div>
            <div className="w-px h-10 bg-outline-variant/40 hidden md:block"></div>
            <div className="flex items-start gap-3 flex-1">
              <span className="material-symbols-outlined text-secondary text-[24px] shrink-0 mt-0.5">
                contact_support
              </span>
              <div className="flex flex-col">
                <span className="font-metadata-label text-[13px] text-on-surface font-bold">
                  Logistics & Dispatch Helpdesk
                </span>
                <p className="font-body-compact text-[12px] text-on-surface-variant leading-snug">
                  Quote your Order ID ({displayRefId}) for consignment inquiries via dispatch helpdesk at +91 141 2780444.
                </p>
              </div>
            </div>
          </div>

          {/* 5. FULFILLMENT LIFECYCLE MILESTONES */}
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-xs p-6 flex flex-col gap-4 border border-outline-variant">
            <div className="flex items-center justify-between">
              <span className="font-metadata-label text-[14px] text-on-surface font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
                <span>Fulfillment Lifecycle Milestones</span>
              </span>
              <span className="font-caption-micro text-[11px] text-outline">Real-time sync</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="flex flex-col gap-1 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-700 font-caption-micro text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>STEP 1: RECEIVED</span>
                </div>
                <span className="font-metadata-label text-[12px] text-on-surface font-semibold">
                  Order Request Logged
                </span>
                <span className="font-caption-micro text-[10px] text-on-surface-variant">
                  Completed in Portal
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-1 p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                <div className="flex items-center gap-2 text-primary font-caption-micro text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">pending</span>
                  <span>STEP 2: ALLOCATION</span>
                </div>
                <span className="font-metadata-label text-[12px] text-on-surface font-semibold">
                  Warehouse Stock QC
                </span>
                <span className="font-caption-micro text-[10px] text-on-surface-variant">
                  Scheduled (Within 2-4 Hours)
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col gap-1 p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                <div className="flex items-center gap-2 text-outline font-caption-micro text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>STEP 3: DISPATCH</span>
                </div>
                <span className="font-metadata-label text-[12px] text-on-surface font-semibold">
                  Roadways Courier Handover
                </span>
                <span className="font-caption-micro text-[10px] text-outline">
                  Rajasthan Roadways Cargo
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col gap-1 p-3 bg-surface-container-low rounded-lg border border-outline-variant/60">
                <div className="flex items-center gap-2 text-outline font-caption-micro text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>STEP 4: HANDOVER</span>
                </div>
                <span className="font-metadata-label text-[12px] text-on-surface font-semibold">
                  Kiosk Delivery Arrival
                </span>
                <span className="font-caption-micro text-[10px] text-outline">
                  Target: 2-4 Business Days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
