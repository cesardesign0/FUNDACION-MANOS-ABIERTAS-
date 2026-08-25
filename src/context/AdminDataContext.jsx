import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { FOUNDATION_CONFIG } from '../config/foundationConfig';

const AdminDataContext = createContext();

const STORAGE_KEY = 'manos_abiertas_custom_admin_data_v4';

// Default button list for Hero
export const DEFAULT_HERO_BUTTONS = [
  {
    id: 'btn-donate',
    label: 'Hacer una Donación',
    action: 'donate',
    variant: 'coral',
    shape: 'pill',
    icon: 'heart',
    visible: true
  },
  {
    id: 'btn-volunteer',
    label: 'Únete como Voluntario',
    action: 'volunteer',
    variant: 'glass',
    shape: 'pill',
    icon: 'users',
    visible: true
  },
  {
    id: 'btn-causes',
    label: 'Ver Nuestras Misiones',
    action: 'programs',
    variant: 'gold',
    shape: 'pill',
    icon: 'arrow',
    visible: true
  }
];

// Default Section Ordering
export const DEFAULT_SECTION_ORDER = [
  { id: 'hero', name: '1. Portada / Inicio', icon: 'Home' },
  { id: 'stats', name: '2. Barra de Metas y Logros', icon: 'TrendingUp' },
  { id: 'mission', name: '3. Nuestra Misión y Corazón', icon: 'Heart' },
  { id: 'about', name: '4. La Casa de Ayuda (Centro Bronx)', icon: 'Church' },
  { id: 'programs', name: '5. Misiones y Causas Activas', icon: 'Target' },
  { id: 'retreats', name: '6. Calendario de Retiros y Actividades', icon: 'Calendar' },
  { id: 'shop', name: '7. Tienda Solidaria Católica', icon: 'ShoppingBag' },
  { id: 'volunteer', name: '8. Voluntariado y Testimonios', icon: 'Users' },
  { id: 'footer', name: '9. Pie de Página (Footer)', icon: 'FileText' }
];

export const DEFAULT_SECTION_VISIBILITY = {
  hero: true,
  stats: true,
  mission: true,
  about: true,
  programs: true,
  retreats: true,
  shop: true,
  volunteer: true,
  footer: true
};

