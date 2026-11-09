import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    eyebrow: 'OFFICE STATIONERY & PRINTING SUPPLIES',
    titleLine1: 'eMitra Stationery and',
    titleLine2: 'Everyday Office Supplies',
    description: 'Paper, printing supplies, PVC cards, lamination products and office essentials delivered across India.',
    primaryButtonText: 'Shop Products',
    primaryButtonLink: '/products',
    secondaryButtonText: 'Explore Categories',
    secondaryButtonLink: '#category-grid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2EbXqAGVU4IUDkR-hy9Op80GuIWZRZpWwCZ0CJwWBjTllwUVvc9s9POMG5uisI0NokR8Jl8M6gBHsWxtXuUT2jaiedLfvyy4VzHvVm0guLSzxDOf5lCeK0hOeFX38oEilCG99vOT78x7wTOvln3WKD1nrYsED7aUSU4egQIW7cVA_DlXsMT_JtdwQHkQp23k8Wc1I15VA2cSSTq2ZciRaT1RVObhd0RZaQf4psLcQnJPiswLFVXJJ'
  },
  {
    id: 2,
    eyebrow: 'OFFICIAL SERVICE PAPERS & BOOKLETS',
    titleLine1: 'eMitra Papers & Ration',
    titleLine2: 'Card Booklets in Stock',
    description: 'Pre-printed digital stationary paper and citizen service booklets ready for immediate dispatch across Rajasthan and India.',
    primaryButtonText: 'Explore Papers',
    primaryButtonLink: '/category/emitra-paper',
    secondaryButtonText: 'View Ration Booklets',
    secondaryButtonLink: '/category/ration-card-booklets',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApK_nrImppquifJgsf4UpD1g0g_2uTx0srjsDIZ5hNZHKrTs9eb4mCDd-toGVPc-exagYzFDVX0QImnzf1P5nrdblSSouL5TvPbE-vMon-ltVsQTyK4AADv3PpuSibW-3hRrvZoAVCUEMGWEOKkGEUuhXmw0frvMHs-Aeo7peYs-jmUIzb_On4Gb7JkRJBvSNCYLZPSc4zFyAhC_GOVwQWbVn98cG7q4pYuoM7bPJB7stQIG8u4w9H'
  },
  {
    id: 3,
    eyebrow: 'PROTECTIVE FILMS & CARD PRINTING',
    titleLine1: 'Crystal Clear Lamination',
    titleLine2: '& Blank PVC ID Cards',
    description: 'High-clarity thermal pouches in ID to A4 sizes, paired with CR80 blank PVC cards for crisp, smudge-proof citizen records.',
    primaryButtonText: 'View Lamination',
    primaryButtonLink: '/category/lamination-pouches',
    secondaryButtonText: 'Browse PVC Cards',
    secondaryButtonLink: '/category/pvc-cards',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUCU2aV99C7gUgA2GFRK9MrK6UFc3nwE92sqKt_XmDNEPPDyxBD6F39Cs-lG8ubUtPBxWcagvFf4LUbyACqzE2Vr6zzPe1Ufqp5ocjRMgpoHNIgjFZyL3_T8gf-_ap42Ay2C2wj5wptUMrgGFrtC8rvGPl8UMQMubemEkIkkYIohpIDgnqtn-x-8FJbzI3ir9nDhW0LHlftZ7MPSXEUuU5gDZXXhsRoa6ecwvSS6m2SchWDRtatWjl'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <>
      {/* ================= REFINED DESKTOP HERO SLIDER (hidden on mobile, lg:block) ================= */}
      <section className="hidden lg:block w-full bg-surface-container-lowest border-b border-outline-variant py-space-xl">
        <div className="max-w-[1280px] mx-auto px-margin-desktop">
          <div className="relative bg-surface-container-low rounded-xl p-space-xl overflow-hidden min-h-[420px] flex flex-col justify-center border border-outline-variant/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
              {/* Left Column Content */}
              <div className="lg:col-span-7 flex flex-col items-start z-10">
                <div className="inline-flex items-center gap-space-xs bg-[#EAF1FA] text-primary px-3 py-1 rounded-full mb-space-md border border-[#D0E0F5]">
                  <span className="font-caption-micro text-[11px] uppercase tracking-wider font-bold">
                    {slide.eyebrow}
                  </span>
                </div>
                <h1 className="font-display-hero text-[44px] lg:text-[48px] text-tertiary tracking-tight font-bold mb-space-md leading-[1.18]">
                  {slide.titleLine1} {slide.titleLine2}
                </h1>
                <p className="font-body-base text-[16px] text-on-surface-variant max-w-[540px] mb-space-lg leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-wrap items-center gap-space-md">
                  <Link
                    to={slide.primaryButtonLink}
                    className="inline-flex items-center justify-center h-11 px-6 rounded bg-primary text-on-primary font-body-compact text-[15px] font-semibold hover:bg-tertiary transition-colors gap-space-xs shadow-sm"
                  >
                    <span>{slide.primaryButtonText}</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                  <a
                    href={slide.secondaryButtonLink}
                    className="inline-flex items-center justify-center h-11 px-6 rounded bg-surface-container-lowest text-on-surface border border-outline-variant font-body-compact text-[15px] font-semibold hover:bg-surface-container transition-colors"
                  >
                    {slide.secondaryButtonText}
                  </a>
                </div>
              </div>

              {/* Right Column Graphic Showcase */}
              <div className="lg:col-span-5 relative flex items-center justify-center mt-space-lg lg:mt-0">
                <div className="relative w-full max-w-[440px] aspect-[4/3] rounded-xl bg-surface-container-lowest p-2 border border-outline-variant flex items-center justify-center overflow-hidden shadow-xs">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={slide.image}
                    alt="Tirupati International Supply Showcase"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center justify-between mt-space-lg pt-space-sm border-t border-outline-variant">
              <div className="flex items-center gap-space-xs">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`transition-all duration-200 ${
                      currentSlide === idx ? 'w-6 h-2 rounded-full bg-primary' : 'w-2 h-2 rounded-full bg-outline-variant'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="w-8 h-8 rounded bg-surface-container-lowest text-on-surface border border-outline-variant hover:border-primary hover:text-primary flex items-center justify-center transition-colors shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="w-8 h-8 rounded bg-surface-container-lowest text-on-surface border border-outline-variant hover:border-primary hover:text-primary flex items-center justify-center transition-colors shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEDICATED MOBILE HERO BANNER (lg:hidden) ================= */}
      <section className="lg:hidden px-4 pt-3 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/70 shadow-sm p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <span className="inline-block py-0.5 px-2 rounded-full bg-[#EAF1FA] text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
                OFFICE STATIONERY & PRINTING SUPPLIES
              </span>
              <h1 className="text-[20px] font-bold text-tertiary leading-tight mb-1.5">
                eMitra Stationery and Everyday Office Supplies
              </h1>
              <p className="text-[12px] text-on-surface-variant leading-relaxed mb-3">
                Paper, printing supplies, PVC cards, lamination products and office essentials delivered across India.
              </p>
              <div className="flex gap-2">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-primary text-on-primary font-semibold text-[12px] shadow-sm"
                >
                  Shop Products
                </Link>
                <a
                  href="#category-grid"
                  className="inline-flex items-center justify-center h-8 px-3 rounded-lg bg-surface-container-low text-on-surface font-semibold text-[12px] border border-outline-variant"
                >
                  Explore
                </a>
              </div>
            </div>
            <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-xl bg-surface-container-low overflow-hidden shrink-0 border border-outline-variant/50">
              <img
                className="w-full h-full object-cover"
                src={slide.image}
                alt="eMitra Supplies Preview"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>

          {/* Slider Pagination Indicators */}
          <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-outline-variant/40">
            <div className="flex items-center gap-1">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`transition-all duration-200 ${
                    currentSlide === idx ? 'w-5 h-1.5 rounded-full bg-primary' : 'w-1.5 h-1.5 rounded-full bg-outline-variant'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
              <span>Verified Stock</span>
              <span className="material-symbols-outlined text-[14px]">verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEDICATED QUICK TRUST STRIP (lg:hidden) ================= */}
      <section className="lg:hidden px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/60">
            <span className="material-symbols-outlined text-primary text-[18px]">local_shipping</span>
            <span className="text-[12px] text-on-surface font-medium whitespace-nowrap">All India Delivery</span>
          </div>
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/60">
            <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
            <span className="text-[12px] text-on-surface font-medium whitespace-nowrap">GST Invoice</span>
          </div>
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/60">
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            <span className="text-[12px] text-on-surface font-medium whitespace-nowrap">Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-surface-container-lowest shadow-sm border border-outline-variant/60">
            <span className="material-symbols-outlined text-primary text-[18px]">sync</span>
            <span className="text-[12px] text-on-surface font-medium whitespace-nowrap">7-Day Replacement</span>
          </div>
        </div>
      </section>
    </>
  );
};

