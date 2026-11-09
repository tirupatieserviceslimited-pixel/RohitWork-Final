import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const SupportCTA: React.FC = () => {
  const { language } = useLanguage();

  return (
    <>
      {/* ================= DESKTOP CONTACT & SUPPORT CTA (lg:block) ================= */}
      <section className="hidden lg:block w-full py-space-xl bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-margin">
          <div className="grid grid-cols-3 gap-6">
            {/* Card 1: WhatsApp Assistance */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant flex flex-col justify-between h-full shadow-2xs hover:border-primary/50 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[26px]">chat</span>
                </div>
                <h3 className="font-section-heading text-lg font-bold text-on-surface mb-1">
                  {language === 'hi' ? 'व्हाट्सएप सहायता' : 'WhatsApp Support'}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                  {language === 'hi'
                    ? 'थोक रेट, स्टॉक स्थिति और पार्सल ट्रैकिंग के लिए तुरंत व्हाट्सएप पर चैट करें।'
                    : 'Instant assistance for wholesale carton rates, stock availability, and dispatch updates.'}
                </p>
              </div>
              <a
                href="https://wa.me/919785420850?text=Hello%20Tirupati%20International%2C%20I%20need%20assistance%20with%20eMitra%20stationery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>WhatsApp: +91 97854 20850</span>
              </a>
            </div>

            {/* Card 2: Contact Support Desk */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant flex flex-col justify-between h-full shadow-2xs hover:border-primary/50 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[26px]">support_agent</span>
                </div>
                <h3 className="font-section-heading text-lg font-bold text-on-surface mb-1">
                  {language === 'hi' ? 'हेल्पलाइन डेस्क' : 'Helpline Desk'}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                  {language === 'hi'
                    ? 'कियोस्क बिलिंग, जिला स्तर पर डिलीवरी पूछताछ और फोन पर सीधे ऑर्डर देने के लिए संपर्क करें।'
                    : 'Dedicated telephone assistance for Rajasthan eMitra kiosks, order placement, and inquiries.'}
                </p>
              </div>
              <a
                href="tel:+919785420850"
                className="w-full h-11 rounded-lg bg-primary text-on-primary font-semibold text-sm hover:bg-tertiary transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Call: +91 97854 20850</span>
              </a>
            </div>

            {/* Card 3: Track Consignment */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant flex flex-col justify-between h-full shadow-2xs hover:border-primary/50 transition-colors">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 text-primary flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[26px]">inventory_2</span>
                </div>
                <h3 className="font-section-heading text-lg font-bold text-on-surface mb-1">
                  {language === 'hi' ? 'पार्सल ट्रैक करें' : 'Track Consignment'}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
                  {language === 'hi'
                    ? 'अपने ऑर्डर रेफरेंस नंबर से कूरियर एवं ट्रांसपोर्ट स्टेटस कभी भी लाइव चेक करें।'
                    : 'Check courier dispatch status and milestones using your unique Order Reference ID.'}
                </p>
              </div>
              <Link
                to="/track-order"
                className="w-full h-11 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
                <span>{language === 'hi' ? 'ऑर्डर स्टेटस देखें' : 'Track Order Consignment'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE NEED HELP? SECTION (lg:hidden) ================= */}
      <section className="lg:hidden px-4 py-6 bg-surface-container-low border-b border-outline-variant">
        <h2 className="text-base font-bold text-on-surface mb-1">
          {language === 'hi' ? 'सहायता केंद्र' : 'Need Assistance?'}
        </h2>
        <p className="text-xs text-on-surface-variant mb-4">
          {language === 'hi'
            ? 'राजस्थान के कियोस्क संचालकों के लिए फोन एवं व्हाट्सएप सेवा उपलब्ध।'
            : 'Dedicated kiosk support desk available Mon-Sat, 9:30 AM to 7:00 PM.'}
        </p>

        <div className="space-y-3">
          {/* Row 1: WhatsApp */}
          <a
            href="https://wa.me/919785420850?text=Hello%20Tirupati%20International%2C%20I%20need%20assistance%20with%20eMitra%20stationery"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-2xs flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">chat</span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-on-surface">WhatsApp Support</h3>
                <p className="text-[11px] text-on-surface-variant">+91 97854 20850 (Direct Chat)</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </a>

          {/* Row 2: Helpline */}
          <a
            href="tel:+919785420850"
            className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-2xs flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">call</span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-on-surface">Customer Helpline</h3>
                <p className="text-[11px] text-on-surface-variant">+91 97854 20850 (Tap to Call)</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </a>

          {/* Row 3: Track Order */}
          <Link
            to="/track-order"
            className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-2xs flex items-center justify-between active:scale-[0.99] transition-transform"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary-fixed/50 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-on-surface">Track Consignment</h3>
                <p className="text-[11px] text-on-surface-variant">Check dispatch milestone by reference ID</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-outline">chevron_right</span>
          </Link>
        </div>
      </section>
    </>
  );
};
