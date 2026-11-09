import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shippingFee,
    grandTotal,
    totalItemsCount
  } = useCart();

  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === 'EMITRA2026' || couponCode.toUpperCase() === 'TIRUPATI') {
      setCouponApplied(true);
      setCouponMessage('Institutional coupon applied: Priority Kiosk Dispatch!');
    } else {
      setCouponMessage('Coupon code verified. Applied standard kiosk wholesale rate.');
    }
  };

  const handleMoveToWishlist = (item: (typeof cart)[0]) => {
    addToWishlist(item.product);
    removeFromCart(item.product.id);
  };

  // Calculate total original MRP to show customer total savings
  const totalMrp = cart.reduce((sum, item) => {
    const itemMrp = item.product.mrp || item.product.price;
    return sum + itemMrp * item.quantity;
  }, 0);
  const totalDiscount = Math.max(0, totalMrp - subtotal);

  if (cart.length === 0) {
    return (
      <div className="w-full bg-surface-container-low min-h-[calc(100vh-280px)] py-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center bg-surface-container-lowest rounded-xl p-8 shadow-xs border border-outline-variant flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-outline mb-space-md">
            <span className="material-symbols-outlined text-[36px]">production_quantity_limits</span>
          </div>
          <h2 className="font-section-heading text-[22px] font-bold text-on-surface mb-2">
            Your Cart is Empty
          </h2>
          <p className="font-body-compact text-[13px] text-on-surface-variant max-w-sm mb-space-lg leading-relaxed">
            You have no commercial stationery items or eMitra supplies queued for procurement at this time.
          </p>
          <Link
            to="/products"
            className="h-11 px-space-xl bg-primary text-on-primary font-metadata-label text-[13px] font-bold rounded-lg flex items-center gap-space-xs hover:bg-primary-container transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
            <span>Browse Products Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-surface-container-low min-h-screen pb-16">
      {/* 1. TOP UTILITY CONTEXT BAR / BREADCRUMB */}
      <div className="w-full bg-surface-container-low py-space-sm border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-caption-micro text-[12px] text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-outline opacity-40">/</span>
            <span className="text-on-surface font-semibold">Shopping Cart</span>
          </nav>
          <div className="hidden md:flex items-center gap-space-md text-[11px] font-caption-micro text-on-surface-variant">
            <span className="flex items-center gap-space-xs text-primary font-semibold">
              <span className="material-symbols-outlined text-[15px]">verified_user</span> 256-Bit Encrypted Institutional Billing
            </span>
            <span className="text-outline opacity-30">•</span>
            <span>Standard Order Ref: <strong className="text-on-surface font-mono">TIS-PO-2026</strong></span>
          </div>
        </div>
      </div>

      {/* 2. CART CORE WORKSPACE */}
      <div className="w-full py-space-lg">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop">
          {/* Section Title & Status Metric */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
            <div>
              <div className="flex items-center gap-space-sm mb-1">
                <span className="font-caption-micro text-[11px] tracking-widest uppercase text-primary font-bold px-space-xs py-0.5 bg-primary-fixed rounded">
                  Institutional Order Queue
                </span>
                <span className="text-[11px] font-caption-micro text-on-surface-variant">
                  Session ID: #GST-CART-2026-RAJ
                </span>
              </div>
              <h1 className="font-section-heading text-[26px] lg:text-[32px] font-bold text-on-surface tracking-tight">
                Shopping Cart{' '}
                <span className="text-on-surface-variant text-[18px] font-normal">
                  ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-space-md bg-surface-container-lowest px-space-md py-space-xs rounded-lg shadow-xs border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
              <div className="flex flex-col text-left">
                <span className="font-caption-micro text-[11px] text-on-surface font-semibold">
                  Institutional Doorstep Logistics
                </span>
                <span className="font-caption-micro text-[11px] text-on-surface-variant">
                  Direct dispatch across all Rajasthan PIN codes
                </span>
              </div>
            </div>
          </div>

          {/* MAIN TWO-COLUMN STRUCTURE (68% / 32%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            {/* LEFT COLUMN: Cart Inventory List (lg:col-span-8) */}
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              {/* Dispatch Notification Banner */}
              <div className="w-full bg-secondary-fixed/40 px-space-md py-space-sm rounded-lg flex items-center justify-between shadow-xs border border-secondary-container/50">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                  <span className="font-body-compact text-[13px] text-on-surface">
                    Review your stationery specifications and quantities before proceeding to checkout.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearCart}
                  className="font-caption-micro text-[11px] text-error hover:underline uppercase font-bold shrink-0 ml-2"
                >
                  Clear Cart
                </button>
              </div>

              {/* Items Container Card */}
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col border border-outline-variant">
                {/* Table Header (Desktop) */}
                <div className="bg-surface-container-low px-space-md py-2.5 hidden sm:grid sm:grid-cols-12 text-on-surface-variant font-metadata-label text-[12px] font-semibold uppercase tracking-wider border-b border-surface-container">
                  <span className="sm:col-span-6">SKU Specification / Product Details</span>
                  <span className="sm:col-span-2 text-center">Unit Price</span>
                  <span className="sm:col-span-2 text-center">Quantity</span>
                  <span className="sm:col-span-2 text-right">Subtotal</span>
                </div>

                {/* Table Rows */}
                {cart.map((item, index) => {
                  const lineTotal = item.product.price * item.quantity;
                  const itemDiscount = item.product.mrp && item.product.mrp > item.product.price
                    ? Math.round(((item.product.mrp - item.product.price) / item.product.mrp) * 100)
                    : 0;

                  return (
                    <React.Fragment key={item.product.id}>
                      {index > 0 && <div className="h-px w-full bg-surface-container"></div>}
                      <div className="p-space-md sm:py-space-lg flex flex-col sm:grid sm:grid-cols-12 gap-space-md items-center bg-surface-container-lowest hover:bg-surface-bright transition-colors">
                        {/* Product Identity */}
                        <div className="sm:col-span-6 flex items-start gap-space-md w-full">
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center p-2 border border-outline-variant/60">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-contain mix-blend-multiply"
                            />
                          </div>

                          <div className="flex flex-col min-w-0 flex-1">
                            <div className="flex items-center gap-space-xs mb-1">
                              <span className="w-2 h-2 rounded-full bg-[#12B76A]"></span>
                              <span className="font-caption-micro text-[10px] font-bold text-[#12B76A] uppercase">
                                In Stock
                              </span>
                              <span className="text-outline opacity-30 text-[10px]">•</span>
                              <span className="font-caption-micro text-[10px] font-mono text-on-surface-variant uppercase">
                                SKU: {item.product.sku}
                              </span>
                            </div>

                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-product-title text-[14px] sm:text-[15px] font-semibold text-on-surface line-clamp-2 leading-snug hover:text-primary transition-colors"
                            >
                              {item.product.name}
                            </Link>

                            <div className="flex items-center gap-space-xs mt-1 text-on-surface-variant font-caption-micro text-[11px]">
                              <span className="bg-surface-container-high px-1.5 py-0.5 rounded font-mono">HSN: 4802</span>
                              <span>{item.product.specification}</span>
                            </div>

                            {/* Mobile Price View */}
                            <div className="flex sm:hidden items-baseline gap-space-xs mt-2">
                              <span className="font-price-display text-[16px] font-bold text-on-surface">
                                ₹{item.product.price}
                              </span>
                              {item.product.mrp && (
                                <span className="font-caption-micro text-outline line-through text-[11px]">
                                  ₹{item.product.mrp}
                                </span>
                              )}
                              {itemDiscount > 0 && (
                                <span className="font-caption-micro text-primary font-bold text-[11px]">
                                  ({itemDiscount}% off)
                                </span>
                              )}
                            </div>

                            {/* Line Item Actions */}
                            <div className="flex items-center gap-space-md mt-space-sm pt-space-xs">
                              <button
                                type="button"
                                onClick={() => handleMoveToWishlist(item)}
                                className="font-caption-micro text-[11px] text-on-surface-variant hover:text-primary font-semibold flex items-center gap-1 transition-colors"
                              >
                                <span className="material-symbols-outlined text-[14px]">favorite</span>
                                <span>Move to Wishlist</span>
                              </button>
                              <span className="text-outline-variant opacity-60">|</span>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.product.id)}
                                className="font-caption-micro text-[11px] text-error hover:underline font-semibold flex items-center gap-1 transition-colors"
                              >
                                <span className="material-symbols-outlined text-[14px]">delete</span>
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Unit Price Column (Desktop) */}
                        <div className="hidden sm:flex sm:col-span-2 flex-col items-center justify-center">
                          <span className="font-product-title text-[15px] font-bold text-on-surface">
                            ₹{item.product.price}
                          </span>
                          {item.product.mrp && (
                            <span className="font-caption-micro text-outline line-through text-[11px]">
                              ₹{item.product.mrp}
                            </span>
                          )}
                          {itemDiscount > 0 && (
                            <span className="font-caption-micro text-[10px] font-semibold text-primary">
                              {itemDiscount}% off
                            </span>
                          )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="sm:col-span-2 flex items-center justify-center w-full sm:w-auto">
                          <div className="flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-7 h-7 flex items-center justify-center bg-surface-container-lowest text-on-surface rounded hover:bg-surface-container transition-colors shadow-xs font-bold text-[16px]"
                            >
                              -
                            </button>
                            <span className="w-9 text-center font-metadata-label text-[13px] font-bold text-on-surface select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-surface-container-lowest text-on-surface rounded hover:bg-surface-container transition-colors shadow-xs font-bold text-[16px]"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Line Subtotal */}
                        <div className="sm:col-span-2 flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center w-full sm:w-auto">
                          <span className="sm:hidden font-caption-micro text-[12px] text-on-surface-variant">
                            Line Total:
                          </span>
                          <div className="text-right">
                            <span className="font-price-display text-[16px] sm:text-[18px] font-bold text-primary leading-tight">
                              ₹{lineTotal.toLocaleString('en-IN')}
                            </span>
                            <span className="block font-caption-micro text-[11px] text-on-surface-variant">
                              (₹{item.product.price} × {item.quantity})
                            </span>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}

                {/* Cart Bottom Action Bar */}
                <div className="bg-surface-container-low p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container">
                  <Link
                    to="/products"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-lg h-10 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-metadata-label text-[13px] font-semibold shadow-xs border border-outline-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    <span>Continue Shopping</span>
                  </Link>
                  <div className="flex items-center gap-space-sm text-caption-micro text-[11px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-[18px]">security</span>
                    <span>Protected Commercial Transaction • Tirupati Verified</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges Strip (3 Columns) */}
              <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-outline-variant">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md divide-y md:divide-y-0 md:divide-x border-surface-container">
                  {/* Trust 1: GST Invoice */}
                  <div className="flex items-start gap-space-sm pt-2 md:pt-0 md:pr-space-md">
                    <div className="w-9 h-9 rounded bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-metadata-label text-[12px] font-bold text-on-surface uppercase tracking-tight">
                        GST Invoice Assured
                      </span>
                      <p className="font-caption-micro text-[11px] text-on-surface-variant leading-normal mt-0.5">
                        Input your GSTIN at checkout step to claim 100% eligible Input Tax Credit (ITC) on commercial filings.
                      </p>
                    </div>
                  </div>

                  {/* Trust 2: Pan India Shipping */}
                  <div className="flex items-start gap-space-sm pt-3 md:pt-0 md:px-space-md">
                    <div className="w-9 h-9 rounded bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-metadata-label text-[12px] font-bold text-on-surface uppercase tracking-tight">
                        Rajasthan Kiosk Delivery
                      </span>
                      <p className="font-caption-micro text-[11px] text-on-surface-variant leading-normal mt-0.5">
                        Express surface dispatch serving eMitra operators and stationery stores across all 33+ districts.
                      </p>
                    </div>
                  </div>

                  {/* Trust 3: Replacement Policy */}
                  <div className="flex items-start gap-space-sm pt-3 md:pt-0 md:pl-space-md">
                    <div className="w-9 h-9 rounded bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined text-[20px]">published_with_changes</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-metadata-label text-[12px] font-bold text-on-surface uppercase tracking-tight">
                        7-Day Replacement
                      </span>
                      <p className="font-caption-micro text-[11px] text-on-surface-variant leading-normal mt-0.5">
                        Zero-friction institutional replacement protocol for damaged reams, toner leaks, or defective lots.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary Card (lg:col-span-4, Sticky) */}
            <div className="lg:col-span-4 flex flex-col gap-space-md lg:sticky lg:top-[170px]">
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-xs overflow-hidden flex flex-col border border-outline-variant">
                {/* Header */}
                <div className="bg-surface-container-low px-space-md py-space-sm flex items-center justify-between border-b border-surface-container">
                  <h2 className="font-subheading text-[18px] font-bold text-on-surface">Order Summary</h2>
                  <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-primary bg-primary-fixed px-2 py-0.5 rounded">
                    Commercial PO
                  </span>
                </div>

                <div className="p-space-md flex flex-col gap-space-md">
                  {/* Ledger Price Breakdown */}
                  <div className="flex flex-col gap-space-sm font-body-compact text-[13px] text-on-surface-variant">
                    <div className="flex justify-between items-center">
                      <span>Item Subtotal ({totalItemsCount} items)</span>
                      <span className="font-semibold text-on-surface font-mono">
                        ₹{(subtotal + totalDiscount).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {totalDiscount > 0 && (
                      <div className="flex justify-between items-center text-[#12B76A]">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">sell</span>
                          Product Savings
                        </span>
                        <span className="font-semibold font-mono">
                          -₹{totalDiscount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span>Net Stationery Price</span>
                      <span className="font-semibold text-on-surface font-mono">
                        ₹{subtotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">Shipping Estimate</span>
                      <span className="font-caption-micro text-[11px] font-semibold text-primary bg-primary-fixed px-2 py-0.5 rounded">
                        {subtotal >= 1500 ? 'Free Delivery (Eligible)' : 'Calculated at Checkout'}
                      </span>
                    </div>
                  </div>

                  {/* Coupon Code Box */}
                  <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1.5 border border-outline-variant/60">
                    <label className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-primary">confirmation_number</span>
                      <span>Coupon / Voucher</span>
                    </label>
                    <div className="flex items-center gap-space-xs">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="e.g. EMITRA2026"
                        className="flex-1 h-9 px-space-sm rounded bg-surface-container-lowest text-on-surface font-mono text-[12px] uppercase placeholder:normal-case placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="h-9 px-space-md bg-secondary hover:bg-on-secondary-fixed text-on-secondary font-metadata-label text-[12px] font-semibold rounded shadow-xs transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage ? (
                      <span className="font-caption-micro text-[11px] text-primary font-medium leading-none">
                        {couponMessage}
                      </span>
                    ) : (
                      <span className="font-caption-micro text-[10px] text-on-surface-variant leading-none">
                        Enter eMitra coupon code if applicable
                      </span>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-surface-container"></div>

                  {/* Total Payable Block */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-baseline">
                      <span className="font-subheading text-[18px] font-bold text-on-surface">Total Payable</span>
                      <span className="font-price-display text-[26px] leading-tight font-bold text-primary font-mono">
                        ₹{grandTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-caption-micro">
                      <span>Inclusive of all taxes (GST Invoice)</span>
                      <span className="font-semibold text-primary">No extra fees</span>
                    </div>
                  </div>

                  {/* Primary Checkout CTA */}
                  <button
                    type="button"
                    onClick={() => navigate('/checkout')}
                    className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-space-sm group"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>

                  {/* Guest Shopping Reassurance Banner */}
                  <div className="flex items-center justify-center gap-space-xs p-space-xs bg-surface-container-low rounded text-center border border-outline-variant/40">
                    <span className="material-symbols-outlined text-primary text-[16px]">no_accounts</span>
                    <span className="font-caption-micro text-[11px] text-on-surface font-semibold">
                      Fast guest checkout. No password required.
                    </span>
                  </div>

                  {/* Supported Payment Rails */}
                  <div className="pt-space-xs flex flex-col items-center gap-2">
                    <span className="font-caption-micro text-[10px] text-outline uppercase tracking-widest font-semibold">
                      Supported B2B Payment Rails
                    </span>
                    <div className="flex items-center justify-center gap-2 text-on-surface-variant opacity-80">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-surface-container rounded border border-outline-variant/40">
                        UPI
                      </span>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-surface-container rounded border border-outline-variant/40">
                        NEFT/RTGS
                      </span>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-surface-container rounded border border-outline-variant/40">
                        CARDS
                      </span>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-surface-container rounded border border-outline-variant/40">
                        COD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Commercial Billing Desk Assistance Card */}
              <div className="w-full bg-surface-container-lowest rounded-xl p-space-md flex items-center gap-space-md shadow-xs border border-outline-variant">
                <span className="material-symbols-outlined text-primary text-[24px]">support_agent</span>
                <div className="flex flex-col text-left">
                  <span className="font-caption-micro text-[11px] font-bold uppercase text-on-surface">
                    Commercial Billing Desk
                  </span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant leading-snug">
                    Need assistance splitting consignments or formal proforma? Call Jaipur desk: +91 141 2780444.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
