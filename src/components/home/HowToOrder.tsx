import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const HowToOrder: React.FC = () => {
  const { t, language } = useLanguage();

  const steps = [
    {
      step: '1',
      icon: 'checklist',
      title: t('step1Title'),
      desc: t('step1Desc'),
      highlight: language === 'hi' ? 'कार्ट में जोड़ें' : 'No Minimum Order'
    },
    {
      step: '2',
      icon: 'local_shipping',
      title: t('step2Title'),
      desc: t('step2Desc'),
      highlight: language === 'hi' ? 'कोई रजिस्ट्रेशन नहीं' : 'No Account Needed'
    },
    {
      step: '3',
      icon: 'payments',
      title: t('step3Title'),
      desc: t('step3Desc'),
      highlight: language === 'hi' ? 'दुकान पर नकद भुगतान' : 'Pay Upon Delivery'
    }
  ];

  return (
    <section id="how-to-order" className="w-full py-10 lg:py-14 bg-surface-container-lowest border-b border-outline-variant">
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary-fixed-dim text-xs font-bold uppercase tracking-wider mb-2 border border-secondary-fixed">
            <span className="material-symbols-outlined text-[16px] text-primary">route</span>
            <span>Simple Workflow</span>
          </div>
          <h2 className="font-display-hero text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {t('howToOrderTitle')}
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            {t('howToOrderSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/80 hover:border-primary/50 transition-all flex flex-col relative shadow-2xs group"
            >
              {/* Step indicator pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-primary text-on-primary font-bold text-base flex items-center justify-center shadow-xs">
                  {item.step}
                </span>
                <span className="text-[11px] font-bold text-primary bg-surface-container-lowest px-2.5 py-1 rounded-full border border-outline-variant/60">
                  {item.highlight}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  {item.icon}
                </span>
                <h3 className="font-section-heading text-base sm:text-lg font-bold text-on-surface">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>

              {/* Optional connector line indicator on desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-surface-container-lowest border border-outline-variant text-outline flex items-center justify-center text-xs">
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Verification note */}
        <div className="mt-8 bg-surface-container-low/70 rounded-xl p-4 border border-outline-variant/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-on-surface-variant">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0">verified_user</span>
            <span>
              {language === 'hi'
                ? 'हर ऑर्डर को पार्सल रवाना करने से पहले हमारी हेल्पलाइन टीम द्वारा फोन पर कन्फर्म किया जाता है।'
                : 'Every order is verified by our customer desk via telephone before courier dispatch to prevent wrong dispatches.'}
            </span>
          </div>
          <a
            href="tel:+919785420850"
            className="font-semibold text-primary hover:text-tertiary flex items-center gap-1 shrink-0"
          >
            <span>Call Desk: +91 97854 20850</span>
          </a>
        </div>
      </div>
    </section>
  );
};
