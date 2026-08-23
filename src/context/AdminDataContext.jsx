import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { FOUNDATION_CONFIG } from '../config/foundationConfig';

const AdminDataContext = createContext();

const STORAGE_KEY = 'manos_abiertas_custom_admin_data';

export const AdminDataProvider = ({ children }) => {
  // Initialize state with stored data or default translations
  const [adminData, setAdminData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          events: parsed.events || translations.es.retreatsModal.events,
          products: parsed.products || translations.es.shop.products,
          missions: parsed.missions || translations.es.programsSection.items,
          reviews: parsed.reviews || translations.es.volunteerSection.testimonials.map((t, idx) => ({
            id: `default-rev-${idx}`,
            author: t.author,
            role: t.role,
            quote: t.quote,
            rating: 5,
            approved: true,
            date: 'Testimonio Permanente'
          })),
          hero: parsed.hero || translations.es.hero,
          nav: parsed.nav || translations.es.nav,
          settings: parsed.settings || {
            officialEmail: FOUNDATION_CONFIG.officialEmail,
            donationsEmail: FOUNDATION_CONFIG.donationsEmail,
            phone: FOUNDATION_CONFIG.phone,
            address: FOUNDATION_CONFIG.address,
            instagramUrl: FOUNDATION_CONFIG.instagramUrl
          }
        };
      }
    } catch (e) {
      console.error("Error loading admin data from storage", e);
    }

    return {
      events: translations.es.retreatsModal.events,
      products: translations.es.shop.products,
      missions: translations.es.programsSection.items,
      reviews: translations.es.volunteerSection.testimonials.map((t, idx) => ({
        id: `default-rev-${idx}`,
        author: t.author,
        role: t.role,
        quote: t.quote,
        rating: 5,
        approved: true,
        date: 'Testimonio Permanente'
      })),
      hero: translations.es.hero,
      nav: translations.es.nav,
      settings: {
        officialEmail: FOUNDATION_CONFIG.officialEmail,
        donationsEmail: FOUNDATION_CONFIG.donationsEmail,
        phone: FOUNDATION_CONFIG.phone,
        address: FOUNDATION_CONFIG.address,
        instagramUrl: FOUNDATION_CONFIG.instagramUrl
      }
    };
  });

  // Save to localStorage whenever adminData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminData));
    } catch (e) {
      console.error("Error saving admin data to storage", e);
    }
  }, [adminData]);

  // =================== HERO & INICIO ===================
  const updateHero = (updatedFields) => {
    setAdminData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...updatedFields }
    }));
  };

  // =================== NAV & MENÚ ===================
  const updateNav = (updatedFields) => {
    setAdminData(prev => ({
      ...prev,
      nav: { ...prev.nav, ...updatedFields }
    }));
  };

  // =================== RETREATS / EVENTS ===================
  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: newEvent.id || `ret-${Date.now()}`
    };
    setAdminData(prev => ({
      ...prev,
      events: [eventWithId, ...prev.events]
    }));
  };

  const updateEvent = (id, updatedFields) => {
    setAdminData(prev => ({
      ...prev,
      events: prev.events.map(ev => ev.id === id ? { ...ev, ...updatedFields } : ev)
    }));
  };

  const deleteEvent = (id) => {
    setAdminData(prev => ({
      ...prev,
      events: prev.events.filter(ev => ev.id !== id)
    }));
  };

  // =================== PRODUCTS ===================
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`
    };
    setAdminData(prev => ({
      ...prev,
      products: [productWithId, ...prev.products]
    }));
  };

  const updateProduct = (id, updatedFields) => {
    setAdminData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    }));
  };

  const deleteProduct = (id) => {
    setAdminData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  // =================== MISSIONS / CAUSES ===================
  const addMission = (newMission) => {
    const missionWithId = {
      ...newMission,
      id: newMission.id || Date.now()
    };
    setAdminData(prev => ({
      ...prev,
      missions: [missionWithId, ...prev.missions]
    }));
  };

  const updateMission = (id, updatedFields) => {
    setAdminData(prev => ({
      ...prev,
      missions: prev.missions.map(m => m.id === id ? { ...m, ...updatedFields } : m)
    }));
  };

  const deleteMission = (id) => {
    setAdminData(prev => ({
      ...prev,
      missions: prev.missions.filter(m => m.id !== id)
    }));
  };

  // =================== REVIEWS / MODERATION ===================
  const addReviewForModeration = (newReview) => {
    setAdminData(prev => ({
      ...prev,
      reviews: [newReview, ...prev.reviews]
    }));
  };

  const approveReview = (id) => {
    setAdminData(prev => ({
      ...prev,
      reviews: prev.reviews.map(r => r.id === id ? { ...r, approved: true } : r)
    }));
  };

  const deleteReview = (id) => {
    setAdminData(prev => ({
      ...prev,
      reviews: prev.reviews.filter(r => r.id !== id)
    }));
  };

  // =================== SETTINGS ===================
  const updateSettings = (newSettings) => {
    setAdminData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  // Reset to default
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAdminData({
      events: translations.es.retreatsModal.events,
      products: translations.es.shop.products,
      missions: translations.es.programsSection.items,
      reviews: translations.es.volunteerSection.testimonials.map((t, idx) => ({
        id: `default-rev-${idx}`,
        author: t.author,
        role: t.role,
        quote: t.quote,
        rating: 5,
        approved: true,
        date: 'Testimonio Permanente'
      })),
      hero: translations.es.hero,
      nav: translations.es.nav,
      settings: {
        officialEmail: FOUNDATION_CONFIG.officialEmail,
        donationsEmail: FOUNDATION_CONFIG.donationsEmail,
        phone: FOUNDATION_CONFIG.phone,
        address: FOUNDATION_CONFIG.address,
        instagramUrl: FOUNDATION_CONFIG.instagramUrl
      }
    });
  };

  return (
    <AdminDataContext.Provider
      value={{
        adminData,
        hero: adminData.hero,
        nav: adminData.nav,
        events: adminData.events,
        products: adminData.products,
        missions: adminData.missions,
        reviews: adminData.reviews,
        approvedReviews: adminData.reviews.filter(r => r.approved),
        pendingReviews: adminData.reviews.filter(r => !r.approved),
        settings: adminData.settings,
        updateHero,
        updateNav,
        addEvent,
        updateEvent,
        deleteEvent,
        addProduct,
        updateProduct,
        deleteProduct,
        addMission,
        updateMission,
        deleteMission,
        addReviewForModeration,
        approveReview,
        deleteReview,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
