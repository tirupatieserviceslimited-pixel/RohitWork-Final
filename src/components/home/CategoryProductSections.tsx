import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';

const INITIAL_DISPLAY_COUNT = 4;

interface ProductCatalogCardProps {
  product: Product;
}

const ProductCatalogCard: React.FC<ProductCatalogCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t, language } = useLanguage();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const inWish = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'Out of Stock';

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const getProductWhatsappUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://tirupatiservices.in';
    const productUrl = `${origin}/product/${product.id}`;
    const message = `Hello, I want to inquire about ${product.name} - ${productUrl}`;
    return `https://wa.me/919785420850?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-3 sm:p-4 border border-outline-variant hover:border-primary/60 transition-all duration-200 flex flex-col justify-between h-full group hover:shadow-sm">
      <div className="flex flex-col">
        {/* Image Box */}
        <div className="relative w-full aspect-square bg-surface-container-low rounded-lg overflow-hidden mb-2.5 p-2 flex items-center justify-center">
          {discountPercent > 0 && (
            <span className="absolute top-2 left-2 bg-primary text-on-primary font-caption-micro text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded font-bold z-10">
              {discountPercent}% OFF
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label="Add to Wishlist"
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/90 text-on-surface-variant hover:text-error flex items-center justify-center transition-colors shadow-2xs z-10"
          >
            <span className={`material-symbols-outlined text-[16px] ${inWish ? 'text-error fill-1' : ''}`}>
              favorite
            </span>
          </button>

          <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Stock Status Badge */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-[#12B76A]'}`} />
          <span className={`text-[11px] font-semibold ${isOutOfStock ? 'text-red-700' : 'text-[#027A48]'}`}>
            {product.stockStatus === 'In Stock'
              ? t('inStock')
              : product.stockStatus === 'Low Stock'
              ? t('lowStock')
              : t('outOfStock')}
          </span>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-product-title text-[13px] sm:text-[14px] leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-2 min-h-[38px] sm:min-h-[42px] mb-1 font-semibold"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Specification */}
        <p className="font-metadata-label text-[11px] sm:text-[12px] text-on-surface-variant line-clamp-1 mb-2">
          {product.specification}
        </p>
      </div>

      {/* Pricing & Actions */}
      <div className="mt-auto pt-2 border-t border-outline-variant/50 flex flex-col gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-price-display text-[16px] sm:text-[18px] font-bold text-on-surface">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[11px] sm:text-[12px] text-on-surface-variant line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[10px] text-on-surface-variant block">
            {t('taxIncluded')}
          </span>
        </div>

        {/* Quantity and Add to Cart Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-1.5 w-full min-w-0">
          <div className="flex items-center justify-between md:justify-center border border-outline-variant rounded bg-surface-container-low shrink-0 h-8 sm:h-9 px-1 md:px-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              disabled={isOutOfStock || qty <= 1}
              className="w-8 md:w-7 h-full flex items-center justify-center text-on-surface hover:text-primary active:scale-95 disabled:opacity-30 text-sm font-bold"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="flex-1 md:w-7 text-center text-xs font-semibold text-on-surface select-none">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((prev) => prev + 1)}
              disabled={isOutOfStock}
              className="w-8 md:w-7 h-full flex items-center justify-center text-on-surface hover:text-primary active:scale-95 disabled:opacity-30 text-sm font-bold"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`w-full md:flex-1 h-9 rounded text-xs sm:text-[13px] font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-2xs active:scale-[0.98] ${
              justAdded
                ? 'bg-[#12B76A] text-white'
                : 'bg-primary text-on-primary hover:bg-tertiary disabled:bg-surface-container-high disabled:cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] sm:text-[17px] shrink-0">
              {justAdded ? 'check' : 'shopping_cart'}
            </span>
            <span className="whitespace-nowrap">
              {justAdded
                ? t('addedToCart')
                : isOutOfStock
                ? t('outOfStock')
                : t('addToCart')}
            </span>
          </button>
        </div>

        {/* WhatsApp Inquiry Button */}
        <a
          href={getProductWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-8 rounded border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          title="Inquire about this product on WhatsApp"
        >
          <span className="material-symbols-outlined text-[16px] text-[#25D366] shrink-0">chat</span>
          <span className="whitespace-nowrap">{t('whatsappEnquiry')}</span>
        </a>
      </div>
    </div>
  );
};

