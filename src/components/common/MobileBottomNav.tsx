import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { totalItemsCount } = useCart();

  const navItems = [
    { label: 'Home', to: '/', icon: 'home' },
    { label: 'Categories', to: '/products', icon: 'category' },
    { label: 'Cart', to: '/cart', icon: 'shopping_cart', badge: totalItemsCount },
    { label: 'Orders', to: '/orders', icon: 'receipt_long' },
    { label: 'Contact', to: '/contact', icon: 'support_agent' }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-1px_10px_rgba(0,0,0,0.05)] border-t border-outline-variant/60">
      <div className="flex justify-around items-center h-16 px-space-xs">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-11 transition-colors relative ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-primary text-on-primary font-bold text-[9px] min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-caption-micro text-[11px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]"></div>
    </nav>
  );
};