export const AdminDataProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          sectionOrder: parsed.sectionOrder || DEFAULT_SECTION_ORDER,
          sectionVisibility: { ...DEFAULT_SECTION_VISIBILITY, ...(parsed.sectionVisibility || {}) },
          featuredMissionId: parsed.featuredMissionId !== undefined ? parsed.featuredMissionId : 1,
          featuredRetreatId: parsed.featuredRetreatId || 'ret-1',
          featuredProductIds: parsed.featuredProductIds || ['prod-1', 'prod-2', 'prod-4'],
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
          hero: {
            ...translations.es.hero,
            buttons: DEFAULT_HERO_BUTTONS,
            styles: {
              handwritten_font: 'font-handwritten',
              handwritten_size: 'text-5xl',
              handwritten_color: '#E5A93C',
              handwritten_weight: 'font-bold',
              handwritten_case: 'normal-case',
              title_font: 'font-serif',
              title_size: 'text-3xl',
              title_color: '#FFFFFF',
              title_weight: 'font-medium',
              title_italic: true,
              title_case: 'normal-case',
              tag_color: '#2BBEC9',
              tag_case: 'uppercase',
              desc_size: 'text-base',
              desc_color: '#CBD5E1'
            },
            ...(parsed.hero || {})
          },
          nav: parsed.nav || translations.es.nav,
          about: {
            ...translations.es.about,
            styles: {
              title_font: 'font-display',
              title_size: 'text-3xl',
              title_color: '#0F172A',
              title_weight: 'font-black',
              title_case: 'uppercase',
              subtitle_color: '#E05A47',
              subtitle_size: 'text-lg',
              subtitle_weight: 'font-extrabold',
              quote_font: 'font-serif',
              quote_color: '#E5A93C',
              quote_italic: true
            },
            ...(parsed.about || {})
          },
          programsSection: {
            ...translations.es.programsSection,
            styles: {
              title_font: 'font-display',
              title_size: 'text-4xl',
              title_color: '#FFFFFF',
              title_weight: 'font-black',
              badge_color: '#2BBEC9'
            },
            ...(parsed.programsSection || {})
          },
          volunteerSection: {
            ...translations.es.volunteerSection,
            styles: {
              title_font: 'font-display',
              title_size: 'text-4xl',
              title_color: '#FFFFFF',
              title_weight: 'font-black'
            },
            ...(parsed.volunteerSection || {})
          },
          retreatsModal: {
            ...translations.es.retreatsModal,
            styles: {
              title_font: 'font-display',
              title_size: 'text-4xl',
              title_color: '#FFFFFF',
              title_weight: 'font-black'
            },
            ...(parsed.retreatsModal || {})
          },
          shopHeader: {
            badge: "TIENDA SOLIDARIA CATÓLICA",
            title: "Artículos de Fe, Devoción y Formación Cristiana",
            subtitle: "El 100% de cada compra se destina directamente a financiar las obras de ayuda humanitaria y retiros espirituales.",
            supportCallout: "El 100% de los fondos financia alimentos para familias y retiros de sanación",
            styles: {
              title_font: 'font-display',
              title_size: 'text-4xl',
              title_color: '#0F172A',
              title_weight: 'font-black',
              badge_color: '#B45309'
            },
            ...(parsed.shopHeader || {})
          },
          missionHeart: {
            badge: "NUESTRA RAZÓN DE SER",
            title: "Amor, Fe y Ayuda en Acción",
            paragraph1: "Nuestra labor humanitaria nace, se sustenta y se nutre en el Centro Carismático Católico de la Ciudad de Nueva York y el Bronx...",
            paragraph2: "Cada plato de comida caliente, cada abrigo entregado y cada retiro representa la misericordia y la gracia viva de Dios.",
            btnMore: "Conocer la Casa de Ayuda",
            donateLinkText: "¿Deseas hacer un aporte económico directo? Haz clic aquí",
            centerLogoImage: "/logo-manos-abiertas.png",
            bubble1Image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
            bubbleIshaImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
            bubbleRetreatsImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80",
            styles: {
              title_font: 'font-display',
              title_size: 'text-4xl',
              title_color: '#0F172A',
              title_weight: 'font-black',
              badge_color: '#E05A47'
            },
            ...(parsed.missionHeart || {})
          },
          footer: parsed.footer || translations.es.footer,
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
      sectionOrder: DEFAULT_SECTION_ORDER,
      sectionVisibility: DEFAULT_SECTION_VISIBILITY,
      featuredMissionId: 1,
      featuredRetreatId: 'ret-1',
      featuredProductIds: ['prod-1', 'prod-2', 'prod-4'],
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
      hero: {
        ...translations.es.hero,
        buttons: DEFAULT_HERO_BUTTONS,
        styles: {
          handwritten_font: 'font-handwritten',
          handwritten_size: 'text-5xl',
          handwritten_color: '#E5A93C',
          handwritten_weight: 'font-bold',
          handwritten_case: 'normal-case',
          title_font: 'font-serif',
          title_size: 'text-3xl',
          title_color: '#FFFFFF',
          title_weight: 'font-medium',
          title_italic: true,
          title_case: 'normal-case',
          tag_color: '#2BBEC9',
          tag_case: 'uppercase',
          desc_size: 'text-base',
          desc_color: '#CBD5E1'
        }
      },
      nav: translations.es.nav,
      about: {
        ...translations.es.about,
        styles: {
          title_font: 'font-display',
          title_size: 'text-3xl',
          title_color: '#0F172A',
          title_weight: 'font-black',
          title_case: 'uppercase',
          subtitle_color: '#E05A47',
          subtitle_size: 'text-lg',
          subtitle_weight: 'font-extrabold',
          quote_font: 'font-serif',
          quote_color: '#E5A93C',
          quote_italic: true
        }
      },
      programsSection: {
        ...translations.es.programsSection,
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#FFFFFF',
          title_weight: 'font-black',
          badge_color: '#2BBEC9'
        }
      },
      volunteerSection: {
        ...translations.es.volunteerSection,
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#FFFFFF',
          title_weight: 'font-black'
        }
      },
      retreatsModal: {
        ...translations.es.retreatsModal,
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#FFFFFF',
          title_weight: 'font-black'
        }
      },
      shopHeader: {
        badge: "TIENDA SOLIDARIA CATÓLICA",
        title: "Artículos de Fe, Devoción y Formación Cristiana",
        subtitle: "El 100% de cada compra se destina directamente a financiar las obras de ayuda humanitaria y retiros espirituales.",
        supportCallout: "El 100% de los fondos financia alimentos para familias y retiros de sanación",
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#0F172A',
          title_weight: 'font-black',
          badge_color: '#B45309'
        }
      },
      missionHeart: {
        badge: "NUESTRA RAZÓN DE SER",
        title: "Amor, Fe y Ayuda en Acción",
        paragraph1: "Nuestra labor humanitaria nace, se sustenta y se nutre en el Centro Carismático Católico de la Ciudad de Nueva York y el Bronx...",
        paragraph2: "Cada plato de comida caliente, cada abrigo entregado y cada retiro representa la misericordia y la gracia viva de Dios.",
        btnMore: "Conocer la Casa de Ayuda",
        donateLinkText: "¿Deseas hacer un aporte económico directo? Haz clic aquí",
        centerLogoImage: "/logo-manos-abiertas.png",
        bubble1Image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
        bubbleIshaImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
        bubbleRetreatsImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80",
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#0F172A',
          title_weight: 'font-black',
          badge_color: '#E05A47'
        }
      },
      footer: translations.es.footer,
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

  // =================== SECTION REORDERING & VISIBILITY ===================
  const updateSectionOrder = (newOrder) => {
    setAdminData(prev => ({
      ...prev,
      sectionOrder: newOrder
    }));
  };

  const moveSection = (sectionId, direction) => {
    const currentOrder = adminData.sectionOrder || DEFAULT_SECTION_ORDER;
    const index = currentOrder.findIndex(s => s.id === sectionId);
    if (index === -1) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= currentOrder.length) return;
    const updated = [...currentOrder];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    updateSectionOrder(updated);
  };

  const toggleSectionVisibility = (sectionId) => {
    setAdminData(prev => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionId]: prev.sectionVisibility?.[sectionId] === false ? true : false
      }
    }));
  };

  // =================== FEATURED / DESTACADOS ===================
  const setFeaturedMission = (missionId) => {
    setAdminData(prev => ({
      ...prev,
      featuredMissionId: prev.featuredMissionId === missionId ? null : missionId
    }));
  };

  const setFeaturedRetreat = (retreatId) => {
    setAdminData(prev => ({
      ...prev,
      featuredRetreatId: prev.featuredRetreatId === retreatId ? null : retreatId
    }));
  };

  const toggleFeaturedProduct = (productId) => {
    setAdminData(prev => {
      const current = prev.featuredProductIds || [];
      const exists = current.includes(productId);
      const updated = exists 
        ? current.filter(id => id !== productId)
        : [...current, productId];
      return {
        ...prev,
        featuredProductIds: updated
      };
    });
  };

  // =================== GENERAL SECTION UPDATER ===================
  const updateSection = (sectionKey, updatedFields) => {
    setAdminData(prev => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], ...updatedFields }
    }));
  };

  const updateHero = (fields) => updateSection('hero', fields);
  const updateNav = (fields) => updateSection('nav', fields);
  const updateAbout = (fields) => updateSection('about', fields);
  const updateProgramsHeader = (fields) => updateSection('programsSection', fields);
  const updateVolunteerHeader = (fields) => updateSection('volunteerSection', fields);
  const updateRetreatsHeader = (fields) => updateSection('retreatsModal', fields);
  const updateShopHeader = (fields) => updateSection('shopHeader', fields);
  const updateMissionHeart = (fields) => updateSection('missionHeart', fields);
  const updateFooter = (fields) => updateSection('footer', fields);

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
      sectionOrder: DEFAULT_SECTION_ORDER,
      sectionVisibility: DEFAULT_SECTION_VISIBILITY,
      featuredMissionId: 1,
      featuredRetreatId: 'ret-1',
      featuredProductIds: ['prod-1', 'prod-2', 'prod-4'],
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
      hero: {
        ...translations.es.hero,
        buttons: DEFAULT_HERO_BUTTONS,
        styles: {
          handwritten_font: 'font-handwritten',
          handwritten_size: 'text-5xl',
          handwritten_color: '#E5A93C',
          handwritten_weight: 'font-bold',
          handwritten_case: 'normal-case',
          title_font: 'font-serif',
          title_size: 'text-3xl',
          title_color: '#FFFFFF',
          title_weight: 'font-medium',
          title_italic: true,
          title_case: 'normal-case',
          tag_color: '#2BBEC9',
          tag_case: 'uppercase',
          desc_size: 'text-base',
          desc_color: '#CBD5E1'
        }
      },
      nav: translations.es.nav,
      about: {
        ...translations.es.about,
        styles: {
          title_font: 'font-display',
          title_size: 'text-3xl',
          title_color: '#0F172A',
          title_weight: 'font-black',
          title_case: 'uppercase',
          subtitle_color: '#E05A47',
          subtitle_size: 'text-lg',
          subtitle_weight: 'font-extrabold',
          quote_font: 'font-serif',
          quote_color: '#E5A93C',
          quote_italic: true
        }
      },
      programsSection: {
        ...translations.es.programsSection,
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#FFFFFF',
          title_weight: 'font-black',
          badge_color: '#2BBEC9'
        }
      },
      volunteerSection: {
        ...translations.es.volunteerSection,
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#FFFFFF',
          title_weight: 'font-black'
        }
      },
      retreatsModal: {
        ...translations.es.retreatsModal,
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#FFFFFF',
          title_weight: 'font-black'
        }
      },
      shopHeader: {
        badge: "TIENDA SOLIDARIA CATÓLICA",
        title: "Artículos de Fe, Devoción y Formación Cristiana",
        subtitle: "El 100% de cada compra se destina directamente a financiar las obras de ayuda humanitaria y retiros espirituales.",
        supportCallout: "El 100% de los fondos financia alimentos para familias y retiros de sanación",
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#0F172A',
          title_weight: 'font-black',
          badge_color: '#B45309'
        }
      },
      missionHeart: {
        badge: "NUESTRA RAZÓN DE SER",
        title: "Amor, Fe y Ayuda en Acción",
        paragraph1: "Nuestra labor humanitaria nace, se sustenta y se nutre en el Centro Carismático Católico de la Ciudad de Nueva York y el Bronx...",
        paragraph2: "Cada plato de comida caliente, cada abrigo entregado y cada retiro representa la misericordia y la gracia viva de Dios.",
        btnMore: "Conocer la Casa de Ayuda",
        donateLinkText: "¿Deseas hacer un aporte económico directo? Haz clic aquí",
        centerLogoImage: "/logo-manos-abiertas.png",
        bubble1Image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80",
        bubbleIshaImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
        bubbleRetreatsImage: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80",
        styles: {
          title_font: 'font-display',
          title_size: 'text-4xl',
          title_color: '#0F172A',
          title_weight: 'font-black',
          badge_color: '#E05A47'
        }
      },
      footer: translations.es.footer,
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
        sectionOrder: adminData.sectionOrder || DEFAULT_SECTION_ORDER,
        sectionVisibility: adminData.sectionVisibility || DEFAULT_SECTION_VISIBILITY,
        featuredMissionId: adminData.featuredMissionId,
        featuredRetreatId: adminData.featuredRetreatId,
        featuredProductIds: adminData.featuredProductIds || [],
        hero: adminData.hero,
        nav: adminData.nav,
        about: adminData.about,
        programsSection: adminData.programsSection,
        volunteerSection: adminData.volunteerSection,
        retreatsModal: adminData.retreatsModal,
        shopHeader: adminData.shopHeader,
        missionHeart: adminData.missionHeart,
        footer: adminData.footer,
        events: adminData.events,
        products: adminData.products,
        missions: adminData.missions,
        reviews: adminData.reviews,
        approvedReviews: adminData.reviews.filter(r => r.approved),
        pendingReviews: adminData.reviews.filter(r => !r.approved),
        settings: adminData.settings,
        updateSectionOrder,
        moveSection,
        toggleSectionVisibility,
        setFeaturedMission,
        setFeaturedRetreat,
        toggleFeaturedProduct,
        updateSection,
        updateHero,
        updateNav,
        updateAbout,
        updateProgramsHeader,
        updateVolunteerHeader,
        updateRetreatsHeader,
        updateShopHeader,
        updateMissionHeart,
        updateFooter,
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
