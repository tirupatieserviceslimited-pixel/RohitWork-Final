import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="w-full bg-surface-container-low min-h-screen py-4 lg:py-6">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop flex flex-col gap-space-md">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs font-caption-micro text-[12px] text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">home</span>
            <span>Home</span>
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold">Wishlist</span>
        </nav>

        {/* Header */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md border border-outline-variant">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1 text-[11px] font-caption-micro uppercase font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded w-fit">
              <span className="material-symbols-outlined text-[13px]">favorite</span>
              <span>Saved Items</span>
            </div>
            <h1 className="font-section-heading text-[24px] lg:text-[28px] font-bold text-on-surface">
              My Wishlist ({wishlist.length})
            </h1>
            <p className="font-body-compact text-[13px] text-on-surface-variant">
              Saved eMitra papers, PVC cards, and stationery supplies for future procurement.
            </p>
          </div>
          <Link
            to="/products"
            className="px-4 h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-metadata-label text-[13px] font-semibold flex items-center gap-1.5 transition-colors border border-outline-variant/60"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Browse More Products</span>
          </Link>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-12 text-center border border-outline-variant shadow-xs space-y-3 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-error-container text-on-error-container flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">favorite</span>
            </div>
            <h2 className="font-product-title text-[18px] font-bold text-on-surface">Your Wishlist is Empty</h2>
            <p className="font-body-compact text-[13px] text-on-surface-variant leading-relaxed">
              Explore our stationery supplies and tap the heart icon on any product card to save it here for quick access.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[13px] font-bold py-2.5 px-6 rounded-lg transition-colors shadow-xs"
              >
                <span>Explore Catalog</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-gutter-desktop">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
