import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';

export const Header: React.FC = () => {
  const { totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { language, toggleLanguage, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
      {/* 1. Desktop Utility Bar (Desktop only) */}
      <div className="hidden lg:block bg-surface-container-low text-on-surface-variant font-metadata-label border-b border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-margin-desktop h-9 flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-space-lg">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
              <span className="text-on-surface font-medium">All India Delivery</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px] text-primary">receipt_long</span>
              <span className="text-on-surface font-medium">GST Invoice Available</span>
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <Link
              to="/track-order"
              className="flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
              <span>{t('trackOrder')}</span>
            </Link>
            <div className="h-3.5 w-px bg-outline-variant"></div>
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-space-xs cursor-pointer hover:text-primary transition-colors text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-[16px]">translate</span>
              <span>{language === 'hi' ? 'हिंदी / English' : 'English / हिंदी'}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Desktop Main Header (Desktop only) */}
      <div className="hidden lg:block h-[74px] bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-margin-desktop h-full flex items-center justify-between gap-gutter-desktop">
          {/* Brand Identity */}
          <Link
            to="/"
            title="Tirupati International Services Limited - Home"
            className="flex items-center shrink-0 group py-1.5 focus:outline-none"
          >
            <img
              src="/assets/tirupati-logo.png"
              alt="Tirupati International Services Limited"
              className="h-11 sm:h-12 w-auto max-w-[240px] object-contain transition-transform group-hover:scale-[1.01]"
            />
          </Link>

          {/* Central Catalog Search */}
          <div className="flex-1 max-w-[540px]">
            <form onSubmit={handleSearch} className="relative flex items-center w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search paper, stationery, ink, PVC cards and more..."
                className="w-full h-10 pl-space-md pr-12 rounded bg-surface-container-lowest border border-outline-variant text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-body-compact text-[14px] transition-all"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center hover:bg-tertiary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">search</span>
              </button>
            </form>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-space-lg shrink-0">
            <Link
              to="/contact"
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-metadata-label text-[14px]"
            >
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <span>Contact</span>
            </Link>
            <Link
              to="/wishlist"
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-metadata-label text-[14px]"
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-primary text-on-primary font-caption-micro text-[10px] flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              </div>
              <span>Wishlist</span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-metadata-label text-[14px]"
            >
              <span className="material-symbols-outlined text-[20px]">package_2</span>
              <span>Orders</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-surface-container-low border border-outline-variant text-on-surface hover:border-primary hover:text-primary transition-all font-metadata-label text-[14px]"
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-primary">shopping_cart</span>
                <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-on-primary font-caption-micro text-[10px] flex items-center justify-center font-bold">
                  {totalItemsCount}
                </span>
              </div>
              <span className="font-semibold">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Desktop Category Navigation Bar (Desktop only) */}
      <div className="hidden lg:block h-[44px] bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-margin-desktop h-full flex items-center gap-space-lg">
          <div className="relative h-full flex items-center">
            <button
              type="button"
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="h-full flex items-center gap-space-xs text-primary font-semibold text-[14px] pr-space-md border-r border-outline-variant hover:text-tertiary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">category</span>
              <span>All Categories</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            {categoriesDropdownOpen && (
              <div
                onMouseLeave={() => setCategoriesDropdownOpen(false)}
                className="absolute top-full left-0 w-64 bg-surface-container-lowest border border-outline-variant rounded-md shadow-lg py-2 z-50"
              >
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/category/${c.id}`}
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-4 py-2 text-[13px] text-on-surface hover:bg-surface-container-low hover:text-primary transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
                <div className="border-t border-outline-variant mt-1 pt-1">
                  <Link
                    to="/products"
                    onClick={() => setCategoriesDropdownOpen(false)}
                    className="block px-4 py-2 text-[13px] font-semibold text-primary hover:bg-surface-container-low"
                  >
                    View All Products →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 flex items-center gap-space-lg overflow-x-auto whitespace-nowrap text-[14px] no-scrollbar">
            <Link to="/category/emitra-paper" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              eMitra Paper
            </Link>
            <Link to="/category/ration-card-booklets" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              Ration Card & Booklets
            </Link>
            <Link to="/category/a4-office-paper" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              A4 & Office Paper
            </Link>
            <Link to="/category/photo-paper" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              Photo Paper
            </Link>
            <Link to="/category/pvc-cards" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              PVC Cards
            </Link>
            <Link to="/category/lamination-pouches" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              Lamination
            </Link>
            <Link to="/category/printer-ink-toner" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              Printer Ink & Toner
            </Link>
            <Link to="/category/files-office-stationery" className="text-on-surface-variant hover:text-primary transition-colors py-1">
              Office Stationery
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="text-on-surface-variant hover:text-primary transition-colors py-1 flex items-center gap-0.5"
              >
                <span>More...</span>
                <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
              </button>
              {moreDropdownOpen && (
                <div
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                  className="absolute top-full left-0 w-44 bg-surface-container-lowest border border-outline-variant rounded-md shadow-lg py-1.5 z-50"
                >
                  <Link
                    to="/products"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="block px-3 py-1.5 text-[13px] text-on-surface hover:text-primary hover:bg-surface-container-low"
                  >
                    All Products
                  </Link>
                  <Link
                    to="/track-order"
                    onClick={() => setMoreDropdownOpen(false)}
                    className="block px-3 py-1.5 text-[13px] text-on-surface hover:text-primary hover:bg-surface-container-low"
                  >
                    Track Consignment
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* 4. Dedicated Mobile Header (< lg) matching mobile_homepage/code.html */}
      <div className="lg:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant">
        <div className="h-28 flex flex-col justify-between px-margin">
          {/* Top Row: Menu + Logo + Cart */}
          <div className="h-14 flex items-center justify-between gap-space-sm">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="w-10 h-10 flex items-center justify-center -ml-1 text-on-surface hover:text-primary transition-colors focus:outline-none shrink-0"
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
              <Link
                to="/"
                title="Tirupati International Services Limited - Home"
                className="flex items-center min-w-0 py-1"
              >
                <img
                  src="/assets/tirupati-logo.png"
                  alt="Tirupati International Services Limited"
                  className="h-8 sm:h-9 max-h-9 w-auto max-w-[170px] sm:max-w-[210px] object-contain shrink-0"
                />
              </Link>
            </div>
            <div className="flex items-center shrink-0">
              <Link
                to="/cart"
                aria-label="View Cart"
                className="w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary transition-colors relative"
              >
                <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
                {totalItemsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-primary text-on-primary font-caption-micro text-[10px] flex items-center justify-center font-bold">
                    {totalItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Row */}
          <div className="h-12 pb-space-xs flex items-center">
            <form
              onSubmit={handleSearch}
              className="w-full h-10 bg-surface-container-low rounded-xl px-space-md flex items-center gap-space-sm shadow-[0_1px_3px_rgba(18,48,90,0.04)] border border-outline-variant/60"
            >
              <span className="material-symbols-outlined text-outline text-[20px] shrink-0">search</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stationery, paper, ink..."
                className="w-full bg-transparent font-body-compact text-[14px] text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="button"
                onClick={toggleLanguage}
                title="Toggle language"
                className="w-8 h-8 flex items-center justify-center text-outline hover:text-primary transition-colors shrink-0 text-xs font-semibold"
              >
                {language === 'en' ? 'हिं' : 'EN'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Modal */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant pb-3">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  title="Tirupati International Services Limited - Home"
                  className="flex items-center py-1"
                >
                  <img
                    src="/assets/tirupati-logo.png"
                    alt="Tirupati International Services Limited"
                    className="h-9 w-auto max-w-[190px] object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
                  aria-label="Close menu"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

              {/* Navigation links */}
              <div className="space-y-1 text-sm font-medium">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg ${
                    location.pathname === '/' ? 'bg-surface-container-low text-primary font-bold' : 'text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  {t('home')}
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low"
                >
                  All Products
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low"
                >
                  {t('orders')}
                </Link>
                <Link
                  to="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low"
                >
                  {t('trackOrder')}
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low"
                >
                  {t('wishlist')} ({wishlistCount})
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low"
                >
                  {t('contact')}
                </Link>
              </div>

              {/* Categories list in drawer */}
              <div className="border-t border-outline-variant pt-3">
                <h4 className="text-[11px] font-bold text-outline uppercase tracking-wider px-3 mb-2">
                  Stationery Categories
                </h4>
                <div className="space-y-1 text-[13px]">
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      to={`/category/${c.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-on-surface-variant hover:text-primary hover:bg-surface-container-low rounded-lg"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary"
              >
                <span className="material-symbols-outlined text-[16px]">translate</span>
                <span>Switch to {language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

