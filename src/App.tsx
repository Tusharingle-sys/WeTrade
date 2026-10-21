import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TradeProvider } from './context/TradeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public & Information Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ForSellersPage } from './pages/ForSellersPage';
import { ForBuyersPage } from './pages/ForBuyersPage';
import { LogisticsPage } from './pages/LogisticsPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PlatformOverviewPage } from './pages/PlatformOverviewPage';
import { DemoPortfolioPage } from './pages/DemoPortfolioPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Authentication & Protected Portal Pages
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PendingApprovalPage } from './pages/PendingApprovalPage';
import { AccessRestrictedPage } from './pages/AccessRestrictedPage';
import { PortalPage } from './pages/PortalPage';

// Scroll to top helper on route transitions
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout wrapper that conditionally hides standard website Navbar & Footer when inside dedicated portal or auth views
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideStandardNav =
    location.pathname.startsWith('/portal') ||
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/pending-approval' ||
    location.pathname === '/access-restricted';

  return (
    <div className="flex flex-col min-h-screen text-slate-800 antialiased font-sans bg-[#F5F7FA]">
      {!hideStandardNav && <Navbar />}
      <div className="flex-1">
        {children}
      </div>
      {!hideStandardNav && <Footer />}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <TradeProvider>
        <HashRouter>
          <ScrollToTop />
          <AppLayout>
            <Routes>
              {/* Public Website Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/for-sellers" element={<ForSellersPage />} />
              <Route path="/for-buyers" element={<ForBuyersPage />} />
              <Route path="/logistics" element={<LogisticsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/platform" element={<PlatformOverviewPage />} />
              <Route path="/demo-portfolio" element={<DemoPortfolioPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Dedicated Auth & Account State Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/pending-approval" element={<PendingApprovalPage />} />
              <Route path="/access-restricted" element={<AccessRestrictedPage />} />

              {/* Protected Trade Portal */}
              <Route
                path="/portal"
                element={
                  <ProtectedRoute>
                    <PortalPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppLayout>
        </HashRouter>
      </TradeProvider>
    </AuthProvider>
  );
}

export default App;
