import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  compact?: boolean;
  showQuantity?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = 'grid',
  compact = false,
  showQuantity = true
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { t, language } = useLanguage();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const inWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const getWhatsappUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://tirupatiservices.in';
    return `https://wa.me/919785420850?text=${encodeURIComponent(`Hello, I want to inquire about ${product.name} - ${origin}/product/${product.id}`)}`;
  };

  const discountPercent =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const isOutOfStock = product.stockStatus === 'Out of Stock';

  // Compact Mobile Carousel Card
  if (compact) {
    return (
      <div className="w-[165px] shrink-0 snap-start bg-surface-container-lowest rounded-xl p-2.5 flex flex-col justify-between shadow-xs border border-outline-variant/60">
        <div>
          <div className="relative w-full h-[130px] rounded-lg bg-surface-container-low overflow-hidden mb-2 flex items-center justify-center p-1">
            {discountPercent > 0 && (
              <span className="absolute top-1.5 left-1.5 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs z-10">
                {discountPercent}% OFF
              </span>
            )}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label="Add to wishlist"
              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-surface-container-lowest/90 flex items-center justify-center text-outline hover:text-primary z-10 shadow-xs"
            >
              <span className={`material-symbols-outlined text-[15px] ${inWish ? 'text-error fill-1' : ''}`}>
                favorite
              </span>
            </button>
            <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
              <img
                className="w-full h-full object-contain"
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          <div className="flex items-center gap-1 mb-1">
            <span className={`w-1.5 h-1.5 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-[#12B76A]'}`}></span>
            <span className={`text-[10px] font-semibold ${isOutOfStock ? 'text-red-700' : 'text-[#027A48]'}`}>
              {product.stockStatus}
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="font-product-title text-[13px] font-semibold text-on-surface line-clamp-2 leading-snug min-h-[36px] hover:text-primary transition-colors block"
          >
            {product.name}
          </Link>

          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="font-price-display text-[16px] font-bold text-on-surface">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[11px] text-on-surface-variant line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[10px] text-on-surface-variant block mb-2">GST included</span>
        </div>

        <button
          type="button"
          disabled={isOutOfStock}
          onClick={() => addToCart(product, 1)}
          className="w-full h-9 rounded-lg bg-primary text-on-primary font-body-compact text-[12px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-transform disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-[16px] shrink-0">shopping_cart</span>
          <span className="whitespace-nowrap">{isOutOfStock ? t('outOfStock') : t('addToCart')}</span>
        </button>
      </div>
    );
  }

  // List View (Catalog Toolbar toggle)
  if (viewMode === 'list') {
    return (
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary/60 transition-all p-space-md flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <Link
          to={`/product/${product.id}`}
          className="w-full sm:w-36 h-36 bg-surface-container-low rounded-lg p-2 shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant/40"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
            referrerPolicy="no-referrer"
          />
        </Link>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-medium text-on-surface-variant">
              {product.category}
            </span>
            <span className="text-outline-variant">·</span>
            <span className="flex items-center gap-1 text-[12px] font-semibold text-[#027A48]">
              <span className={`w-1.5 h-1.5 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-[#12B76A]'}`} />
              <span>{product.stockStatus}</span>
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="text-[15px] font-semibold text-on-surface hover:text-primary transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          <p className="text-[13px] text-on-surface-variant line-clamp-2">
            {product.specification || product.description}
          </p>

          <div className="text-[11px] text-on-surface-variant">
            {product.taxLabel || 'Inclusive of all taxes'}
          </div>
        </div>

        <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-outline-variant">
          <div className="text-left sm:text-right">
            <div className="flex items-baseline gap-2">
              <span className="font-price-display text-[19px] font-bold text-on-surface">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-[13px] text-on-surface-variant line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <span className="text-[11px] font-bold text-primary">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className="w-9 h-9 rounded-md border border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:border-primary flex items-center justify-center transition-colors"
              title="Add to wishlist"
              aria-label="Wishlist"
            >
              <span className={`material-symbols-outlined text-[18px] ${inWish ? 'text-error fill-1' : ''}`}>
                favorite
              </span>
            </button>

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={() => addToCart(product, 1)}
              className="h-9 px-4 bg-primary hover:bg-tertiary disabled:bg-surface-container-high disabled:cursor-not-allowed text-on-primary text-[13px] font-semibold rounded transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] shrink-0">shopping_cart</span>
              <span className="whitespace-nowrap">{isOutOfStock ? t('outOfStock') : t('addToCart')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Standard Desktop Grid Card View - Exact Design Reference match
  return (
    <div className="bg-surface-container-lowest rounded-xl p-2.5 sm:p-space-md border border-outline-variant hover:border-primary/60 transition-all flex flex-col justify-between h-full group hover:shadow-sm">
      <div className="flex flex-col">
        {/* Product Image Area */}
        <div className="relative w-full aspect-square bg-surface-container-low rounded-lg overflow-hidden mb-space-sm p-space-sm flex items-center justify-center">
          {discountPercent > 0 && (
            <span className="absolute top-2.5 left-2.5 bg-primary text-on-primary font-caption-micro text-[11px] px-2 py-0.5 rounded font-bold z-10">
              {discountPercent}% OFF
            </span>
          )}
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label="Add to Wishlist"
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/90 text-on-surface-variant hover:text-error flex items-center justify-center transition-colors shadow-sm z-10"
          >
            <span className={`material-symbols-outlined text-[18px] ${inWish ? 'text-error fill-1' : ''}`}>
              favorite
            </span>
          </button>
          <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
            <img
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          </Link>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-[#12B76A]'}`}></span>
          <span className={`font-caption-micro text-[12px] font-semibold ${isOutOfStock ? 'text-red-700' : 'text-[#027A48]'}`}>
            {product.stockStatus === 'In Stock'
              ? t('inStock')
              : product.stockStatus === 'Low Stock'
              ? t('lowStock')
              : t('outOfStock')}
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-product-title text-[15px] leading-snug text-on-surface group-hover:text-primary transition-colors line-clamp-2 min-h-[44px] mb-1 block"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Specification */}
        <p className="font-metadata-label text-[13px] text-on-surface-variant mb-space-sm line-clamp-1">
          {product.specification}
        </p>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div className="mt-auto pt-space-xs flex flex-col gap-2">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-price-display text-[19px] font-bold text-on-surface">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[13px] text-on-surface-variant line-through">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <span className="text-[11px] text-on-surface-variant block mt-0.5">
            {t('taxIncluded')}
          </span>
        </div>

        {/* Quantity and Add to Cart Row */}
        {showQuantity ? (
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
        ) : (
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`w-full h-9 sm:h-10 rounded text-xs sm:text-[13px] font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] ${
              justAdded
                ? 'bg-[#12B76A] text-white'
                : 'bg-primary text-on-primary hover:bg-tertiary disabled:bg-surface-container-high disabled:cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] shrink-0">
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
        )}

        <a
          href={getWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-8 rounded border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-[11px] sm:text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
          title="Inquire about this product on WhatsApp"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-[#25D366] shrink-0">chat</span>
          <span className="whitespace-nowrap">{t('whatsappEnquiry')}</span>
        </a>
      </div>
    </div>
  );
};

