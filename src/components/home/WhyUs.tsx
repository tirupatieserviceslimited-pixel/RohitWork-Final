import React from 'react';

export const WhyUs: React.FC = () => {
  const points = [
    {
      icon: 'local_shipping',
      title: 'All India Delivery',
      description: 'Reliable dispatched delivery across Rajasthan districts and pan-India locations.'
    },
    {
      icon: 'verified_user',
      title: 'Secure Payments',
      description: 'Transparent B2B order request and direct institutional settlement options.'
    },
    {
      icon: 'receipt_long',
      title: 'GST Invoice Compliant',
      description: 'Download compliant B2B tax invoices instantly with your kiosk business GSTIN.'
    },
    {
      icon: 'sync',
      title: '7-Day Replacement',
      description: 'Verification assistance for eligible damaged, wrong, or transit-defective paper packs.'
    },
    {
      icon: 'inventory',
      title: 'Live Stock Availability',
      description: 'Real-time stock indicators updated continuously through our Jaipur central hub.'
    }
  ];

  return (
    <>
      {/* ================= DESKTOP WHY SHOP WITH US (lg:block) ================= */}
      <section className="hidden lg:block w-full py-space-xl bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-margin-desktop">
          <div className="mb-space-lg text-center max-w-[640px] mx-auto">
            <h2 className="font-section-heading text-[28px] text-tertiary font-semibold tracking-tight">
              Why Shop with Us
            </h2>
            <p className="font-body-compact text-[14px] text-on-surface-variant mt-1">
              Reliable supply solutions tailored for commercial offices and eMitra kiosks.
            </p>
          </div>

          <div className="grid grid-cols-5 gap-gutter-desktop">
            {points.map((pt, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant p-space-md flex flex-col justify-start hover:border-primary/50 transition-colors shadow-2xs"
              >
                <div className="w-10 h-10 rounded bg-[#EAF1FA] text-primary flex items-center justify-center mb-space-md">
                  <span className="material-symbols-outlined text-[22px]">{pt.icon}</span>
                </div>
                <h3 className="font-product-title text-[15px] font-bold text-on-surface mb-1">
                  {pt.title}
                </h3>
                <p className="font-body-compact text-[13px] text-on-surface-variant leading-relaxed">
                  {pt.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILE WHY SHOP WITH US (lg:hidden) ================= */}
      <section className="lg:hidden px-4 py-3">
        <h2 className="text-[17px] font-bold text-on-surface mb-0.5">Why Shop with Us</h2>
        <p className="text-[12px] text-on-surface-variant mb-3">
          Reliable supply solutions tailored for commercial offices and eMitra kiosks.
        </p>

        {/* 2x2 grid for first 4 features */}
        <div className="grid grid-cols-2 gap-2.5">
          {points.slice(0, 4).map((pt, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex flex-col justify-start"
            >
              <div className="w-8 h-8 rounded-lg bg-[#EAF1FA] text-primary flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">{pt.icon}</span>
              </div>
              <h3 className="text-[13px] font-bold text-on-surface mb-1">{pt.title}</h3>
              <p className="text-[11px] text-on-surface-variant leading-normal line-clamp-2">
                {pt.description}
              </p>
            </div>
          ))}
        </div>

        {/* 5th feature full width */}
        <div className="mt-2.5 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EAF1FA] text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">{points[4].icon}</span>
          </div>
          <div>
            <h3 className="text-[13px] font-bold text-on-surface">{points[4].title}</h3>
            <p className="text-[11px] text-on-surface-variant leading-normal">
              {points[4].description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

