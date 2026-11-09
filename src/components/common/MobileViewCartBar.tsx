import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export const MobileViewCartBar: React.FC = () => {
  const { totalItemsCount, subtotal } = useCart();
  const { t, language } = useLanguage();
  const location = useLocation();

  // Hide on Cart, Checkout, and Success pages
  if (
    totalItemsCount === 0 ||
    location.pathname === '/cart' ||
    location.pathname === '/checkout' ||
    location.pathname.startsWith('/order-confirmation')
  ) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile cart notification"
      className="lg:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] inset-x-0 z-40 px-3 py-2 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-md mx-auto bg-primary text-on-primary rounded-xl px-4 py-3 shadow-xl flex items-center justify-between border border-white/20 animate-in slide-in-from-bottom-3 duration-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-xs">
            {totalItemsCount}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold leading-tight">
              {totalItemsCount} {language === 'hi' ? 'सामान कार्ट में' : totalItemsCount === 1 ? 'item in Cart' : 'items in Cart'}
            </span>
            <span className="text-[13px] font-bold">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <Link
          to="/cart"
          className="h-8 px-4 rounded-lg bg-surface-container-lowest text-primary font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
        >
          <span>{t('viewCart')}</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </Link>
      </div>
    </aside>
  );
};
