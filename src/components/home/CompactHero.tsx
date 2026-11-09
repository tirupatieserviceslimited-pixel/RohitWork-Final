import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const CompactHero: React.FC = () => {
  const { t, language } = useLanguage();

  const handleShopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('catalog-sections') || document.getElementById('category-shortcuts');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-surface-container-lowest via-surface-container-low to-surface-container-lowest border-b border-outline-variant py-8 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/80 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
          {/* Subtle decorative background watermarks */}
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 -bottom-16 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Heading, Value Prop, CTAs */}
            <div className="lg:col-span-8 flex flex-col items-start">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary-fixed-dim text-xs font-bold uppercase tracking-wider mb-4 border border-secondary-fixed">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                <span>{t('heroEyebrow')}</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display-hero text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-3">
                {t('heroTitle')}
              </h1>

              {/* Description */}
              <p className="font-body-base text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed mb-6">
                {t('heroDescription')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                <a
                  href="#catalog-sections"
                  onClick={handleShopClick}
                  className="h-11 sm:h-12 px-6 rounded-lg bg-primary text-on-primary font-semibold text-sm sm:text-base hover:bg-tertiary transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>{t('shopProducts')}</span>
                </a>

                <a
                  href="https://wa.me/919785420850?text=Hello%20Tirupati%20International%2C%20I%20want%20to%20order%20eMitra%20stationery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 px-5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-sm sm:text-base transition-all duration-200 flex items-center gap-2 shadow-sm active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>WhatsApp: +91 97854 20850</span>
                </a>

                <a
                  href="tel:+919785420850"
                  className="h-11 sm:h-12 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-colors flex items-center gap-2 border border-outline-variant"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                  <span>{language === 'hi' ? 'कॉल करें' : 'Call: 97854 20850'}</span>
                </a>
              </div>

              {/* Trust & Policy Strip */}
              <div className="w-full pt-4 border-t border-outline-variant/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0">local_shipping</span>
                  <span className="font-medium">{t('rajasthanDelivery')} (Approx. 7 Days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0">payments</span>
                  <span className="font-medium">{t('codAvailable')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0">published_with_changes</span>
                  <span className="font-medium">Replacement for Damaged Goods</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual highlights / Quick order banner */}
            <div className="lg:col-span-4 bg-gradient-to-br from-primary-fixed to-secondary-fixed/40 rounded-xl p-5 border border-primary/20 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-primary tracking-wider uppercase bg-surface-container-lowest/80 px-2.5 py-1 rounded-md">
                  Rajasthan Kiosk Hub
                </span>
                <span className="flex items-center gap-1 text-xs text-[#027A48] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#12B76A] animate-pulse"></span>
                  Ready to Dispatch
                </span>
              </div>

              <div className="space-y-2.5 my-2">
                <div className="bg-surface-container-lowest/90 backdrop-blur-xs p-3 rounded-lg border border-outline-variant/40 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">description</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">eMitra Papers & Ration Booklets</p>
                    <p className="text-[11px] text-on-surface-variant">100 / 500 Sheets & Official Booklets</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest/90 backdrop-blur-xs p-3 rounded-lg border border-outline-variant/40 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">badge</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">PVC Cards & Lamination Pouches</p>
                    <p className="text-[11px] text-on-surface-variant">CR80 Plastic & 125 Mic ID Pouches</p>
                  </div>
                </div>

                <div className="bg-surface-container-lowest/90 backdrop-blur-xs p-3 rounded-lg border border-outline-variant/40 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">fingerprint</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-on-surface truncate">Biometric Scanners & Registers</p>
                    <p className="text-[11px] text-on-surface-variant">Morpho / Mantra Scanners & Ledger Books</p>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-primary/20 text-center">
                <span className="text-[12px] text-on-surface-variant font-medium">
                  {language === 'hi' ? 'फोन पर भी ऑर्डर स्वीकार्य:' : 'Phone Orders Accepted:'}{' '}
                  <strong className="text-on-surface">+91 97854 20850</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
