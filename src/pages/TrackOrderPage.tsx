import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getLeadByReferenceId, getLocalStoredLeads } from '../services/firebase';
import { OrderLead } from '../types';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [mobileQuery, setMobileQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [matchedLead, setMatchedLead] = useState<OrderLead | null>(null);

  // Replacement dialog state
  const [replacementOpen, setReplacementOpen] = useState(false);
  const [replacementSku, setReplacementSku] = useState('');
  const [replacementReason, setReplacementReason] = useState('Transit Damage / Moisture on Outer Packaging');
  const [replacementRemarks, setReplacementRemarks] = useState('');
  const [replacementSubmitted, setReplacementSubmitted] = useState(false);

  const handleTrackSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = orderQuery.trim().toUpperCase();
    if (!query && !mobileQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    setMatchedLead(null);

    try {
      // 1. Try finding by reference ID in this browser's stored orders
      if (query) {
        const found = await getLeadByReferenceId(query);
        if (found) {
          setMatchedLead(found);
          setLoading(false);
          return;
        }
      }

      // 2. Search local device orders
      const localOrders = getLocalStoredLeads();
      const match = localOrders.find((l) => {
        const matchRef = query && l.referenceId.toUpperCase().includes(query);
        const matchPhone = mobileQuery && l.customer.mobileNumber.includes(mobileQuery.trim());
        return matchRef || matchPhone;
      });

      if (match) {
        setMatchedLead(match);
      }
    } catch (err) {
      console.error('Error tracking order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      setOrderQuery(initialOrderId);
      handleTrackSubmit();
    }
  }, [initialOrderId]);

  const handleReplacementSubmit = () => {
    setReplacementSubmitted(true);
    setTimeout(() => {
      setReplacementOpen(false);
      setReplacementSubmitted(false);
      alert('Replacement claim registered! Our Jaipur verification desk will contact your phone within 4 business hours.');
    }, 1200);
  };

  return (
    <div className="w-full bg-surface-container-low min-h-screen py-4 lg:py-6">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop flex flex-col gap-space-lg">
        {/* 1. BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-caption-micro text-[12px] text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">home</span>
            <span>Home</span>
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold">Track Order</span>
        </nav>

        {/* 2. SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-caption-micro text-[11px] uppercase font-bold tracking-wider mb-space-xs">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
              <span>Order Tracking Portal</span>
            </div>
            <h1 className="font-section-heading text-[26px] lg:text-[32px] font-bold text-primary tracking-tight">
              Track Your Order
            </h1>
            <p className="font-body-base text-[14px] text-on-surface-variant mt-1 max-w-xl">
              Check real-time fulfillment status of your stationery and eMitra supplies consignment. Enter your Order / Reference ID or registered mobile number.
            </p>
          </div>

          <div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-xs border border-outline-variant shrink-0">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">policy</span>
            </div>
            <div className="flex flex-col">
              <span className="font-caption-micro text-[11px] font-bold text-on-surface uppercase">
                Replacement Window
              </span>
              <span className="font-caption-micro text-[11px] text-on-surface-variant">
                7-Day Verification Policy
              </span>
            </div>
          </div>
        </div>

        {/* 3. MAIN INQUIRY & TRACKING BOX */}
        <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg border border-outline-variant">
          <form onSubmit={handleTrackSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-end">
            <div className="md:col-span-5 flex flex-col gap-space-xs">
              <label htmlFor="order-id" className="font-metadata-label text-[13px] font-bold text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">receipt_long</span>
                <span>Reference / Order ID</span>
              </label>
              <input
                id="order-id"
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value.toUpperCase())}
                placeholder="e.g. TIP-26-XXXXX"
                className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-compact text-[16px] sm:text-[14px] placeholder:text-outline focus:outline-none focus:border-primary uppercase tracking-wide font-mono font-semibold"
              />
            </div>

            <div className="md:col-span-4 flex flex-col gap-space-xs">
              <label htmlFor="mobile-num" className="font-metadata-label text-[13px] font-bold text-on-surface flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">phone_android</span>
                <span>Registered Mobile</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 font-body-compact text-[13px] text-on-surface-variant font-semibold select-none">
                  +91
                </span>
                <input
                  id="mobile-num"
                  type="tel"
                  maxLength={10}
                  value={mobileQuery}
                  onChange={(e) => setMobileQuery(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile number"
                  className="w-full h-10 pl-11 pr-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-body-compact text-[16px] sm:text-[14px] placeholder:text-outline focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col">
              <button
                type="submit"
                disabled={loading}
                className="h-10 px-space-md bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-space-sm cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {loading ? 'sync' : 'travel_explore'}
                </span>
                <span>{loading ? 'Searching...' : 'Track Order'}</span>
              </button>
            </div>
          </form>

          <div className="mt-space-md pt-space-sm border-t border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-xs font-caption-micro text-[11px] text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">info</span>
              <span>Enter your order details to view tracking and consignment information.</span>
            </div>
            {loading && (
              <div className="flex items-center gap-space-xs text-primary font-caption-micro text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                <span>Querying Logistics Hub...</span>
              </div>
            )}
          </div>
        </div>

        {/* 4. RESULTS BLOCK */}
        {!searched && !matchedLead ? (
          <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-xl flex flex-col items-center justify-center text-center py-12 border border-outline-variant">
            <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-space-md">
              <span className="material-symbols-outlined text-[32px]">local_shipping</span>
            </div>
            <h2 className="font-subheading text-[18px] font-bold text-on-surface mb-1">
              No Consignment Selected
            </h2>
            <p className="font-body-base text-[14px] text-on-surface-variant max-w-md">
              Enter your Reference ID or mobile number above to retrieve delivery milestones and status updates.
            </p>
          </div>
        ) : matchedLead ? (
          <div className="flex flex-col gap-space-lg">
            {/* Found Consignment Summary Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg border border-outline-variant flex flex-col gap-space-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[22px]">package_2</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-product-title text-[16px] font-bold text-on-surface font-mono">
                        {matchedLead.referenceId}
                      </span>
                      <span className="px-2 py-0.5 rounded font-caption-micro text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {matchedLead.status}
                      </span>
                    </div>
                    <span className="font-caption-micro text-[11px] text-on-surface-variant">
                      Placed on {new Date(matchedLead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setReplacementSku(matchedLead.items[0]?.productName || 'eMitra Certificate Paper');
                    setReplacementOpen(true);
                  }}
                  className="px-4 h-9 rounded-lg bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container font-metadata-label text-[12px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto"
                >
                  <span className="material-symbols-outlined text-[16px]">published_with_changes</span>
                  <span>Initiate Replacement</span>
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container-low p-4 rounded-lg border border-outline-variant/60">
                <div className="flex flex-col">
                  <span className="font-caption-micro text-[11px] text-on-surface-variant uppercase font-bold">Consignee</span>
                  <span className="font-metadata-label text-[13px] font-semibold text-on-surface">
                    {matchedLead.customer.fullName}
                  </span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant truncate">
                    {matchedLead.customer.shopName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-micro text-[11px] text-on-surface-variant uppercase font-bold">Destination</span>
                  <span className="font-metadata-label text-[13px] font-semibold text-on-surface">
                    {matchedLead.customer.district}, Rajasthan
                  </span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant">
                    PIN: {matchedLead.customer.pincode}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-micro text-[11px] text-on-surface-variant uppercase font-bold">Consignment Total</span>
                  <span className="font-metadata-label text-[14px] font-bold text-primary font-mono">
                    ₹{matchedLead.pricing.grandTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant">
                    {matchedLead.items.length} line item(s)
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-caption-micro text-[11px] text-on-surface-variant uppercase font-bold">Fleet Logistics</span>
                  <span className="font-metadata-label text-[13px] font-semibold text-on-surface">
                    Rajasthan Roadways Cargo
                  </span>
                  <span className="font-caption-micro text-[11px] text-emerald-700 font-semibold">
                    Direct Kiosk Dispatch
                  </span>
                </div>
              </div>

              {/* Milestones Flow */}
              <div className="pt-2">
                <span className="font-metadata-label text-[13px] font-bold text-on-surface block mb-3">
                  Consignment Journey Milestones
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>1. REQUEST RECEIVED</span>
                    </div>
                    <span className="font-caption-micro text-[11px] text-on-surface-variant">
                      Logged in web portal
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg border flex flex-col gap-1 ${
                    matchedLead.status !== 'New Lead'
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-surface-container-low border-outline-variant/60'
                  }`}>
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold ${
                      matchedLead.status !== 'New Lead' ? 'text-emerald-700' : 'text-primary'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {matchedLead.status !== 'New Lead' ? 'check_circle' : 'pending'}
                      </span>
                      <span>2. VERIFICATION</span>
                    </div>
                    <span className="font-caption-micro text-[11px] text-on-surface-variant">
                      Sales Desk Stock QC
                    </span>
                  </div>
                  <div className={`p-3 rounded-lg border flex flex-col gap-1 ${
                    matchedLead.status === 'Dispatched'
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-surface-container-low border-outline-variant/60'
                  }`}>
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold ${
                      matchedLead.status === 'Dispatched' ? 'text-emerald-700' : 'text-outline'
                    }`}>
                      <span className="material-symbols-outlined text-[16px]">
                        {matchedLead.status === 'Dispatched' ? 'check_circle' : 'schedule'}
                      </span>
                      <span>3. ROADWAYS DISPATCH</span>
                    </div>
                    <span className="font-caption-micro text-[11px] text-on-surface-variant">
                      Sealed Carton Handover
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/60 flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-outline text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>4. KIOSK HANDOVER</span>
                    </div>
                    <span className="font-caption-micro text-[11px] text-on-surface-variant">
                      Doorstep Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-xl flex flex-col items-center justify-center text-center py-12 border border-outline-variant">
            <div className="w-16 h-16 rounded-full bg-error-container text-on-error-container flex items-center justify-center mb-space-md">
              <span className="material-symbols-outlined text-[32px]">warning</span>
            </div>
            <h2 className="font-subheading text-[18px] font-bold text-on-surface mb-1">
              Consignment Not Located
            </h2>
            <p className="font-body-base text-[14px] text-on-surface-variant max-w-md">
              No active order lead matched "{orderQuery || mobileQuery}". Please check your Reference ID or call our Jaipur commercial desk.
            </p>
          </div>
        )}

        {/* 5. REPLACEMENT REQUEST MODAL OVERLAY */}
        {replacementOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 p-4">
            <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-xl w-full p-space-lg flex flex-col gap-space-md border border-outline-variant animate-in fade-in">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">published_with_changes</span>
                  </div>
                  <div>
                    <h3 className="font-subheading text-[16px] font-bold text-on-surface">
                      Initiate Replacement Request
                    </h3>
                    <p className="font-caption-micro text-[11px] text-on-surface-variant">
                      Order ref: {matchedLead?.referenceId} • 7-Day Window Active
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReplacementOpen(false)}
                  className="text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              <div className="space-y-space-md text-[13px]">
                <div className="p-space-sm bg-surface-container-low rounded-lg font-caption-micro text-[11px] text-on-surface-variant border border-outline-variant/60">
                  <strong className="text-on-surface">Strict Replacement Policy:</strong> Tirupati International provides product replacements only for Damaged, Defective, or Incorrect SKU deliveries. No cash refunds are granted. Photos of the sealed batch or damaged carton will be verified.
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-metadata-label text-[12px] font-bold text-on-surface">
                    Select Affected SKU
                  </label>
                  <select
                    value={replacementSku}
                    onChange={(e) => setReplacementSku(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant font-body-compact text-[13px] text-on-surface focus:border-primary outline-none"
                  >
                    {matchedLead?.items.map((it, idx) => (
                      <option key={idx} value={it.productName}>
                        {it.productName} ({it.specification})
                      </option>
                    ))}
                    <option value="Packaging Damage">Outer Packaging / Moisture Damage</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-metadata-label text-[12px] font-bold text-on-surface">
                    Reason for Replacement
                  </label>
                  <select
                    value={replacementReason}
                    onChange={(e) => setReplacementReason(e.target.value)}
                    className="h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant font-body-compact text-[13px] text-on-surface focus:border-primary outline-none"
                  >
                    <option value="Transit Damage / Moisture on Outer Packaging">Transit Damage / Moisture on Outer Packaging</option>
                    <option value="Defective Product / Print Coating Irregularity">Defective Product / Print Coating Irregularity</option>
                    <option value="Incorrect Micron / GSM Received">Incorrect Micron / GSM Received</option>
                    <option value="Shortage in Sealed Carton Unit Count">Shortage in Sealed Carton Unit Count</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-metadata-label text-[12px] font-bold text-on-surface">
                    Remarks & Evidence Description
                  </label>
                  <textarea
                    rows={3}
                    value={replacementRemarks}
                    onChange={(e) => setReplacementRemarks(e.target.value)}
                    placeholder="Describe carton condition, package seal, or printing issue..."
                    className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant font-body-compact text-[13px] text-on-surface focus:border-primary outline-none resize-none"
                  />
                </div>
              </div>

              <div className="pt-space-sm border-t border-surface-container flex items-center justify-end gap-space-sm">
                <button
                  type="button"
                  onClick={() => setReplacementOpen(false)}
                  className="px-space-md h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-metadata-label text-[13px] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReplacementSubmit}
                  disabled={replacementSubmitted}
                  className="px-space-md h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {replacementSubmitted ? 'Submitting...' : 'Submit Replacement Claim'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. HELP & COMMERCIAL CONTACT STRIP */}
        <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[28px]">headset_mic</span>
            </div>
            <div>
              <div className="font-metadata-label text-[14px] font-bold text-on-surface">
                Need Help with Consignment Logistics or Waybills?
              </div>
              <p className="font-caption-micro text-[12px] text-on-surface-variant">
                Our Jaipur B2B dispatch desk operates Mon-Sat, 9:00 AM – 7:00 PM for transit inquiries.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-md shrink-0">
            <Link
              to="/contact"
              className="px-space-md h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-metadata-label text-[13px] font-bold flex items-center gap-space-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Contact Desk</span>
            </Link>
            <a
              href="tel:01412780444"
              className="px-space-md h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold flex items-center gap-space-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">phone</span>
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
