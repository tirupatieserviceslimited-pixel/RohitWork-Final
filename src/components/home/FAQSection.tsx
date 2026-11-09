import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface FAQItem {
  id: string;
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'ordering',
    questionEn: 'How do I place an order for eMitra stationery?',
    questionHi: 'ई-मित्र स्टेशनरी के लिए ऑर्डर कैसे करें?',
    answerEn:
      'You can browse our complete catalog on this website, select the required quantities of paper, PVC cards, lamination, or registers, and click "Add to Cart". In the checkout screen, provide your kiosk delivery address and submit. There is no password or mandatory registration required.',
    answerHi:
      'आप हमारी वेबसाइट पर सभी उत्पाद देख सकते हैं, आवश्यक मात्रा में पेपर, पीवीसी कार्ड, लेमिनेशन या रजिस्टर चुनकर "कार्ट में जोड़ें" पर क्लिक करें। चेकआउट पेज पर अपनी दुकान का पता भरें और ऑर्डर सबमिट करें। किसी पासवर्ड या रजिस्ट्रेशन की जरूरत नहीं है।'
  },
  {
    id: 'delivery-timeline',
    questionEn: 'What is the expected delivery timeline across Rajasthan?',
    questionHi: 'पूरे राजस्थान में डिलीवरी में कितना समय लगता है?',
    answerEn:
      'Supplies are delivered to kiosks across all Rajasthan districts within approximately 7 working days. Once your order is verified by phone, our team dispatches it via trusted regional logistics with transit notifications.',
    answerHi:
      'राजस्थान के सभी जिलों में लगभग 7 कार्य दिवसों के भीतर सीधी डिलीवरी की जाती है। फोन पर ऑर्डर की पुष्टि होते ही माल हमारे आपूर्ति केंद्र से कूरियर द्वारा रवाना कर दिया जाता है।'
  },
  {
    id: 'cod-payment',
    questionEn: 'How does Cash on Delivery (COD) work?',
    questionHi: 'कैश ऑन डिलीवरी (सीओडी) कैसे काम करती है?',
    answerEn:
      'Cash on Delivery is available for all eligible orders across Rajasthan. You do not need to make any advance online payment. Simply hand over cash to the courier representative when the parcel arrives at your shop.',
    answerHi:
      'राजस्थान में सभी ऑर्डर्स पर कैश ऑन डिलीवरी सुविधा उपलब्ध है। आपको कोई अग्रिम भुगतान नहीं करना होगा। पार्सल आपकी दुकान पर पहुंचने पर डिलीवरी प्रतिनिधि को नकद भुगतान करें।'
  },
  {
    id: 'replacement-policy',
    questionEn: 'What happens if my stationery parcel is damaged during transit?',
    questionHi: 'यदि पार्सल रास्ते में खराब या टूटा मिले तो क्या प्रक्रिया है?',
    answerEn:
      'We offer a full replacement for verified transit damage, defective goods, or wrong items. Please inform our helpline on WhatsApp (+91 97854 20850) within 24 hours of delivery along with a clear unboxing photo or video, and we will send a free replacement without delay. Note that change-of-mind refunds are not supported for wholesale items.',
    answerHi:
      'यदि पार्सल में कोई सामान टूटा, खराब या गलत प्राप्त होता है तो हम तुरंत मुफ्त रिप्लेसमेंट भेजते हैं। डिलीवरी के 24 घंटे के भीतर पार्सल की फोटो या अनबॉक्सिंग वीडियो हमारे व्हाट्सएप नंबर (+91 97854 20850) पर भेजें। थोक सामग्री होने के कारण बिना कारण वापसी या रिफंड देय नहीं है।'
  },
  {
    id: 'bulk-orders',
    questionEn: 'Can I get wholesale carton discounts for bulk orders?',
    questionHi: 'क्या थोक या बड़े ऑर्डर के लिए विशेष कार्टन डिस्काउंट मिलता है?',
    answerEn:
      'Yes! We provide special B2B wholesale rates and tailored transport dispatch for master cartons of eMitra paper, PVC card boxes, and registers. Please tap the WhatsApp button or call +91 97854 20850 with your required quantities for custom quotes.',
    answerHi:
      'हाँ! ई-मित्र पेपर के कार्टन, पीवीसी कार्ड बॉक्स और रजिस्टरों के थोक ऑर्डर पर विशेष थोक दरें एवं ट्रांसपोर्ट सुविधा दी जाती है। आप सीधे व्हाट्सएप (+91 97854 20850) पर संपर्क कर अपनी आवश्यकता अनुसार विशेष रेट ले सकते हैं।'
  }
];

export const FAQSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('ordering');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="w-full py-10 lg:py-14 bg-surface-container-lowest border-b border-outline-variant">
      <div className="max-w-[1000px] mx-auto px-margin">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary-fixed-dim text-xs font-bold uppercase tracking-wider mb-2 border border-secondary-fixed">
            <span className="material-symbols-outlined text-[16px] text-primary">help_outline</span>
            <span>Support & Guidance</span>
          </div>
          <h2 className="font-display-hero text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {t('faqTitle')}
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            {t('faqSubtitle')}
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            const q = language === 'hi' ? faq.questionHi : faq.questionEn;
            const a = language === 'hi' ? faq.answerHi : faq.answerEn;

            return (
              <div
                key={faq.id}
                className="border border-outline-variant/80 rounded-xl bg-surface-container-low overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-surface-container-lowest transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base text-on-surface">
                    {q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-primary text-[22px] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-primary' : 'text-outline'
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/40 bg-surface-container-lowest">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-secondary-fixed/30 border border-secondary-fixed flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm sm:text-base text-on-surface">
              {language === 'hi' ? 'कोई अन्य सवाल है?' : 'Have any further questions?'}
            </h4>
            <p className="text-xs text-on-surface-variant mt-0.5">
              {language === 'hi'
                ? 'हमारी सहायता टीम से सीधे फोन या व्हाट्सएप पर बात करें।'
                : 'Our support team is available on phone and WhatsApp from 9:30 AM to 7:00 PM.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919785420850"
              className="h-10 px-4 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm border border-outline-variant flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">call</span>
              <span>+91 97854 20850</span>
            </a>
            <a
              href="https://wa.me/919785420850?text=Hello%20Tirupati%20International%2C%20I%20have%20a%20question%20regarding%20an%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
