import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsGoalsBanner } from './components/StatsGoalsBanner';
import { MissionHeart } from './components/MissionHeart';
import { AboutFounder } from './components/AboutFounder';
import { Programs } from './components/Programs';
import { RetreatsSection } from './components/RetreatsSection';
import { ShopSection } from './components/ShopSection';
import { VolunteerSection } from './components/VolunteerSection';
import { Footer } from './components/Footer';
import { DonationModal } from './components/DonationModal';
import { VolunteerModal } from './components/VolunteerModal';
import { WelcomeShopModal } from './components/WelcomeShopModal';
import { CartModal } from './components/CartModal';
import { HumanitarianModal } from './components/HumanitarianModal';
import { RetreatsCalendarModal } from './components/RetreatsCalendarModal';
import { NewMissionModal } from './components/NewMissionModal';
import { MissionDetailModal } from './components/MissionDetailModal';
import { CompletedMissionsModal } from './components/CompletedMissionsModal';
import { ReviewModal } from './components/ReviewModal';
import { ChatAssistantModal } from './components/ChatAssistantModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Heart, ShoppingBag, PlusCircle, MessageSquare, X, Lock } from 'lucide-react';
import { recordPublicVisit } from './utils/analyticsTracker';

const MainLayout = () => {
  const { language, t } = useLanguage();
  const { events, products, missions, approvedReviews, addReviewForModeration, sectionVisibility, sectionOrder } = useAdminData();

  // Admin View state (Triggered by /admin, #admin, or footer link)
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname.includes('/admin') || window.location.hash.includes('admin');
  });

  useEffect(() => {
    if (!isAdminView) {
      recordPublicVisit();
    }
  }, [isAdminView]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('admin') || window.location.pathname.includes('/admin')) {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHumanitarianOpen, setIsHumanitarianOpen] = useState(false);
  const [isRetreatsOpen, setIsRetreatsOpen] = useState(false);
  const [isNewMissionOpen, setIsNewMissionOpen] = useState(false);
  const [isCompletedMissionsOpen, setIsCompletedMissionsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [selectedMissionDetail, setSelectedMissionDetail] = useState(null);
  const [selectedCause, setSelectedCause] = useState('all');

  const handleReviewSubmitted = (newReview) => {
    addReviewForModeration(newReview);
  };

  // Featured Retreat for Frontpage Bubbles
  const [featuredRetreatId, setFeaturedRetreatId] = useState('ret-1');

  const handleToggleFeaturedRetreat = (id) => {
    setFeaturedRetreatId((prev) => (prev === id ? null : id));
  };

  const featuredRetreat = events.find((e) => e.id === featuredRetreatId) || events[0];

  // Shopping Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('manos_amigas_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('manos_amigas_cart', JSON.stringify(cart));
  }, [cart]);

  const [volunteerModalState, setVolunteerModalState] = useState({
    isOpen: false,
    mode: 'volunteer'
  });

  const handleOpenDonate = (cause = 'all') => {
    setSelectedCause(cause);
    setIsDonateOpen(true);
  };

  const handleOpenVolunteer = (mode = 'volunteer') => {
    setVolunteerModalState({
      isOpen: true,
      mode
    });
  };

  const handleScrollToShop = () => {
    const shopEl = document.getElementById('shop');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // If user navigated to /admin or clicked Admin Access, render the Admin Panel
  if (isAdminView) {
    return (
      <AdminDashboard
        onExitAdmin={() => {
          setIsAdminView(false);
          window.location.hash = '#home';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] selection:bg-brand-teal selection:text-white">
      {/* Top Contact & Language Bar */}
      <TopBar />

      {/* Main Responsive Sticky Navbar */}
      <Navbar
        onOpenDonate={() => handleOpenDonate('all')}
        onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
        onOpenCart={() => setIsCartOpen(true)}
        cartItemCount={totalCartCount}
      />

      {/* Hero Section with Clickable Cards */}
      <main className="flex-grow">
        {(!sectionVisibility || sectionVisibility.hero !== false) && (
          <Hero
            onOpenDonate={() => handleOpenDonate('all')}
            onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
            onOpenHumanitarian={() => setIsHumanitarianOpen(true)}
            onOpenRetreats={() => setIsRetreatsOpen(true)}
          />
        )}

        {/* 3 Impact Banners */}
        {(!sectionVisibility || sectionVisibility.stats !== false) && (
          <StatsGoalsBanner
            onOpenDonate={() => handleOpenDonate('all')}
            onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
          />
        )}

        {/* Mission, Heart Collage & 6 Quick Actions */}
        {(!sectionVisibility || sectionVisibility.mission !== false) && (
          <MissionHeart
            onOpenDonate={() => handleOpenDonate('all')}
            onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
            onOpenGetHelp={() => handleOpenVolunteer('help')}
            onOpenShop={handleScrollToShop}
            onOpenContact={() => handleOpenVolunteer('volunteer')}
            onOpenNewMission={() => setIsNewMissionOpen(true)}
            onOpenHumanitarian={() => setIsHumanitarianOpen(true)}
            onOpenRetreats={() => setIsRetreatsOpen(true)}
            featuredRetreat={featuredRetreat}
          />
        )}

        {/* Missions Section */}
        {(!sectionVisibility || sectionVisibility.programs !== false) && (
          <Programs
            onSelectCauseAndDonate={(cause) => handleOpenDonate(cause)}
            onOpenNewMission={() => setIsNewMissionOpen(true)}
            onOpenMissionDetail={(mission) => setSelectedMissionDetail(mission)}
            onOpenCompletedMissions={() => setIsCompletedMissionsOpen(true)}
          />
        )}

        {/* La Casa de la Ayuda / Centro Carismático Católico & Grupo Isha Bethel */}
        {(!sectionVisibility || sectionVisibility.about !== false) && (
          <AboutFounder
            onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
          />
        )}

        {/* Dedicated Retreats & Activities Calendar Section */}
        {(!sectionVisibility || sectionVisibility.retreats !== false) && (
          <RetreatsSection
            onOpenRetreatsModal={(eventId) => setIsRetreatsOpen(true)}
            featuredRetreatId={featuredRetreatId}
            onToggleFeaturedRetreat={handleToggleFeaturedRetreat}
          />
        )}

        {/* Tienda Solidaria 100% Católica y Cristiana */}
        {(!sectionVisibility || sectionVisibility.shop !== false) && (
          <ShopSection
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* Volunteer, Reviews & Testimonials Section */}
        {(!sectionVisibility || sectionVisibility.volunteer !== false) && (
          <VolunteerSection
            onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
            onOpenReviewModal={() => setIsReviewOpen(true)}
            customReviews={approvedReviews}
          />
        )}
      </main>

      {/* Footer */}
      {(!sectionVisibility || sectionVisibility.footer !== false) && (
        <Footer
          onOpenDonate={() => handleOpenDonate('all')}
          onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
          onOpenAdmin={() => setIsAdminView(true)}
        />
      )}

      {/* Floating Action Menu with Cross (Speed Dial) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Shopping Cart Pill (if active) */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider px-4 py-2.5 rounded-full shadow-2xl hover:scale-105 transition-all border border-slate-700 mb-1"
          >
            <ShoppingBag className="w-4 h-4 text-brand-gold" />
            <span>Carrito ({totalCartCount})</span>
          </button>
        )}

        {/* Expanded Speed Dial Menu */}
        {isFabOpen && (
          <div className="flex flex-col gap-2.5 items-end animate-fadeIn">
            {/* Opción 1: Pregúntanos / Asistente Fraterno */}
            <button
              onClick={() => {
                setIsFabOpen(false);
                setIsChatOpen(true);
              }}
              className="flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-brand-gold hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all border-2 border-white/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'es' ? 'Pregúntanos • Asistente' : 'Ask Us • Assistant'}</span>
            </button>

            {/* Opción 2: Agregar tu Causa */}
            <button
              onClick={() => {
                setIsFabOpen(false);
                setIsNewMissionOpen(true);
              }}
              className="flex items-center gap-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-black text-xs uppercase tracking-wider px-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-all border-2 border-white/40"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{language === 'es' ? 'Agregar tu Causa' : 'Add Your Cause'}</span>
            </button>

            {/* Opción 3: Donar Ahora */}
            <button
              onClick={() => {
                setIsFabOpen(false);
                handleOpenDonate('all');
              }}
              className="flex items-center gap-2.5 bg-brand-coral hover:bg-brand-coral-dark text-white font-black text-xs uppercase tracking-widest px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all border-2 border-white/40"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{language === 'es' ? 'Donar Ahora' : 'Donate Now'}</span>
            </button>
          </div>
        )}

        {/* Main Floating Trigger Button with Catholic Cross */}
        <button
          onClick={() => setIsFabOpen(!isFabOpen)}
          className={`relative group flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 border-2 border-white/60 ${
            isFabOpen
              ? 'w-14 h-14 bg-slate-900 text-white rotate-90 scale-105'
              : 'w-16 h-16 bg-gradient-to-tr from-brand-coral via-[#9E2A2B] to-brand-teal text-white hover:scale-110'
          }`}
          title="Estamos para Ayudarte • Haz clic para ver opciones"
        >
          {!isFabOpen && (
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal rounded-full blur-md opacity-60 animate-pulse pointer-events-none" />
          )}

          {isFabOpen ? (
            <X className="w-6 h-6 relative z-10" />
          ) : (
            <div className="relative z-10 flex flex-col items-center justify-center">
              <svg className="w-8 h-8 fill-current drop-shadow-md" viewBox="0 0 24 24">
                <path d="M10 2h4v6h6v4h-6v10h-4V12H4V8h6V2z" />
              </svg>
            </div>
          )}
        </button>
      </div>

      {/* Welcome Announcement Modal for Solidarity Shop on first page open */}
      <WelcomeShopModal onOpenShop={handleScrollToShop} />

      {/* Leave a Review & Testimonial Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />

      {/* Completed Missions Modal (Historial de Transparencia) */}
      <CompletedMissionsModal
        isOpen={isCompletedMissionsOpen}
        onClose={() => setIsCompletedMissionsOpen(false)}
        onOpenDonate={handleOpenDonate}
      />

      {/* Fraternal Online Assistant Chat Modal */}
      <ChatAssistantModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenDonate={handleOpenDonate}
        onOpenNewMission={() => setIsNewMissionOpen(true)}
        onOpenVolunteer={() => handleOpenVolunteer('volunteer')}
      />

      {/* Humanitarian Aid Active Missions & Causes Modal */}
      <HumanitarianModal
        isOpen={isHumanitarianOpen}
        onClose={() => setIsHumanitarianOpen(false)}
        onOpenDonate={handleOpenDonate}
        onOpenVolunteer={handleOpenVolunteer}
        onOpenMissionDetail={(mission) => setSelectedMissionDetail(mission)}
      />

      {/* Retreats & Spiritual Activities Calendar Modal */}
      <RetreatsCalendarModal
        isOpen={isRetreatsOpen}
        onClose={() => setIsRetreatsOpen(false)}
      />

      {/* Propose New Mission / Cause Modal */}
      <NewMissionModal
        isOpen={isNewMissionOpen}
        onClose={() => setIsNewMissionOpen(false)}
      />

      {/* Dedicated Mission Detail Modal */}
      <MissionDetailModal
        isOpen={!!selectedMissionDetail}
        mission={selectedMissionDetail}
        onClose={() => setSelectedMissionDetail(null)}
        onDonate={handleOpenDonate}
        onVolunteer={() => handleOpenVolunteer('volunteer')}
      />

      {/* Shopping Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive Donation Modal */}
      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        preselectedCause={selectedCause}
      />

      {/* Volunteer / Join the Cause / Get Help Modal */}
      <VolunteerModal
        isOpen={volunteerModalState.isOpen}
        onClose={() => setVolunteerModalState({ isOpen: false, mode: 'volunteer' })}
        initialMode={volunteerModalState.mode}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AdminDataProvider>
        <MainLayout />
      </AdminDataProvider>
    </LanguageProvider>
  );
}
