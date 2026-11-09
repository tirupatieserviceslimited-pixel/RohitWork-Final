import React from 'react';
import { categories } from '../../data/categories';
import { useLanguage } from '../../context/LanguageContext';

export const CategoryShortcuts: React.FC = () => {
  const { t, language } = useLanguage();

  const handleScrollToCategory = (slug: string) => {
    const el = document.getElementById(`category-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="category-shortcuts" className="w-full bg-surface-container-lowest border-b border-outline-variant py-6">
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">category</span>
            <h2 className="font-section-heading text-lg sm:text-xl font-bold text-on-surface">
              {t('categoryShortcuts')}
            </h2>
          </div>
          <span className="text-xs text-on-surface-variant font-medium hidden sm:inline-block">
            {language === 'hi' ? 'किसी भी श्रेणी पर क्लिक करें' : 'Click to jump to products'}
          </span>
        </div>

        {/* Shortcuts Container: Horizontal scrollable on mobile, flex-wrap on desktop */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-outline-variant no-scrollbar sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleScrollToCategory(cat.slug)}
              className="group shrink-0 inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-secondary-fixed/30 border border-outline-variant hover:border-primary transition-all duration-150 text-left active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 border border-outline-variant/60 overflow-hidden">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain p-0.5"
                    loading="lazy"
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary text-[18px]">inventory_2</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-xs sm:text-[13px] text-on-surface group-hover:text-primary transition-colors whitespace-nowrap">
                  {cat.name}
                </span>
                {cat.subtitle && (
                  <span className="text-[10px] text-on-surface-variant line-clamp-1 max-w-[120px]">
                    {cat.subtitle}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
