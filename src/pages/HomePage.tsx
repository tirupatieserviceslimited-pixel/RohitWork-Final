import React from 'react';
import { CompactHero } from '../components/home/CompactHero';
import { CategoryShortcuts } from '../components/home/CategoryShortcuts';
import { CategoryProductSections } from '../components/home/CategoryProductSections';
import { HowToOrder } from '../components/home/HowToOrder';
import { DeliveryAndPolicy } from '../components/home/DeliveryAndPolicy';
import { FAQSection } from '../components/home/FAQSection';
import { SupportCTA } from '../components/home/SupportCTA';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-surface-container-low min-h-screen">
      {/* 2. Compact Hero (Value proposition, Helpline, Shop Products CTA) */}
      <CompactHero />

      {/* 3. Category Shortcuts */}
      <CategoryShortcuts />

      {/* 4. Category-Wise Product Sections (Complete catalog grouped by category with inline expand) */}
      <CategoryProductSections />

      {/* 5. How to Order (3-step workflow) */}
      <HowToOrder />

      {/* 6. Delivery & Replacement Info (Rajasthan, 7 days, replacement only, zero fake reviews) */}
      <DeliveryAndPolicy />

      {/* 7. Frequently Asked Questions (Accordion) */}
      <FAQSection />

      {/* 8. Contact / Help CTA (Pre-footer) */}
      <SupportCTA />
    </div>
  );
};
