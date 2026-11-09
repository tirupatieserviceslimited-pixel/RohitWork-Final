import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const BestSellers: React.FC = () => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <>
      {/* ================= DESKTOP BEST SELLERS (lg:block) ================= */}
      <section className="hidden lg:block w-full py-space-xl bg-surface-container-lowest border-y border-outline-variant" id="products-shelf">
        <div className="max-w-[1280px] mx-auto px-margin-desktop">
          <div className="mb-space-lg flex items-baseline justify-between">
            <div>
              <h2 className="font-section-heading text-[28px] text-tertiary font-semibold tracking-tight">
                Best Sellers
              </h2>
              <p className="font-body-compact text-[14px] text-on-surface-variant mt-0.5">
                Essential stationery items frequently ordered by eMitra kiosks.
              </p>
            </div>
            <Link
              to="/products"
              className="text-[13px] font-semibold text-primary hover:text-tertiary transition-colors flex items-center gap-1"
            >
              <span>View All</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-gutter-desktop">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILE BEST SELLERS (lg:hidden) ================= */}
      <section className="lg:hidden pt-3 pb-2" id="products-shelf">
        <div className="flex items-baseline justify-between px-4 mb-1">
          <h2 className="text-[17px] font-bold text-on-surface">Best Sellers</h2>
          <Link to="/products" className="text-[13px] font-semibold text-primary">
            View All
          </Link>
        </div>
        <p className="text-[12px] text-on-surface-variant px-4 mb-2.5">
          Essential stationery items frequently ordered by eMitra kiosks.
        </p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory px-4 pb-2">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>
    </>
  );
};

