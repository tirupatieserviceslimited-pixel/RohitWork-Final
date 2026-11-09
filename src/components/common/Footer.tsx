import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <>
      {/* ================= DESKTOP FOOTER (lg:block) ================= */}
      <footer className="hidden lg:block w-full bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-[1440px] mx-auto px-margin-desktop pt-space-xl pb-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter-desktop mb-space-xl">
            {/* Brand Column */}
            <div className="lg:col-span-2 pr-space-lg">
              <Link
                to="/"
                title="Tirupati International Services Limited - Home"
                className="inline-block mb-space-sm group"
              >
                <img
                  src="/assets/tirupati-logo.png"
                  alt="Tirupati International Services Limited"
                  className="h-11 w-auto max-w-[240px] object-contain transition-transform group-hover:scale-[1.01]"
                />
              </Link>
              <p className="font-body-compact text-[13px] leading-relaxed text-on-surface-variant mb-space-md">
                Tirupati International Services Limited supplies eMitra stationery, paper products, printing materials, lamination products, PVC cards, and office stationery.
              </p>
              <div className="flex items-center gap-space-sm">
                <a
                  aria-label="Facebook"
                  href="#"
                  className="w-8 h-8 rounded bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                </a>
                <a
                  aria-label="Instagram"
                  href="#"
                  className="w-8 h-8 rounded bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                </a>
                <a
                  aria-label="YouTube"
                  href="#"
                  className="w-8 h-8 rounded bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">smart_display</span>
                </a>
                <a
                  aria-label="LinkedIn"
                  href="#"
                  className="w-8 h-8 rounded bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">hub</span>
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-metadata-label text-[13px] font-bold text-tertiary uppercase tracking-wider mb-space-sm">
                Company
              </h4>
              <ul className="space-y-2 font-body-compact text-[14px] text-on-surface-variant">
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Help */}
            <div>
              <h4 className="font-metadata-label text-[13px] font-bold text-tertiary uppercase tracking-wider mb-space-sm">
                Customer Help
              </h4>
              <ul className="space-y-2 font-body-compact text-[14px] text-on-surface-variant">
                <li>
                  <Link to="/track-order" className="hover:text-primary transition-colors">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-primary transition-colors">
                    Replacement Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Product Lines */}
            <div>
              <h4 className="font-metadata-label text-[13px] font-bold text-tertiary uppercase tracking-wider mb-space-sm">
                Legal
              </h4>
              <ul className="space-y-2 font-body-compact text-[14px] text-on-surface-variant mb-space-md">
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-primary transition-colors">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>

              <h4 className="font-metadata-label text-[13px] font-bold text-tertiary uppercase tracking-wider mb-space-xs">
                Product Lines
              </h4>
              <ul className="space-y-1 font-body-compact text-[13px] text-on-surface-variant">
                <li>
                  <Link to="/category/emitra-paper" className="hover:text-primary transition-colors">
                    eMitra Paper
                  </Link>
                </li>
                <li>
                  <Link to="/category/a4-office-paper" className="hover:text-primary transition-colors">
                    Office Paper
                  </Link>
                </li>
                <li>
                  <Link to="/category/pvc-cards" className="hover:text-primary transition-colors">
                    PVC Cards
                  </Link>
                </li>
                <li>
                  <Link to="/category/lamination-pouches" className="hover:text-primary transition-colors">
                    Lamination
                  </Link>
                </li>
                <li>
                  <Link to="/category/printer-ink-toner" className="hover:text-primary transition-colors">
                    Ink and Toner
                  </Link>
                </li>
                <li>
                  <Link to="/category/files-office-stationery" className="hover:text-primary transition-colors">
                    Office Stationery
                  </Link>
                </li>
              </ul>
            </div>

            {/* Business Info */}
            <div>
              <h4 className="font-metadata-label text-[13px] font-bold text-tertiary uppercase tracking-wider mb-space-sm">
                Business Info
              </h4>
              <div className="space-y-2.5 font-body-compact text-[13px] text-on-surface-variant">
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">location_on</span>
                  <span>Jaipur, Rajasthan - 302001</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">mail</span>
                  <a href="mailto:tirupatieserviceslimited@gmail.com" className="hover:text-primary transition-colors">
                    tirupatieserviceslimited@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-primary shrink-0">call</span>
                  <a href="https://wa.me/919785420850" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    +91 97854 20850
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-md border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-space-sm text-center md:text-left">
            <p className="font-caption-micro text-[13px] text-on-surface-variant">
              © {new Date().getFullYear()} Tirupati International Services Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[12px] text-on-surface-variant">
              <span>Rajasthan eMitra Stationery & Kiosk Portal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= MOBILE ACCORDION FOOTER (lg:hidden) ================= */}
      <footer className="lg:hidden px-4 pt-4 pb-20 mt-2">
        <div className="rounded-xl bg-surface-container-lowest p-4 shadow-sm space-y-4 border border-outline-variant">
          {/* Corporate Header */}
          <div className="border-b border-surface-container-high pb-3">
            <Link
              to="/"
              title="Tirupati International Services Limited - Home"
              className="inline-block mb-2"
            >
              <img
                src="/assets/tirupati-logo.png"
                alt="Tirupati International Services Limited"
                className="h-9 w-auto max-w-[200px] object-contain"
              />
            </Link>
            <p className="font-caption-micro text-[12px] text-on-surface-variant leading-relaxed mt-1">
              Tirupati International Services Limited supplies eMitra stationery, paper products, printing materials, lamination products, PVC cards, and office stationery.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-1.5" id="footer-accordions">
            {/* Section 1: Company */}
            <details className="group py-1 border-b border-outline-variant/40 pb-2">
              <summary className="flex justify-between items-center cursor-pointer list-none text-on-surface font-body-compact text-[14px] font-semibold">
                <span>Company</span>
                <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="flex flex-col gap-2 pt-2.5 pl-2 font-caption-micro text-[13px] text-on-surface-variant">
                <Link to="/about" className="hover:text-primary">About Us</Link>
                <Link to="/contact" className="hover:text-primary">Contact Us</Link>
              </div>
            </details>

            {/* Section 2: Customer Help */}
            <details className="group py-1 border-b border-outline-variant/40 pb-2">
              <summary className="flex justify-between items-center cursor-pointer list-none text-on-surface font-body-compact text-[14px] font-semibold">
                <span>Customer Help</span>
                <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="flex flex-col gap-2 pt-2.5 pl-2 font-caption-micro text-[13px] text-on-surface-variant">
                <Link to="/track-order" className="hover:text-primary">Track Order</Link>
                <Link to="/contact" className="hover:text-primary">FAQ</Link>
                <Link to="/about" className="hover:text-primary">Shipping Policy</Link>
                <Link to="/contact" className="hover:text-primary">Replacement Policy</Link>
              </div>
            </details>

            {/* Section 3: Legal */}
            <details className="group py-1 border-b border-outline-variant/40 pb-2">
              <summary className="flex justify-between items-center cursor-pointer list-none text-on-surface font-body-compact text-[14px] font-semibold">
                <span>Legal</span>
                <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="flex flex-col gap-2 pt-2.5 pl-2 font-caption-micro text-[13px] text-on-surface-variant">
                <Link to="/about" className="hover:text-primary">Privacy Policy</Link>
                <Link to="/about" className="hover:text-primary">Terms & Conditions</Link>
              </div>
            </details>

            {/* Section 4: Product Categories */}
            <details className="group py-1 border-b border-outline-variant/40 pb-2">
              <summary className="flex justify-between items-center cursor-pointer list-none text-on-surface font-body-compact text-[14px] font-semibold">
                <span>Product Categories</span>
                <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="flex flex-col gap-2 pt-2.5 pl-2 font-caption-micro text-[13px] text-on-surface-variant">
                <Link to="/category/emitra-paper" className="hover:text-primary">eMitra Paper</Link>
                <Link to="/category/a4-office-paper" className="hover:text-primary">Office Paper</Link>
                <Link to="/category/pvc-cards" className="hover:text-primary">PVC Cards</Link>
                <Link to="/category/lamination-pouches" className="hover:text-primary">Lamination</Link>
                <Link to="/category/printer-ink-toner" className="hover:text-primary">Ink & Toner</Link>
                <Link to="/category/files-office-stationery" className="hover:text-primary">Office Stationery</Link>
              </div>
            </details>

            {/* Section 5: Business Information */}
            <details className="group py-1">
              <summary className="flex justify-between items-center cursor-pointer list-none text-on-surface font-body-compact text-[14px] font-semibold">
                <span>Business Information</span>
                <span className="material-symbols-outlined text-[18px] text-outline transition-transform duration-200 group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="flex flex-col gap-2 pt-2.5 pl-2 font-caption-micro text-[13px] text-on-surface-variant">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  <span>Jaipur, Rajasthan - 302001</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">mail</span>
                  <a href="mailto:tirupatieserviceslimited@gmail.com" className="hover:text-primary transition-colors">
                    tirupatieserviceslimited@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">call</span>
                  <a href="https://wa.me/919785420850" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    +91 97854 20850
                  </a>
                </div>
              </div>
            </details>
          </div>

          {/* Copyright Note */}
          <div className="border-t border-surface-container-high pt-3 flex flex-col gap-1 text-center">
            <p className="font-caption-micro text-[11px] text-on-surface-variant">
              © {new Date().getFullYear()} Tirupati International Services Limited.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

