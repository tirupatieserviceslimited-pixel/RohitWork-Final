import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    categories: 'Categories',
    allCategories: 'All Categories',
    contact: 'Contact',
    wishlist: 'Wishlist',
    orders: 'Orders',
    cart: 'Cart',
    trackOrder: 'Track Consignment',
    searchPlaceholder: 'Search eMitra paper, PVC cards, lamination, ink, registers...',
    shopProducts: 'Shop Products',
    exploreCategories: 'Explore Categories',
    viewAllProducts: 'View All Products',
    adminDesk: 'Staff Admin Desk',
    helpline: 'Helpline',
    callUs: 'Call',
    whatsappUs: 'WhatsApp',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Cart',
    taxIncluded: 'Inclusive of all taxes',
    showMore: 'Show More Products',
    showLess: 'Show Less',
    whatsappEnquiry: 'Inquire on WhatsApp',
    viewDetails: 'View Details',
    heroEyebrow: 'OFFICIAL B2B STATIONERY & EMITRA SUPPLIES',
    heroTitle: 'Supplies for eMitra Kiosks Across Rajasthan',
    heroDescription: 'Order eMitra pre-printed papers, PVC cards, lamination pouches, biometric devices, and citizen registers directly at wholesale rates with doorstep Cash on Delivery.',
    rajasthanDelivery: 'Rajasthan-Wide Delivery',
    expectedDelivery: 'Approx. 7 Days Door Delivery',
    codAvailable: 'Cash on Delivery (COD)',
    categoryShortcuts: 'Browse by Category',
    jumpToCategory: 'Quick Category Navigation',
    howToOrderTitle: 'How to Order in 3 Simple Steps',
    howToOrderSubtitle: 'Simple, transparent ordering designed specifically for Rajasthan kiosk operators.',
    step1Title: '1. Select Products',
    step1Desc: 'Add your required eMitra papers, PVC cards, lamination pouches, or official registers to your cart.',
    step2Title: '2. Fill Delivery Details',
    step2Desc: 'Enter your kiosk name, address in Rajasthan, district, and PIN code. No password or registration needed.',
    step3Title: '3. Place Cash on Delivery Order',
    step3Desc: 'Place Cash on Delivery order. Our team calls to confirm your request before dispatching.',
    policySectionTitle: 'Delivery & Replacement Policy',
    policySubtitle: 'Clear, honest business policies for Rajasthan eMitra and CSC kiosks.',
    deliveryBadge: 'Rajasthan Delivery',
    deliveryTitle: 'Fast Supplies Across All Rajasthan Districts',
    deliveryDesc: 'All orders are dispatched from our central supply hub with expected doorstep delivery within approximately 7 working days via trusted regional logistics.',
    replacementBadge: 'Fair Replacement',
    replacementTitle: 'Replacement for Damaged or Defective Items',
    replacementDesc: 'If you receive damaged, defective, or incorrect stationery items, report within 24 hours of delivery on WhatsApp (+91 97854 20850) with an unboxing photo/video. We will promptly dispatch a free replacement. Note: As per wholesale B2B policy, returns or refunds for change of mind are not supported.',
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Everything you need to know about placing stationery orders with Tirupati International.',
    bulkEnquiryTitle: 'Need Bulk Supplies for Your Center or District?',
    bulkEnquirySubtitle: 'Connect directly on WhatsApp (+91 97854 20850) for wholesale carton rates and transport dispatch.',
    bulkEnquiryBtn: 'WhatsApp for Bulk Rates',
    viewCart: 'View Cart',
    items: 'items',
    checkout: 'Checkout',
    checkoutTitle: 'Cash on Delivery Checkout',
    codPaymentMethodTitle: 'Cash on Delivery (COD)',
    codPaymentMethodDesc: 'Pay cash when your order is delivered to your kiosk or shop.',
    backToTop: 'Back to Top',
    customerName: 'Full Customer Name',
    mobileNumber: '10-Digit Mobile Number',
    deliveryAddress: 'Complete Delivery Address',
    district: 'Rajasthan District',
    pincode: 'PIN Code',
    shopName: 'Kiosk / Shop Name (Optional)',
    emitraId: 'eMitra ID (Optional)',
    orderNotes: 'Order Notes / Landmark (Optional)',
    submitCodOrder: 'Place Cash on Delivery Order'
  },
  hi: {
    home: 'होम',
    categories: 'श्रेणियां',
    allCategories: 'सभी श्रेणियां',
    contact: 'संपर्क',
    wishlist: 'इच्छा सूची',
    orders: 'ऑर्डर्स',
    cart: 'कार्ट',
    trackOrder: 'पार्सल ट्रैक करें',
    searchPlaceholder: 'ई-मित्र पेपर, पीवीसी कार्ड, लेमिनेशन, स्याही खोजें...',
    shopProducts: 'उत्पाद देखें',
    exploreCategories: 'श्रेणियां देखें',
    viewAllProducts: 'सभी उत्पाद देखें',
    adminDesk: 'स्टाफ एडमिन डेस्क',
    helpline: 'हेल्पलाइन',
    callUs: 'कॉल करें',
    whatsappUs: 'व्हाट्सएप',
    inStock: 'उपलब्ध है',
    lowStock: 'सीमित स्टॉक',
    outOfStock: 'स्टॉक में नहीं',
    addToCart: 'कार्ट में जोड़ें',
    addedToCart: 'कार्ट में जोड़ा गया',
    taxIncluded: 'सभी कर सहित',
    showMore: 'और प्रोडक्ट्स देखें',
    showLess: 'कम देखें',
    whatsappEnquiry: 'व्हाट्सएप पर पूछें',
    viewDetails: 'विवरण देखें',
    heroEyebrow: 'आधिकारिक B2B स्टेशनरी एवं ई-मित्र सामग्री',
    heroTitle: 'पूरे राजस्थान के ई-मित्र केंद्रों के लिए जरूरी सामग्री',
    heroDescription: 'ई-मित्र प्री-प्रिंटेड पेपर, पीवीसी कार्ड, लेमिनेशन पाउच, बायोमेट्रिक मशीनें व आधिकारिक रजिस्टर सीधे थोक दरों पर घर बैठे कैश ऑन डिलीवरी मंगाएं।',
    rajasthanDelivery: 'पूरे राजस्थान में डिलीवरी',
    expectedDelivery: 'लगभग 7 दिनों में सीधी डिलीवरी',
    codAvailable: 'कैश ऑन डिलीवरी (सीओडी)',
    categoryShortcuts: 'श्रेणी अनुसार देखें',
    jumpToCategory: 'तुरंत श्रेणी पर जाएं',
    howToOrderTitle: 'ऑर्डर कैसे करें - आसान 3 चरण',
    howToOrderSubtitle: 'राजस्थान के कियोस्क संचालकों के लिए सरल और पारदर्शी ऑर्डर प्रक्रिया।',
    step1Title: '1. आवश्यक उत्पाद चुनें',
    step1Desc: 'अपनी जरूरत के अनुसार ई-मित्र पेपर, पीवीसी कार्ड, लेमिनेशन पाउच या रजिस्टर कार्ट में जोड़ें।',
    step2Title: '2. डिलीवरी विवरण भरें',
    step2Desc: 'अपनी दुकान का नाम, राजस्थान का पता, जिला एवं पिनकोड दर्ज करें। किसी रजिस्ट्रेशन की जरूरत नहीं।',
    step3Title: '3. कैश ऑन डिलीवरी ऑर्डर दें',
    step3Desc: 'कैश ऑन डिलीवरी ऑर्डर सबमिट करें। हमारी टीम डिस्पैच से पूर्व फोन पर सत्यापन कर पार्सल रवाना करती है।',
    policySectionTitle: 'डिलीवरी एवं रिप्लेसमेंट नीति',
    policySubtitle: 'राजस्थान के सभी ई-मित्र एवं सीएससी संचालकों के लिए स्पष्ट और पारदर्शी नियम।',
    deliveryBadge: 'राजस्थान डिलीवरी',
    deliveryTitle: 'राजस्थान के सभी 50 जिलों में सुरक्षित आपूर्ति',
    deliveryDesc: 'सभी ऑर्डर हमारे मुख्य आपूर्ति केंद्र से भेजे जाते हैं और विश्वसनीय कूरियर द्वारा लगभग 7 कार्य दिवसों में आपके पते पर पहुंचाए जाते हैं।',
    replacementBadge: 'उचित रिप्लेसमेंट',
    replacementTitle: 'क्षतिग्रस्त या गलत सामान पर तुरंत रिप्लेसमेंट',
    replacementDesc: 'यदि डिलीवरी पर कोई सामान टूटा, खराब या गलत प्राप्त होता है, तो 24 घंटे के भीतर व्हाट्सएप (+91 97854 20850) पर पार्सल फोटो/वीडियो भेजें। हम तुरंत नया सामान भेजेंगे। नोट: थोक B2B नीति के तहत पसंद बदलने पर रिटर्न या रिफंड देय नहीं है।',
    faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
    faqSubtitle: 'तिरुपति इंटरनेशनल से स्टेशनरी ऑर्डर करने से जुड़े सभी जरूरी सवाल व जवाब।',
    bulkEnquiryTitle: 'क्या आपको थोक या कार्टन पैकिंग में सामग्री चाहिए?',
    bulkEnquirySubtitle: 'थोक कार्टन रेट और ट्रांसपोर्ट डिस्पैच के लिए सीधे व्हाट्सएप (+91 97854 20850) पर संपर्क करें।',
    bulkEnquiryBtn: 'थोक रेट हेतु व्हाट्सएप करें',
    viewCart: 'कार्ट देखें',
    items: 'आइटम',
    checkout: 'चेकआउट',
    checkoutTitle: 'कैश ऑन डिलीवरी चेकआउट',
    codPaymentMethodTitle: 'कैश ऑन डिलीवरी (COD)',
    codPaymentMethodDesc: 'सामान आपकी दुकान पर पहुंचने पर नकद भुगतान करें।',
    backToTop: 'ऊपर जाएं',
    customerName: 'ग्राहक का पूरा नाम',
    mobileNumber: '10 अंकों का मोबाइल नंबर',
    deliveryAddress: 'पूरा डिलीवरी पता',
    district: 'राजस्थान का जिला',
    pincode: 'पिन कोड',
    shopName: 'कियोस्क / दुकान का नाम (वैकल्पिक)',
    emitraId: 'ई-मित्र आईडी (वैकल्पिक)',
    orderNotes: 'ऑर्डर निर्देश / लैंडमार्क (वैकल्पिक)',
    submitCodOrder: 'कैश ऑन डिलीवरी ऑर्डर दें'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('tirupati_lang');
      return (saved as Language) || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('tirupati_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