export const CategoryProductSections: React.FC = () => {
  const { t, language } = useLanguage();
  // Set of expanded category IDs
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  return (
    <div id="catalog-sections" className="w-full py-8 lg:py-12 bg-surface-container-low space-y-12">
      {/* Catalog Intro Banner */}
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-outline-variant">
          <div>
            <span className="text-xs font-bold text-primary tracking-wider uppercase">
              {language === 'hi' ? 'संपूर्ण कैटलॉग' : 'Complete Kiosk Catalog'}
            </span>
            <h2 className="font-display-hero text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              {language === 'hi' ? 'श्रेणी अनुसार सभी उत्पाद' : 'All Products by Category'}
            </h2>
            <p className="text-sm text-on-surface-variant mt-1 max-w-xl">
              {language === 'hi'
                ? 'सभी असली उत्पाद, वास्तविक कीमतें एवं राजस्थान भर में कैश ऑन डिलीवरी सुविधा।'
                : 'Browse genuine stationery, official booklets, biometric devices, and consumables with doorstep Cash on Delivery.'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#12B76A]"></span>
            <span>{products.length} Products in Catalog</span>
          </div>
        </div>
      </div>

      {/* Map through each Category */}
      {categories.map((cat, index) => {
        const catProducts = products.filter(
          (p) => p.categoryId === cat.id || p.category.toLowerCase() === cat.name.toLowerCase()
        );

        if (catProducts.length === 0) return null;

        const isExpanded = !!expandedCategories[cat.id];
        const visibleProducts = isExpanded
          ? catProducts
          : catProducts.slice(0, INITIAL_DISPLAY_COUNT);
        const hasMore = catProducts.length > INITIAL_DISPLAY_COUNT;

        return (
          <React.Fragment key={cat.id}>
            <section
              id={`category-${cat.slug}`}
              className="max-w-[1440px] mx-auto px-margin scroll-mt-36 lg:scroll-mt-44"
            >
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 sm:p-6 lg:p-8 shadow-2xs">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant/60">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-container-low flex items-center justify-center border border-outline-variant/60 shrink-0 overflow-hidden">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                        />
                      ) : (
                        <span className="material-symbols-outlined text-primary text-[24px]">
                          inventory_2
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-section-heading text-lg sm:text-xl font-bold text-on-surface">
                          {cat.name}
                        </h3>
                        <span className="bg-surface-container-high text-on-surface-variant text-[11px] font-bold px-2 py-0.5 rounded-full">
                          {catProducts.length}
                        </span>
                      </div>
                      {cat.description && (
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 line-clamp-1">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <a
                      href="#category-shortcuts"
                      className="text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                      <span className="hidden sm:inline">Top</span>
                    </a>
                    <Link
                      to={`/category/${cat.id}`}
                      className="text-xs font-semibold text-primary hover:text-tertiary transition-colors flex items-center gap-0.5"
                    >
                      <span>{language === 'hi' ? 'श्रेणी देखें' : 'View Page'}</span>
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </Link>
                  </div>
                </div>

                {/* Products Grid: 2 columns mobile, 3 tablet, 4 desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {visibleProducts.map((product) => (
                    <ProductCatalogCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Inline Expand Button: Show More / Aur Products Dekhein */}
                {hasMore && (
                  <div className="mt-6 pt-4 border-t border-outline-variant/60 flex justify-center">
                    <button
                      type="button"
                      onClick={() => toggleCategoryExpand(cat.id)}
                      className="h-10 px-6 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-semibold text-xs sm:text-sm border border-outline-variant hover:border-primary transition-all flex items-center gap-2 shadow-2xs active:scale-[0.98]"
                    >
                      <span>
                        {isExpanded
                          ? t('showLess')
                          : `${t('showMore')} (${catProducts.length - INITIAL_DISPLAY_COUNT} ${language === 'hi' ? 'अन्य' : 'more'})`}
                      </span>
                      <span className="material-symbols-outlined text-[18px]">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Interspersed Bulk Enquiry Callout after category #4 */}
            {index === 3 && (
              <div className="max-w-[1440px] mx-auto px-margin my-6">
                <div className="bg-gradient-to-r from-primary to-[#0D2447] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-1">
                      <span className="material-symbols-outlined text-[16px] text-[#25D366]">chat</span>
                      <span>Wholesale Kiosk Rates</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {t('bulkEnquiryTitle')}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm max-w-xl">
                      {t('bulkEnquirySubtitle')}
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919785420850?text=Hello%20Tirupati%20International%2C%20I%20want%20to%20inquire%20about%20bulk%20stationery%20carton%20rates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 h-11 px-6 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-sm transition-transform active:scale-95 flex items-center gap-2 shadow"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>{t('bulkEnquiryBtn')}</span>
                  </a>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
