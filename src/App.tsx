import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { LanguageProvider } from './context/LanguageContext';
import { ToastContainer } from './components/common/ToastContainer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Header } from './components/common/Header';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { MobileViewCartBar } from './components/common/MobileViewCartBar';
import { BackToTop } from './components/common/BackToTop';

// Lazy-loaded route-level pages for optimal performance & code splitting
const HomePage = React.lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const CartPage = React.lazy(() => import('./pages/CartPage').then((m) => ({ default: m.CartPage })));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage })));
const OrderSuccessPage = React.lazy(() => import('./pages/OrderSuccessPage').then((m) => ({ default: m.OrderSuccessPage })));
const OrdersPage = React.lazy(() => import('./pages/OrdersPage').then((m) => ({ default: m.OrdersPage })));
const WishlistPage = React.lazy(() => import('./pages/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const TrackOrderPage = React.lazy(() => import('./pages/TrackOrderPage').then((m) => ({ default: m.TrackOrderPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const PageLoadingFallback: React.FC = () => (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 gap-3" aria-label="Loading page">
    <div className="w-9 h-9 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
    <span className="text-xs font-medium text-on-surface-variant font-metadata-label">Loading Tirupati Services...</span>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <WishlistProvider>
          <CartProvider>
            <ScrollToTop />
            <ToastContainer />
            <div className="flex flex-col min-h-screen bg-surface-container-low text-on-surface antialiased font-sans overflow-x-hidden">
              <Header />
              <main className="flex-1 pt-[112px] lg:pt-[154px] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
                <Suspense fallback={<PageLoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderSuccessPage />} />
                    <Route path="/order-success" element={<OrderSuccessPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/track-order" element={<TrackOrderPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <MobileViewCartBar />
              <MobileBottomNav />
              <FloatingWhatsApp />
              <BackToTop />
            </div>
          </CartProvider>
        </WishlistProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
