import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      title={t('backToTop')}
      aria-label="Back to Top"
      className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-low text-on-surface hover:text-primary shadow-md hover:shadow-lg border border-outline-variant flex items-center justify-center transition-all duration-200 active:scale-95 group"
    >
      <span className="material-symbols-outlined text-[20px] sm:text-[22px] group-hover:-translate-y-0.5 transition-transform">
        arrow_upward
      </span>
    </button>
  );
};
