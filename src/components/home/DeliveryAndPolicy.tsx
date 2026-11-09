import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const DeliveryAndPolicy: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="delivery-policy" className="w-full py-10 lg:py-14 bg-surface-container-low border-b border-outline-variant">
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary-fixed-dim text-xs font-bold uppercase tracking-wider mb-2 border border-secondary-fixed">
            <span className="material-symbols-outlined text-[16px] text-primary">policy</span>
            <span>Transparent Policies</span>
          </div>
          <h2 className="font-display-hero text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {t('policySectionTitle')}
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            {t('policySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Delivery Information */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant flex flex-col justify-between shadow-2xs hover:border-primary/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">local_shipping</span>
                </div>
                <span className="text-xs font-bold text-primary bg-surface-container-low px-3 py-1 rounded-full border border-outline-variant/60">
                  {t('deliveryBadge')}
                </span>
              </div>

              <h3 className="font-section-heading text-lg sm:text-xl font-bold text-on-surface mb-3">
                {t('deliveryTitle')}
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                {t('deliveryDesc')}
              </p>

              <div className="space-y-2.5 pt-2 border-t border-outline-variant/50 text-xs sm:text-sm text-on-surface">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#12B76A] text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Expected Transit:</strong> ~7 working days doorstep delivery across Rajasthan districts.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#12B76A] text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Secure Packaging:</strong> Moisture-proof heavy cartons to protect paper reams and PVC card boxes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#12B76A] text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Direct Dispatch:</strong> Dispatched from central Jaipur logistics hub via verified commercial carriers.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/60 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Rajasthan eMitra Network</span>
              <a href="tel:+919785420850" className="text-primary font-semibold hover:underline">
                Dispatch Status Helpline
              </a>
            </div>
          </div>

          {/* Card 2: Replacement Information */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant flex flex-col justify-between shadow-2xs hover:border-primary/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[28px]">published_with_changes</span>
                </div>
                <span className="text-xs font-bold text-[#027A48] bg-[#ECFDF3] px-3 py-1 rounded-full border border-[#D1FADF]">
                  {t('replacementBadge')}
                </span>
              </div>

              <h3 className="font-section-heading text-lg sm:text-xl font-bold text-on-surface mb-3">
                {t('replacementTitle')}
              </h3>

              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                {t('replacementDesc')}
              </p>

              <div className="space-y-2.5 pt-2 border-t border-outline-variant/50 text-xs sm:text-sm text-on-surface">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#12B76A] text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Transit Damage:</strong> Immediate replacement for torn packs, broken scanner boxes, or damaged paper.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[#12B76A] text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span><strong>Wrong Item Delivered:</strong> Sent the wrong ream or size? We arrange swift pickup and send the right pack.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">info</span>
                  <span className="text-on-surface-variant"><strong>B2B Wholesale Rule:</strong> No refund or return for change of mind after dispatch.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/60 flex items-center justify-between text-xs">
              <span className="text-on-surface-variant">Report window: 24 hrs on delivery</span>
              <a
                href="https://wa.me/919785420850?text=Hello%2C%20I%20need%20assistance%20with%20a%20replacement%20for%20my%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#128C7E] font-semibold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[16px] text-[#25D366]">chat</span>
                <span>WhatsApp Claim Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
