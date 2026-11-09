import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export const CategoryGrid: React.FC = () => {
  // Use first 8 categories as defined in reference
  const displayCategories = categories.slice(0, 8);

  return (
    <>
      {/* ================= DESKTOP CATEGORY GRID (lg:block) ================= */}
      <section className="hidden lg:block w-full py-space-xl bg-surface-container-lowest" id="category-grid">
        <div className="max-w-[1280px] mx-auto px-margin-desktop">
          <div className="mb-space-lg">
            <h2 className="font-section-heading text-[28px] text-tertiary font-semibold tracking-tight">
              Shop by Category
            </h2>
            <p className="font-body-compact text-[14px] text-on-surface-variant mt-0.5">
              Select an office supply category to browse our inventory.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-gutter-desktop">
            {displayCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant hover:border-primary/60 hover:shadow-md transition-all"
              >
                <div className="relative w-full aspect-[4/3] bg-surface-container-low overflow-hidden flex items-center justify-center p-space-sm">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-space-md flex flex-col">
                  <h3 className="font-product-title text-[15px] font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="font-metadata-label text-[13px] text-on-surface-variant mt-0.5 line-clamp-1">
                    {cat.subtitle || cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DEDICATED MOBILE CATEGORY GRID (lg:hidden) ================= */}
      <section className="lg:hidden px-4 pt-3 pb-2" id="category-grid">
        <div className="flex items-baseline justify-between mb-0.5">
          <h2 className="text-[17px] font-bold text-on-surface">Shop by Category</h2>
          <Link to="/products" className="text-[13px] font-semibold text-primary">
            View All
          </Link>
        </div>
        <p className="text-[12px] text-on-surface-variant mb-3">
          Browse paper, printing and office supply categories.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-xs border border-outline-variant/60 active:scale-[0.98] transition-transform"
            >
              <div className="h-24 sm:h-28 w-full bg-surface-container overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-2 text-center">
                <span className="font-body-compact text-[13px] font-semibold text-on-surface line-clamp-1">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

