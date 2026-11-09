import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const currentCategory = categories.find((c) => c.id === categoryId) || categories[0];
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory.id);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Synchronize when route param changes
  React.useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || currentCategory;

  const clearAllFilters = () => {
    setInStockOnly(false);
    setPriceRange('all');
    setMinDiscount(0);
    setSortOption('featured');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (selectedCategory && selectedCategory !== 'all') {
          if (p.categoryId !== selectedCategory) return false;
        }

        // In Stock
        if (inStockOnly && p.stockStatus !== 'In Stock') {
          return false;
        }

        // Price range
        if (priceRange === 'under-200' && p.price >= 200) return false;
        if (priceRange === '200-500' && (p.price < 200 || p.price > 500)) return false;
        if (priceRange === '500-1000' && (p.price < 500 || p.price > 1000)) return false;
        if (priceRange === 'above-1000' && p.price <= 1000) return false;

        // Discount
        if (minDiscount > 0) {
          const discount = p.mrp && p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
          if (discount < minDiscount) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (sortOption === 'latest') return (b.isLatest ? 1 : 0) - (a.isLatest ? 1 : 0);
        if (sortOption === 'discount') {
          const discA = a.mrp ? (a.mrp - a.price) / a.mrp : 0;
          const discB = b.mrp ? (b.mrp - b.price) / b.mrp : 0;
          return discB - discA;
        }
        return 0;
      });
  }, [selectedCategory, inStockOnly, priceRange, minDiscount, sortOption]);

  return (
    <div className="w-full bg-surface-container-low min-h-screen py-4 lg:py-6">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop">
        {/* 1. BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-metadata-label text-[13px] mb-space-md">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <Link to="/products" className="hover:text-primary transition-colors">Categories</Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-on-surface font-semibold">{activeCategoryObj.name}</span>
        </nav>

        {/* 2. CATEGORY HEADER */}
        <section className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col md:flex-row items-center justify-between gap-space-lg relative overflow-hidden mb-space-lg border border-outline-variant">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex flex-col gap-space-xs pl-space-sm max-w-2xl">
            <h1 className="font-section-heading text-[26px] lg:text-[32px] font-bold text-tertiary tracking-tight">
              {activeCategoryObj.name}
            </h1>
            <p className="font-body-compact text-[14px] text-on-surface-variant leading-relaxed">
              {activeCategoryObj.description || 'Browse paper products and printing supplies available for eMitra and everyday office requirements.'}
            </p>
          </div>
          <div className="shrink-0 bg-surface-container-low p-2 rounded-xl flex items-center justify-center border border-outline-variant/60">
            <img
              className="h-20 w-44 object-cover rounded-lg shadow-2xs"
              src={activeCategoryObj.image}
              alt={activeCategoryObj.name}
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* 3. RELATED CATEGORY CHIPS */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-2 mb-space-lg shadow-xs border border-outline-variant overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2">
            {categories.slice(0, 8).map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 text-[12px] font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-1 transition-all ${
                    isSelected
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. MAIN CATALOG LAYOUT (3 cols filter, 9 cols listing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* LEFT FILTER SIDEBAR (Desktop) */}
          <aside className="hidden lg:flex lg:col-span-3 bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-outline-variant flex-col gap-space-lg sticky top-[170px]">
            <div className="flex items-center justify-between pb-space-sm bg-surface-container-low -mx-space-md -mt-space-md px-space-md pt-space-md rounded-t-xl border-b border-outline-variant">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                <span className="font-subheading text-[15px] font-bold text-on-surface">Filters</span>
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="font-caption-micro text-[11px] font-semibold text-primary hover:underline uppercase"
              >
                Clear All
              </button>
            </div>

            {/* Filter Group 1: Categories */}
            <div className="flex flex-col gap-space-sm">
              <span className="font-metadata-label text-[13px] font-bold text-tertiary">
                Categories
              </span>
              <div className="flex flex-col gap-2 pt-1 max-h-56 overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer font-body-compact text-[13px] text-on-surface hover:text-primary transition-colors"
                  >
                    <input
                      type="radio"
                      name="catalogCategory"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <span className={selectedCategory === cat.id ? 'font-semibold text-primary' : 'text-on-surface-variant'}>
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group 2: Price */}
            <div className="flex flex-col gap-space-sm pt-2 border-t border-outline-variant">
              <span className="font-metadata-label text-[13px] font-bold text-tertiary">
                Price
              </span>
              <div className="flex flex-col gap-2 pt-1 text-[13px]">
                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceRange === 'all'}
                    onChange={() => setPriceRange('all')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>All Prices</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceRange === 'under-200'}
                    onChange={() => setPriceRange('under-200')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Under ₹200</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceRange === '200-500'}
                    onChange={() => setPriceRange('200-500')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>₹200 - ₹500</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceRange === '500-1000'}
                    onChange={() => setPriceRange('500-1000')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>₹500 - ₹1,000</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary">
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceRange === 'above-1000'}
                    onChange={() => setPriceRange('above-1000')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Above ₹1,000</span>
                </label>
              </div>
            </div>

            {/* Filter Group 3: Availability */}
            <div className="flex flex-col gap-space-sm pt-2 border-t border-outline-variant">
              <span className="font-metadata-label text-[13px] font-bold text-tertiary">
                Availability
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-[13px] text-on-surface-variant hover:text-primary">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Filter Group 4: Discount */}
            <div className="flex flex-col gap-space-sm pt-2 border-t border-outline-variant">
              <span className="font-metadata-label text-[13px] font-bold text-tertiary">
                Discount
              </span>
              <div className="flex flex-col gap-2 pt-1 text-[13px]">
                {[0, 10, 25, 40].map((disc) => (
                  <label key={disc} className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary">
                    <input
                      type="radio"
                      name="discountFilter"
                      checked={minDiscount === disc}
                      onChange={() => setMinDiscount(disc)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>{disc === 0 ? 'All Discounts' : `${disc}% or more`}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT PRODUCT LISTING AREA */}
          <section className="col-span-1 lg:col-span-9 flex flex-col gap-space-md">
            {/* Toolbar */}
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-outline-variant flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
              <div className="flex items-center justify-between w-full md:w-auto">
                <div>
                  <h2 className="font-subheading text-[16px] font-bold text-tertiary">
                    {activeCategoryObj.name} Products
                  </h2>
                  <p className="font-caption-micro text-[12px] text-on-surface-variant">
                    Showing {filteredProducts.length} verified products
                  </p>
                </div>
                {/* Mobile Filter Trigger Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1 px-3 py-1.5 bg-surface-container-low rounded-lg text-primary text-[12px] font-semibold border border-outline-variant"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Filters</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto justify-between md:justify-end">
                {/* Active Filters Summary */}
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  {inStockOnly && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container text-on-surface font-caption-micro text-[11px] font-medium">
                      In Stock
                      <button onClick={() => setInStockOnly(false)} type="button" className="hover:text-error">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  )}
                  {priceRange !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container text-on-surface font-caption-micro text-[11px] font-medium">
                      {priceRange}
                      <button onClick={() => setPriceRange('all')} type="button" className="hover:text-error">
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  )}
                  {(inStockOnly || priceRange !== 'all' || minDiscount > 0) && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-primary hover:underline font-caption-micro text-[11px] font-semibold px-1"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Sort and Views */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <select
                      aria-label="Sort products"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none bg-surface-container-low pl-3 pr-8 py-2 rounded-lg text-on-surface font-metadata-label text-[13px] font-medium outline-none cursor-pointer border border-outline-variant/60"
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="best-selling">Best Selling</option>
                      <option value="latest">Latest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="discount">Highest Discount</option>
                    </select>
                    <span className="material-symbols-outlined text-[16px] text-outline absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      expand_more
                    </span>
                  </div>

                  {/* View switchers */}
                  <div className="hidden sm:flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant/60">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid View"
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'grid' ? 'bg-surface-container-lowest text-primary shadow-2xs font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">grid_view</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      aria-label="List View"
                      className={`p-1.5 rounded transition-colors ${
                        viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-2xs font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">view_list</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid / Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-12 text-center space-y-3 shadow-xs">
                <span className="material-symbols-outlined text-[36px] text-outline">inventory_2</span>
                <h3 className="text-[15px] font-bold text-tertiary">No products match your selected filters</h3>
                <p className="text-[13px] text-on-surface-variant">
                  Try clearing the price range or discount filter to view all products in this category.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-primary text-on-primary text-[13px] font-semibold rounded-md shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-gutter-desktop">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} viewMode="grid" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} viewMode="list" />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-4/5 max-w-sm bg-surface-container-lowest h-full shadow-2xl p-4 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                  <span className="font-bold text-[15px] text-tertiary">Filters</span>
                </div>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-[12px] font-bold text-outline uppercase tracking-wider mb-2">Categories</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] ${
                        selectedCategory === cat.id ? 'bg-surface-container-low text-primary font-bold' : 'text-on-surface'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="pt-2 border-t border-outline-variant">
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-on-surface">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Price */}
              <div className="pt-2 border-t border-outline-variant">
                <h4 className="text-[12px] font-bold text-outline uppercase tracking-wider mb-2">Price Range</h4>
                <div className="space-y-1 text-[13px]">
                  <button onClick={() => setPriceRange('all')} className="block w-full text-left py-1 text-on-surface">All Prices</button>
                  <button onClick={() => setPriceRange('under-200')} className="block w-full text-left py-1 text-on-surface">Under ₹200</button>
                  <button onClick={() => setPriceRange('200-500')} className="block w-full text-left py-1 text-on-surface">₹200 - ₹500</button>
                  <button onClick={() => setPriceRange('500-1000')} className="block w-full text-left py-1 text-on-surface">₹500 - ₹1,000</button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant flex gap-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-2 bg-surface-container-low text-on-surface text-[13px] font-semibold rounded-lg"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2 bg-primary text-on-primary text-[13px] font-semibold rounded-lg shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

