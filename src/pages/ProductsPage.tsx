import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';

const HINDI_SYNONYMS: Record<string, string[]> = {
  'कागज': ['paper', 'sheet', 'ream'],
  'कागज़': ['paper', 'sheet', 'ream'],
  'पेपर': ['paper', 'sheet', 'ream'],
  'राशन': ['ration', 'bpl'],
  'कार्ड': ['card', 'pvc'],
  'पीवीसी': ['pvc', 'plastic'],
  'लेमिनेशन': ['lamination', 'pouch'],
  'फोटो': ['photo', 'envelope'],
  'रजिस्टर': ['register', 'book'],
  'बही': ['register', 'book'],
  'पुस्तिका': ['booklet', 'ration'],
  'स्याही': ['ink', 'toner'],
  'इंक': ['ink', 'toner'],
  'मुहर': ['stamp', 'seal'],
  'स्टाम्प': ['stamp'],
  'स्टांप': ['stamp'],
  'सील': ['stamp'],
  'टीशर्ट': ['t-shirt', 'shirt', 'polo'],
  'टी शर्ट': ['t-shirt', 'shirt', 'polo'],
  'स्कैनर': ['scanner', 'morpho', 'mantra', 'device', 'biometric'],
  'बायोमेट्रिक': ['biometric', 'scanner', 'morpho', 'mantra'],
  'कवर': ['cover', 'sleeve'],
  'बैनर': ['banner', 'flex', 'rate'],
  'फ्लेक्स': ['banner', 'flex'],
  'किट': ['kit', 'services']
};

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const handleCategoryChange = (catId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('search', searchQuery);
    setSearchParams(newParams);
    setInStockOnly(false);
    setPriceRange('all');
    setMinDiscount(0);
    setSortOption('featured');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category match
        if (activeCategory && activeCategory !== 'all') {
          if (p.categoryId !== activeCategory) return false;
        }

        // Search query match (Supports English and Hindi keywords)
        if (searchQuery) {
          const q = searchQuery.toLowerCase().trim();
          const pName = p.name.toLowerCase();
          const pCat = p.category.toLowerCase();
          const pSpec = (p.specification || '').toLowerCase();
          const pSku = (p.sku || '').toLowerCase();

          // Direct text match
          const directMatch =
            pName.includes(q) ||
            pCat.includes(q) ||
            pSpec.includes(q) ||
            pSku.includes(q);

          if (directMatch) return true;

          // Check Hindi / English synonyms match
          let synonymMatch = false;
          for (const [hindiWord, syns] of Object.entries(HINDI_SYNONYMS)) {
            if (q.includes(hindiWord)) {
              if (syns.some((syn) => pName.includes(syn) || pCat.includes(syn) || pSpec.includes(syn))) {
                synonymMatch = true;
                break;
              }
            }
          }

          if (!synonymMatch) return false;
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
  }, [activeCategory, searchQuery, inStockOnly, priceRange, minDiscount, sortOption]);

  const activeCategoryObj = categories.find((c) => c.id === activeCategory);

  return (
    <div className="w-full bg-surface-container-low min-h-screen py-4 lg:py-6">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-margin-desktop">
        {/* 1. BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-metadata-label text-[13px] mb-space-md flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <Link to="/products" className="hover:text-primary transition-colors">Catalog</Link>
          {activeCategoryObj && (
            <>
              <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
              <span className="text-on-surface font-semibold">{activeCategoryObj.name}</span>
            </>
          )}
          {searchQuery && (
            <>
              <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
              <span className="text-on-surface font-semibold">Search: "{searchQuery}"</span>
            </>
          )}
        </nav>

        {/* 2. CATALOG BANNER */}
        <section className="bg-surface-container-lowest rounded-xl p-space-md lg:p-space-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg relative overflow-hidden mb-space-lg border border-outline-variant">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex flex-col gap-space-xs pl-space-sm max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-caption-micro text-[11px] font-bold uppercase tracking-wider">
                Direct Wholesale Supply
              </span>
              <span className="font-caption-micro text-[11px] text-outline">
                {filteredProducts.length} Products Available
              </span>
            </div>
            <h1 className="font-section-heading text-[26px] lg:text-[32px] font-bold text-tertiary tracking-tight">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : activeCategoryObj
                ? activeCategoryObj.name
                : 'All eMitra & Stationery Supplies'}
            </h1>
            <p className="font-body-compact text-[14px] text-on-surface-variant leading-relaxed">
              {searchQuery
                ? `Showing authentic B2B products matching your query with GST billing and direct Rajasthan dispatch.`
                : activeCategoryObj?.description ||
                  'Certified pre-printed certificate papers, PVC smart cards, thermal lamination rolls, and laser consumables for eMitra kiosks.'}
            </p>
          </div>
          <div className="flex items-center gap-space-sm pl-space-sm md:pl-0 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/60">
              <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
              <div className="flex flex-col">
                <span className="font-caption-micro text-[10px] text-on-surface-variant uppercase font-bold">Logistics</span>
                <span className="font-metadata-label text-[12px] text-on-surface font-semibold">All Rajasthan Kiosks</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg border border-outline-variant/60">
              <span className="material-symbols-outlined text-[20px] text-primary">receipt_long</span>
              <div className="flex flex-col">
                <span className="font-caption-micro text-[10px] text-on-surface-variant uppercase font-bold">Tax Invoicing</span>
                <span className="font-metadata-label text-[12px] text-on-surface font-semibold">100% GST ITC Claim</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. QUICK CATEGORY CHIPS */}
        <div className="flex items-center gap-space-xs overflow-x-auto no-scrollbar pb-space-sm mb-space-lg -mx-4 px-4 lg:mx-0 lg:px-0">
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`px-space-md py-1.5 rounded-full font-metadata-label text-[13px] whitespace-nowrap transition-all border shrink-0 ${
              activeCategory === 'all'
                ? 'bg-primary text-on-primary border-primary font-bold shadow-xs'
                : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary'
            }`}
          >
            All Categories ({products.length})
          </button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.categoryId === cat.id).length;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-space-md py-1.5 rounded-full font-metadata-label text-[13px] whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-primary text-on-primary border-primary font-bold shadow-xs'
                    : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary hover:text-primary'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* 4. MAIN WORKSPACE (SIDEBAR + PRODUCT GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-outline-variant sticky top-[170px] space-y-space-lg">
            <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
              <div className="flex items-center gap-space-xs font-product-title text-[15px] font-bold text-on-surface">
                <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                <span>Filters</span>
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="font-caption-micro text-[11px] text-primary hover:underline font-semibold uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>

            {/* Categories Filter */}
            <div className="space-y-space-sm">
              <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-outline block">
                Category
              </span>
              <div className="space-y-1.5">
                <label className="flex items-center justify-between text-body-compact text-[13px] text-on-surface cursor-pointer select-none hover:text-primary">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="filter_cat"
                      checked={activeCategory === 'all'}
                      onChange={() => handleCategoryChange('all')}
                      className="accent-primary"
                    />
                    <span className={activeCategory === 'all' ? 'font-semibold text-primary' : ''}>All Categories</span>
                  </div>
                  <span className="font-caption-micro text-outline text-[11px]">{products.length}</span>
                </label>
                {categories.map((c) => {
                  const count = products.filter((p) => p.categoryId === c.id).length;
                  return (
                    <label
                      key={c.id}
                      className="flex items-center justify-between text-body-compact text-[13px] text-on-surface cursor-pointer select-none hover:text-primary"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="filter_cat"
                          checked={activeCategory === c.id}
                          onChange={() => handleCategoryChange(c.id)}
                          className="accent-primary"
                        />
                        <span className={activeCategory === c.id ? 'font-semibold text-primary' : ''}>{c.name}</span>
                      </div>
                      <span className="font-caption-micro text-outline text-[11px]">{count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-space-sm border-t border-surface-container space-y-space-xs">
              <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-outline block">
                Availability
              </span>
              <label className="flex items-center gap-2 text-body-compact text-[13px] text-on-surface cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-primary rounded"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Price Filter */}
            <div className="pt-space-sm border-t border-surface-container space-y-space-xs">
              <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-outline block">
                Price Range
              </span>
              <div className="space-y-1.5">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-200', label: 'Under ₹200' },
                  { id: '200-500', label: '₹200 - ₹500' },
                  { id: '500-1000', label: '₹500 - ₹1,000' },
                  { id: 'above-1000', label: 'Above ₹1,000' }
                ].map((pr) => (
                  <label
                    key={pr.id}
                    className="flex items-center gap-2 text-body-compact text-[13px] text-on-surface cursor-pointer select-none hover:text-primary"
                  >
                    <input
                      type="radio"
                      name="price_range"
                      checked={priceRange === pr.id}
                      onChange={() => setPriceRange(pr.id)}
                      className="accent-primary"
                    />
                    <span className={priceRange === pr.id ? 'font-semibold text-primary' : ''}>{pr.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount Filter */}
            <div className="pt-space-sm border-t border-surface-container space-y-space-xs">
              <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-outline block">
                Discount
              </span>
              <div className="space-y-1.5">
                {[
                  { val: 0, label: 'All Items' },
                  { val: 20, label: '20% or more' },
                  { val: 40, label: '40% or more' },
                  { val: 50, label: '50% or more' }
                ].map((d) => (
                  <label
                    key={d.val}
                    className="flex items-center gap-2 text-body-compact text-[13px] text-on-surface cursor-pointer select-none hover:text-primary"
                  >
                    <input
                      type="radio"
                      name="min_discount"
                      checked={minDiscount === d.val}
                      onChange={() => setMinDiscount(d.val)}
                      className="accent-primary"
                    />
                    <span className={minDiscount === d.val ? 'font-semibold text-primary' : ''}>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT CATALOG CONTENT */}
          <main className="lg:col-span-9 flex flex-col gap-space-md">
            {/* TOOLBAR */}
            <div className="bg-surface-container-lowest rounded-xl p-space-sm lg:px-space-md flex flex-wrap items-center justify-between gap-space-sm shadow-xs border border-outline-variant">
              <div className="flex items-center gap-space-sm">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-[13px] font-semibold border border-outline-variant"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                  <span>Filter</span>
                </button>

                <span className="font-metadata-label text-[13px] text-on-surface-variant">
                  Showing <strong className="text-on-surface">{filteredProducts.length}</strong> items
                </span>
              </div>

              <div className="flex items-center gap-space-sm ml-auto">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-1.5 text-body-compact text-[13px]">
                  <span className="text-outline hidden sm:inline">Sort:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="h-8 px-2.5 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface font-medium text-[13px] focus:outline-none focus:border-primary"
                  >
                    <option value="featured">Featured / Recommended</option>
                    <option value="best-selling">Best Sellers First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="discount">Highest Discount</option>
                    <option value="latest">Latest Arrivals</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center bg-surface-container-low rounded-lg p-0.5 border border-outline-variant">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                      viewMode === 'grid' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                    }`}
                    title="Grid View"
                  >
                    <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                      viewMode === 'list' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-outline hover:text-on-surface'
                    }`}
                    title="List View"
                  >
                    <span className="material-symbols-outlined text-[18px]">view_list</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ACTIVE FILTERS CHIPS */}
            {(inStockOnly || priceRange !== 'all' || minDiscount > 0 || activeCategory !== 'all' || searchQuery) && (
              <div className="flex items-center gap-space-xs flex-wrap font-caption-micro text-[11px]">
                <span className="text-outline font-semibold uppercase">Active:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-semibold">
                    Query: {searchQuery}
                    <button
                      type="button"
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.delete('search');
                        setSearchParams(newParams);
                      }}
                      className="hover:text-error"
                    >
                      ×
                    </button>
                  </span>
                )}
                {activeCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-semibold">
                    {activeCategoryObj?.name}
                    <button type="button" onClick={() => handleCategoryChange('all')} className="hover:text-error">
                      ×
                    </button>
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-semibold">
                    In Stock
                    <button type="button" onClick={() => setInStockOnly(false)} className="hover:text-error">
                      ×
                    </button>
                  </span>
                )}
                {priceRange !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-semibold">
                    Price: {priceRange}
                    <button type="button" onClick={() => setPriceRange('all')} className="hover:text-error">
                      ×
                    </button>
                  </span>
                )}
                {minDiscount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-primary font-semibold">
                    Min {minDiscount}% Off
                    <button type="button" onClick={() => setMinDiscount(0)} className="hover:text-error">
                      ×
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-primary hover:underline font-semibold ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* PRODUCT LISTING */}
            {filteredProducts.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-10 sm:p-14 text-center border border-outline-variant shadow-2xs space-y-4 max-w-lg mx-auto my-8">
                <div className="w-16 h-16 rounded-full bg-surface-container-low mx-auto flex items-center justify-center text-outline">
                  <span className="material-symbols-outlined text-[36px]">search_off</span>
                </div>
                <div>
                  <h3 className="font-section-heading text-lg sm:text-xl font-bold text-on-surface">
                    No Matching Stationery Items Found
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                    कोई उत्पाद नहीं मिला। कृपया अलग नाम से खोजें या अपने फिल्टर रीसेट करें।
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="w-full sm:w-auto px-5 h-10 bg-primary text-on-primary font-semibold text-xs sm:text-sm rounded-lg hover:bg-tertiary transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                    <span>Reset All Filters / रीसेट करें</span>
                  </button>
                  <a
                    href={`https://wa.me/919785420850?text=${encodeURIComponent(
                      `Hello Tirupati International, I was searching for "${searchQuery}" on your website but could not find it. Do you have it in stock?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 h-10 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-gutter-desktop">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="bg-surface-container-lowest rounded-xl p-space-md border border-outline-variant shadow-xs flex flex-col sm:flex-row items-center gap-space-md hover:shadow-sm transition-shadow"
                  >
                    <Link to={`/product/${p.id}`} className="w-28 h-28 shrink-0 bg-surface-container-low rounded-lg p-2 flex items-center justify-center">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col gap-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 font-caption-micro text-[11px] text-outline">
                        <span>SKU: {p.sku}</span>
                        <span>•</span>
                        <span className="text-[#12B76A] font-semibold">{p.stockStatus}</span>
                      </div>
                      <Link to={`/product/${p.id}`} className="font-product-title text-product-title font-semibold text-on-surface hover:text-primary transition-colors">
                        {p.name}
                      </Link>
                      <p className="font-body-compact text-[13px] text-on-surface-variant line-clamp-1">
                        {p.specification}
                      </p>
                    </div>
                    <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-price-display text-price-display font-bold text-primary">₹{p.price}</span>
                        {p.mrp && <span className="font-caption-micro text-outline line-through text-[12px]">₹{p.mrp}</span>}
                      </div>
                      <Link
                        to={`/product/${p.id}`}
                        className="px-4 h-9 bg-primary hover:bg-primary-container text-on-primary font-metadata-label text-[12px] font-bold uppercase rounded-lg transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-on-surface/40 backdrop-blur-xs">
          <div className="w-4/5 max-w-sm bg-surface-container-lowest h-full p-space-lg flex flex-col shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between pb-space-sm border-b border-surface-container mb-space-md">
              <span className="font-subheading text-[18px] font-bold text-on-surface">Filter Catalog</span>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-space-md flex-1">
              <div>
                <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-outline block mb-2">
                  Category
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[14px]">
                    <input
                      type="radio"
                      name="m_filter_cat"
                      checked={activeCategory === 'all'}
                      onChange={() => handleCategoryChange('all')}
                      className="accent-primary"
                    />
                    <span>All Categories</span>
                  </label>
                  {categories.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 text-[14px]">
                      <input
                        type="radio"
                        name="m_filter_cat"
                        checked={activeCategory === c.id}
                        onChange={() => handleCategoryChange(c.id)}
                        className="accent-primary"
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-space-sm border-t border-surface-container">
                <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-outline block mb-2">
                  Availability
                </span>
                <label className="flex items-center gap-2 text-[14px]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-primary rounded"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              <div className="pt-space-sm border-t border-surface-container">
                <span className="font-caption-micro text-[11px] font-bold uppercase tracking-wider text-outline block mb-2">
                  Price Range
                </span>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under-200', label: 'Under ₹200' },
                    { id: '200-500', label: '₹200 - ₹500' },
                    { id: '500-1000', label: '₹500 - ₹1,000' },
                    { id: 'above-1000', label: 'Above ₹1,000' }
                  ].map((pr) => (
                    <label key={pr.id} className="flex items-center gap-2 text-[14px]">
                      <input
                        type="radio"
                        name="m_price_range"
                        checked={priceRange === pr.id}
                        onChange={() => setPriceRange(pr.id)}
                        className="accent-primary"
                      />
                      <span>{pr.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-space-md border-t border-surface-container flex items-center gap-space-sm">
              <button
                type="button"
                onClick={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-1/2 h-10 rounded-lg bg-surface-container-low text-on-surface font-semibold text-[13px]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 h-10 rounded-lg bg-primary text-on-primary font-semibold text-[13px]"
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
