import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find((p) => p.id === id || p.slug === id || p.sku === id);

  const [activeThumb, setActiveThumb] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [cartSuccess, setCartSuccess] = useState<boolean>(false);

  // Frequently Bought Together Bundle state
  const [bundleInclude1, setBundleInclude1] = useState<boolean>(true);
  const [bundleInclude2, setBundleInclude2] = useState<boolean>(true);
  const [bundleSuccess, setBundleSuccess] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-surface-container-low">
        <span className="material-symbols-outlined text-[48px] text-outline mb-2">inventory_2</span>
        <h2 className="font-section-heading text-[22px] font-bold text-on-surface">Product Not Found</h2>
        <p className="font-body-compact text-[14px] text-on-surface-variant max-w-sm mt-1 mb-4">
          The stationery or eMitra supply item you are looking for is no longer active in our catalog.
        </p>
        <Link
          to="/products"
          className="h-10 px-6 bg-primary text-on-primary rounded-lg font-metadata-label font-bold text-[13px] inline-flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Catalog</span>
        </Link>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // Build 4 multi-angle thumbnail images
  const baseImg = product.images[0];
  const galleryImages = [
    { label: 'Front View', url: product.images[0] || baseImg },
    {
      label: 'Back View',
      url: product.images[1] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeZTqmDbDRTlfwh16VT9HFaQXdNjvzMbECAFsH-K4g04kYh4AP2OBrtaMAeqc7Cho_K4RJ3bFOM_3s5jgChQX3Wtr5yc588zFtSNpGAsCWXSx-MOd8zrY_MtWuLgmejrdSdf61OQOfgS9HMv5LUul2pl5bYCsu8zArX79evswIHS1SGgwesdZE7fQ62aOuYP-Qkby9oy12rlk0rmNLw_rNu3bPf35ak9lt9O6XYDEP2xTk5yQnvXXu'
    },
    {
      label: 'Packaging View',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvhwD6jhe0aDLXcWnlVBOxS7tYpFVVDhePnDngwDl2_i83s52ZiPPx51jrLDiS1kM6iEGG_5D7QG_SFAErooyhcRQNXqK_TDO7vVZ3mhi40OK4Mi5af2gZpP4KuIS3kKB6msHy31DJnN3nWT79kL_cnW0DkasLoAAMBXwFRps1UY8lI6OrP2Kas4RmvnlbfcDK2sbV-0c5p4XMNcVkOcR2jx9JMB-U2Eh0u44u7SvYrMRCLkxMKGKb'
    },
    {
      label: 'Texture Macro',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAff0uwOFSasn1lEDn9yslYFUvZ0fp2RGToJNGO9v053Ekoddacj0r85PgNzzLZojIvIokq0DMc3oEs_R1DwPE6kmvN-COC1d99rL65T-kyI2Ip6TcorGCRvG-FNPAMYYUlL7bcxcQ59AkCSAch-jmI0spND9dlpwdeWM6W5uuXjKKTBYg6zyPdo35tL28lnVg4KU9eyWarmvgFyU12BP388S52ydyECqFk5YCj8XwaUoFDRRtCfO-v'
    }
  ];

  // Frequently Bought Together Add-ons
  const addon1 = {
    name: 'Klik Inkjet ID Photo Paper (4x6", 210 GSM, 50 Pcs)',
    price: 210,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpi7rPHQXAYAXjVZwtP0hv455tt_mxYpAnkE_mLWqRTYpLhIpahZuLhIFLTZcRZropn03boPE16lpKYUPYVwPxGlGZiWtleaL-qSqpM5xacHuEsOh8BK6lL8tY7fVM1tLb7MJyy7tcY6UBaYO_0hXaq9nxIXmyoO8hwHltlWtR5IP_UiA7nDI5P1W4BF-Ry883ouJslNGdFXGmvrYG2QS6Cmwi5vmdsJCs79xyrDUjEh-Ag390P8nN'
  };
  const addon2 = {
    name: 'Thermal Lamination Pouches (A4, 125 Micron, 100 Pcs)',
    price: 580,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_lwy7BdAdSO_atuqMnEvwKkMz5h0HW2CG4pJYbHnXOTSkIFOXO02m_VHjxOq922eSS_7Ix9iHtT0Ic3OghALuaD-en-6qOoEVAgHzzIGAV4BSziNFkA96ujCZL-DRh659O5gWCeagW35hWsYZYcNGDGHaiXWyEp81lkAc0-Yip_SaxJFSC0SiXKMzeG9p_6XuGXJPKWgt49F4eysanMtCigMCZuempdM3ODdEmQFTT6dzsw62V3MH'
  };

  const bundleTotal =
    product.price +
    (bundleInclude1 ? addon1.price : 0) +
    (bundleInclude2 ? addon2.price : 0);

  const bundleItemsCount = 1 + (bundleInclude1 ? 1 : 0) + (bundleInclude2 ? 1 : 0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleAddBundleToCart = () => {
    addToCart(product, 1);
    if (bundleInclude1) {
      const matchP1 = products.find((p) => p.sku === 'PP-4X6-GLS' || p.categoryId === 'photo-paper');
      if (matchP1) addToCart(matchP1, 1);
    }
    if (bundleInclude2) {
      const matchP2 = products.find((p) => p.sku === 'LAM-POUCH-A4-125' || p.categoryId === 'lamination');
      if (matchP2) addToCart(matchP2, 1);
    }
    setBundleSuccess(true);
    setTimeout(() => setBundleSuccess(false), 2500);
  };

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="w-full bg-surface-container-low min-h-screen py-3 lg:py-6">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop">
        {/* 1. BREADCRUMBS */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-caption-micro text-[11px] lg:text-[12px] uppercase tracking-wider mb-space-md lg:mb-space-lg flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
          <Link to="/products" className="hover:text-primary transition-colors">Categories</Link>
          <span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
          <Link to={`/category/${product.categoryId}`} className="hover:text-primary transition-colors font-semibold">
            {product.category}
          </Link>
          <span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
          <span className="text-on-surface font-bold truncate max-w-[260px] sm:max-w-md">{product.name}</span>
        </nav>

        {/* 2. MAIN PRODUCT DETAIL GRID (7 / 5 SPLIT) */}
        <div className="grid grid-cols-12 gap-gutter-desktop items-start mb-space-xl">
          {/* LEFT COLUMN: GALLERY & OVERVIEW (lg:col-span-7) */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-space-md">
            {/* Main Image Box */}
            <div className="relative bg-surface-container-lowest rounded-xl shadow-xs p-space-md overflow-hidden group border border-outline-variant">
              {/* Discount Badge */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-error-container text-on-error-container font-caption-micro text-[11px] uppercase px-2 py-0.5 rounded font-bold">
                    {discountPercent}% OFF
                  </span>
                </div>
              )}

              <div className="relative aspect-[4/3] w-full bg-surface-container-low rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={galleryImages[activeThumb]?.url || baseImg}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-3 bg-surface-container-lowest/90 backdrop-blur-xs px-space-sm py-1 rounded-full shadow-xs flex items-center gap-space-xs text-on-surface font-caption-micro text-[11px] border border-outline-variant/40">
                  <span className="material-symbols-outlined text-[15px] text-primary">zoom_in</span>
                  <span>Authentic Stock Photo</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Row (4 items) */}
            <div className="grid grid-cols-4 gap-space-sm">
              {galleryImages.map((thumb, idx) => {
                const isSelected = activeThumb === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveThumb(idx)}
                    className={`text-left p-1.5 rounded-lg bg-surface-container-lowest shadow-xs transition-all border ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary/20 shadow-sm'
                        : 'border-outline-variant hover:border-primary/60'
                    }`}
                  >
                    <div className="aspect-square bg-surface-container-low rounded overflow-hidden flex items-center justify-center">
                      <img src={thumb.url} alt={thumb.label} className="w-full h-full object-cover mix-blend-multiply" />
                    </div>
                    <span className="block mt-1 text-center font-caption-micro text-[11px] text-on-surface truncate font-medium">
                      {thumb.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Product Overview Highlights Box */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg border border-outline-variant mt-space-xs">
              <div className="flex items-center gap-space-xs mb-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                <h2 className="font-subheading text-[18px] font-bold text-on-surface">Product Overview</h2>
              </div>
              <p className="font-body-base text-[14px] text-on-surface-variant leading-relaxed mb-space-md">
                {product.description ||
                  'High quality certified stationery designed for standard laser and inkjet kiosk printing. Delivers crisp smooth feed, anti-jam sheet flatness, and reliable toner adhesion.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-1 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-primary text-[22px]">print</span>
                  <span className="font-metadata-label text-[13px] font-bold text-on-surface">Laser & Inkjet Safe</span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant leading-snug">
                    Zero curl under high fuser heat; micro-porous surface adhesion.
                  </span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-1 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-primary text-[22px]">water_drop</span>
                  <span className="font-metadata-label text-[13px] font-bold text-on-surface">Smudge Proofing</span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant leading-snug">
                    Rapid ink absorption prevents wet seal smudging during dispatch.
                  </span>
                </div>
                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-1 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-primary text-[22px]">border_style</span>
                  <span className="font-metadata-label text-[13px] font-bold text-on-surface">Pre-printed Design</span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant leading-snug">
                    Crisp official demarcation matching government portal standards.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: BUYING BLOCK & SPECS (lg:col-span-5) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg flex flex-col border border-outline-variant">
              {/* SKU & Stock Pill */}
              <div className="flex items-center justify-between gap-space-sm mb-space-xs">
                <div className="flex items-center gap-space-xs text-on-surface-variant font-caption-micro text-[11px] uppercase tracking-wider">
                  <span>SKU:</span>
                  <span className="font-bold text-on-surface">{product.sku}</span>
                  <span className="text-outline">|</span>
                  <span>HSN: 4802</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-caption-micro text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#12B76A]"></span>
                  <span className="font-semibold text-[#12B76A]">{product.stockStatus}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-section-heading text-[22px] lg:text-[26px] font-bold text-on-surface leading-tight mb-space-sm">
                {product.name}
              </h1>
              <p className="font-caption-micro text-[12px] text-on-surface-variant mb-space-md">
                {product.specification}
              </p>

              {/* Price Box */}
              <div className="bg-surface-container-low rounded-lg p-space-md mb-space-lg flex flex-col border border-outline-variant/50">
                <div className="flex items-baseline gap-space-sm flex-wrap">
                  <span className="font-display-hero text-[32px] lg:text-[36px] leading-tight font-bold text-primary tracking-tight">
                    ₹{product.price}
                  </span>
                  {product.mrp && (
                    <span className="font-body-base text-[16px] text-outline line-through">
                      MRP ₹{product.mrp}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-secondary-fixed text-primary font-caption-micro text-[11px] font-bold uppercase tracking-wide">
                      {discountPercent}% OFF
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-on-surface-variant font-caption-micro text-[11px]">
                  <span className="material-symbols-outlined text-[15px] text-primary">receipt_long</span>
                  <span>Inclusive of all taxes • 100% GST Tax Credit Invoice Provided</span>
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart / Buy Now CTAs */}
              <div className="flex flex-col gap-space-md mb-space-lg">
                <div className="flex items-center justify-between">
                  <label className="font-metadata-label text-[13px] font-bold text-on-surface uppercase tracking-wider">
                    Quantity (Packs):
                  </label>
                  <div className="inline-flex items-center bg-surface-container-low rounded-lg p-1 border border-outline-variant">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center font-bold text-[18px]"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-metadata-label font-bold text-on-surface text-[14px]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center font-bold text-[18px]"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-sm pt-space-xs">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="sm:col-span-7 h-12 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold tracking-wide uppercase transition-colors flex items-center justify-center gap-space-xs shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {cartSuccess ? 'check_circle' : 'shopping_bag'}
                    </span>
                    <span>{cartSuccess ? 'Added to Cart!' : 'Add to Cart'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="sm:col-span-3 h-12 rounded-lg bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container transition-colors font-metadata-label text-[13px] font-bold uppercase tracking-wide flex items-center justify-center"
                  >
                    Buy Now
                  </button>

                  <button
                    type="button"
                    aria-label="Add to Wishlist"
                    onClick={() => toggleWishlist(product)}
                    className={`sm:col-span-2 h-12 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-center border border-outline-variant ${
                      inWish ? 'text-error' : 'text-on-surface-variant hover:text-error'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={{ fontVariationSettings: inWish ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>
              </div>

              {/* Technical Specifications DL Table */}
              <div className="pt-space-md border-t border-surface-container">
                <h3 className="font-metadata-label text-[13px] font-bold text-on-surface uppercase tracking-wider mb-space-sm flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">fact_check</span>
                  <span>Technical Specifications</span>
                </h3>
                <dl className="flex flex-col rounded-lg overflow-hidden border border-outline-variant/60">
                  <div className="flex items-center justify-between px-space-md py-2.5 bg-surface-container-low">
                    <dt className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                      Sheet Size
                    </dt>
                    <dd className="font-metadata-label text-[13px] text-on-surface font-medium">A4 (210 × 297 mm)</dd>
                  </div>
                  <div className="flex items-center justify-between px-space-md py-2.5 bg-surface-container-lowest">
                    <dt className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                      GSM Caliper
                    </dt>
                    <dd className="font-metadata-label text-[13px] text-on-surface font-medium">85 - 100 GSM Bond</dd>
                  </div>
                  <div className="flex items-center justify-between px-space-md py-2.5 bg-surface-container-low">
                    <dt className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                      Pack Packaging
                    </dt>
                    <dd className="font-metadata-label text-[13px] text-on-surface font-medium">
                      {product.specification}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between px-space-md py-2.5 bg-surface-container-lowest">
                    <dt className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                      Base Substrate
                    </dt>
                    <dd className="font-metadata-label text-[13px] text-on-surface font-medium">
                      High-grade Maplitho Bond
                    </dd>
                  </div>
                  <div className="flex items-center justify-between px-space-md py-2.5 bg-surface-container-low">
                    <dt className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                      Institutional SKU
                    </dt>
                    <dd className="font-metadata-label text-[13px] text-on-surface font-mono font-medium">
                      {product.sku}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between px-space-md py-2.5 bg-surface-container-lowest">
                    <dt className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                      Protective Packing
                    </dt>
                    <dd className="font-metadata-label text-[13px] text-on-surface font-medium">
                      Sealed Moisture-Proof Pack
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Delivery Reassurance Pill */}
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant p-space-md flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[26px]">local_shipping</span>
                <div className="flex flex-col">
                  <span className="font-metadata-label text-[13px] font-bold text-on-surface">Direct Consignment Logistics</span>
                  <span className="font-caption-micro text-[11px] text-on-surface-variant">
                    Serviceable across all 33+ Rajasthan districts & eMitra kiosks.
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
            </div>
          </div>
        </div>

        {/* 3. FREQUENTLY BOUGHT TOGETHER BUNDLE */}
        <section className="w-full bg-surface-container-lowest rounded-xl shadow-xs p-space-lg mb-space-xl border border-outline-variant">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm mb-space-lg">
            <div>
              <span className="font-caption-micro text-[11px] uppercase tracking-wider text-primary font-bold">
                Bundle Procurement
              </span>
              <h3 className="font-subheading text-[20px] font-bold text-on-surface">Frequently Bought Together</h3>
            </div>
            <div className="text-on-surface-variant font-caption-micro text-[12px]">
              Consolidated SKU dispatch • Single freight consignment
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
            {/* 3 Bundle Items */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {/* Item 1 (Main) */}
              <div className="relative bg-surface-container-low rounded-lg p-space-md flex flex-col justify-between border border-outline-variant/60">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked disabled className="w-4 h-4 rounded text-primary accent-primary" />
                    <span className="font-caption-micro text-[11px] uppercase tracking-wide font-bold text-primary">
                      This Item
                    </span>
                  </label>
                  <span className="font-metadata-label text-[13px] font-bold text-on-surface">₹{product.price}</span>
                </div>
                <div className="aspect-video w-full bg-surface-container-lowest rounded overflow-hidden mb-2 p-1 flex items-center justify-center">
                  <img src={baseImg} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="font-body-compact text-[13px] text-on-surface font-semibold line-clamp-2">
                  {product.name}
                </div>
              </div>

              {/* Addon 1 */}
              <div className="relative bg-surface-container-low rounded-lg p-space-md flex flex-col justify-between border border-outline-variant/60">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bundleInclude1}
                      onChange={(e) => setBundleInclude1(e.target.checked)}
                      className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                    />
                    <span className="font-caption-micro text-[11px] uppercase tracking-wide font-bold text-on-surface-variant">
                      Add-on 1
                    </span>
                  </label>
                  <span className="font-metadata-label text-[13px] font-bold text-on-surface">₹{addon1.price}</span>
                </div>
                <div className="aspect-video w-full bg-surface-container-lowest rounded overflow-hidden mb-2 p-1 flex items-center justify-center">
                  <img src={addon1.img} alt={addon1.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="font-body-compact text-[13px] text-on-surface font-semibold line-clamp-2">
                  {addon1.name}
                </div>
              </div>

              {/* Addon 2 */}
              <div className="relative bg-surface-container-low rounded-lg p-space-md flex flex-col justify-between border border-outline-variant/60">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bundleInclude2}
                      onChange={(e) => setBundleInclude2(e.target.checked)}
                      className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                    />
                    <span className="font-caption-micro text-[11px] uppercase tracking-wide font-bold text-on-surface-variant">
                      Add-on 2
                    </span>
                  </label>
                  <span className="font-metadata-label text-[13px] font-bold text-on-surface">₹{addon2.price}</span>
                </div>
                <div className="aspect-video w-full bg-surface-container-lowest rounded overflow-hidden mb-2 p-1 flex items-center justify-center">
                  <img src={addon2.img} alt={addon2.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="font-body-compact text-[13px] text-on-surface font-semibold line-clamp-2">
                  {addon2.name}
                </div>
              </div>
            </div>

            {/* Bundle Summary & CTA */}
            <div className="lg:col-span-4 bg-surface-container rounded-lg p-space-lg flex flex-col justify-between h-full border border-outline-variant/60">
              <div>
                <span className="font-caption-micro text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                  Bundle Summary
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-caption-micro text-[12px] text-on-surface-variant">Combined Price:</span>
                  <span className="font-display-hero text-[28px] font-bold text-primary">₹{bundleTotal}</span>
                </div>
                <div className="font-caption-micro text-[11px] text-on-surface-variant mt-1">
                  Includes applicable taxes & unified institutional packing.
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full mt-space-md h-12 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-metadata-label text-[13px] font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {bundleSuccess ? 'check_circle' : 'add_shopping_cart'}
                </span>
                <span>
                  {bundleSuccess ? 'Added to Cart!' : `Add Selected (${bundleItemsCount} items) to Cart`}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <section className="w-full mb-space-xl">
            <div className="flex items-center justify-between mb-space-lg">
              <div>
                <span className="font-caption-micro text-[11px] uppercase tracking-wider text-primary font-bold">
                  Catalog Alignment
                </span>
                <h3 className="font-subheading text-[20px] font-bold text-on-surface">Related Products</h3>
              </div>
              <Link
                to={`/category/${product.categoryId}`}
                className="font-metadata-label text-[13px] font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>View Category</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-gutter-desktop">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* MOBILE FIXED BOTTOM ACTION BAR */}
      <div className="lg:hidden fixed bottom-14 inset-x-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xs shadow-[0_-2px_12px_rgba(18,48,90,0.08)] px-4 py-2.5 flex items-center justify-between gap-space-sm border-t border-outline-variant/60">
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="font-price-display text-[20px] font-bold text-primary">₹{product.price}</span>
            {product.mrp && <span className="font-caption-micro text-outline line-through text-[11px]">₹{product.mrp}</span>}
          </div>
          <span className="font-caption-micro text-[10px] text-on-surface-variant leading-none">GST included</span>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-3.5 h-10 bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim font-body-compact text-[13px] font-bold rounded-lg active:scale-95 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
            <span>{cartSuccess ? 'Added' : 'Cart'}</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="px-5 h-10 bg-primary text-on-primary hover:bg-primary-container font-body-compact text-[13px] font-bold rounded-lg shadow-xs active:scale-95 transition-all flex items-center justify-center"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
