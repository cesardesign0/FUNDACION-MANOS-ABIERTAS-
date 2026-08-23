import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { 
  Calendar, ShoppingBag, Target, Star, Settings, LogOut, ExternalLink, 
  Plus, Edit, Trash2, Check, X, ShieldCheck, RefreshCw, AlertCircle, 
  ArrowLeft, Lock, Mail, Phone, MapPin, DollarSign, Image as ImageIcon,
  CheckCircle2, Clock, Sparkles, User, Link as LinkIcon, Upload, CalendarDays,
  FileText, ListPlus, Home, LayoutTemplate, Menu, Eye, BookOpen, Heart
} from 'lucide-react';

export const AdminDashboard = ({ onExitAdmin }) => {
  const {
    hero, nav, events, products, missions, reviews, approvedReviews, pendingReviews, settings,
    updateHero, updateNav,
    addEvent, updateEvent, deleteEvent,
    addProduct, updateProduct, deleteProduct,
    addMission, updateMission, deleteMission,
    approveReview, deleteReview, updateSettings, resetToDefaults
  } = useAdminData();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'hero', 'nav', 'retreats', 'shop', 'missions', 'reviews', 'settings'
  const [activeTab, setActiveTab] = useState('hero');

  // Modals & Editing states
  const [editingItem, setEditingItem] = useState(null);
  const [editingType, setEditingType] = useState(''); // 'retreat', 'product', 'mission'
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);
  const [photoPickerMode, setPhotoPickerMode] = useState('upload'); // 'upload', 'url', 'gallery'
  const [tempUrlInput, setTempUrlInput] = useState('');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');

  // Local state for Hero and Nav forms
  const [heroForm, setHeroForm] = useState(() => ({
    tag: hero?.tag || "Fe, Ayuda Humanitaria y Sanación Espiritual",
    handwritten: hero?.handwritten || "Ayudando a transformar vidas y su futuro",
    title: hero?.title || "«Cada uno ponga al servicio de los demás el don recibido, como buenos servidores de la gracia de Dios»",
    citation: hero?.citation || "— 1 Pedro 4, 10",
    description: hero?.description || "Nacidos del Centro Carismático Católico de Nueva York y el grupo Isha Bethel, en la Fundación Manos Abiertas de Jesús y María brindamos ayuda humanitaria, acompañamiento fraterno y retiros de sanación integral.",
    btnDonate: hero?.btnDonate || "Hacer una Donación",
    btnVolunteer: hero?.btnVolunteer || "Únete como Voluntario",
    btnCauses: hero?.btnCauses || "Ver Nuestras Misiones",
    logoCardImage: hero?.logoCardImage || "/logo-manos-abiertas.png",
    backgroundImage: hero?.backgroundImage || "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1920&q=85"
  }));

  const [navForm, setNavForm] = useState(() => ({
    home: nav?.home || "Inicio",
    mission: nav?.mission || "Nuestra Misión",
    programs: nav?.programs || "Misiones y Causas",
    about: nav?.about || "La Casa de Ayuda",
    retreats: nav?.retreats || "Calendario de Actividades",
    goals: nav?.goals || "Misiones Completadas",
    shop: nav?.shop || "Tienda Solidaria"
  }));

  // Preset gallery images for quick picks
  const quickGalleryImages = [
    { label: "Logo Oficial Fundación", url: "/logo-manos-abiertas.png" },
    { label: "Logo El Centro Bronx", url: "/logo-el-centro.png" },
    { label: "Retiro Mujeres Isha Bethel", url: "/retreats/retiro-mujeres.jpg" },
    { label: "Retiro Primer Paso", url: "/retreats/retiro-primer-paso.jpg" },
    { label: "Retiro Matrimonios", url: "/retreats/retiro-matrimonios.jpg" },
    { label: "Seminario Espíritu", url: "/retreats/seminario-espiritu.jpg" },
    { label: "Retiro Jóvenes", url: "/retreats/retiro-jovenes.jpg" },
    { label: "Rosario Madera Olivo", url: "/shop/rosario-olivo.jpg" },
    { label: "Biblia de Estudio", url: "/shop/biblia-catolica.jpg" },
    { label: "Denario de Plata", url: "/shop/denario-plata.jpg" },
    { label: "Virgen de Guadalupe", url: "/shop/virgen-guadalupe.jpg" },
    { label: "Sagrado Corazón", url: "/shop/sagrado-corazon.jpg" },
    { label: "Comedores y Alimentos", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80" },
    { label: "Familias y Techo", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" }
  ];

  const showNotification = (msg) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(''), 3000);
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginPass === 'manosabiertas2026' || loginPass === 'admin123' || loginEmail.includes('admin')) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. (Prueba con: manosabiertas2026)');
    }
  };

  // Handle Local Image Upload (FileReader to base64)
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingItem) {
          setEditingItem({ ...editingItem, image: reader.result });
          setIsPhotoPickerOpen(false);
          showNotification("Foto cargada con éxito");
        } else if (activeTab === 'hero') {
          setHeroForm(prev => ({ ...prev, logoCardImage: reader.result }));
          setIsPhotoPickerOpen(false);
          showNotification("Logo / imagen de portada actualizada");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Calendar Date Picker change for retreats
  const handleDatePickerChange = (e) => {
    const selectedDateStr = e.target.value; // "YYYY-MM-DD"
    if (!selectedDateStr) return;
    
    const parts = selectedDateStr.split('-');
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    
    const monthsEs = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const formatted = `${day} de ${monthsEs[monthIndex]}, ${year}`;
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        date: formatted,
        rawCalendarDate: selectedDateStr
      });
    }
  };

  // =========================================================================
  // 1. PANTALLA DE LOGIN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-brand-teal selection:text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Ambient light */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-coral/15 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 relative z-10">
            <div className="inline-block p-3 bg-white rounded-2xl shadow-md mb-2">
              <img
                src="/logo-manos-abiertas.png"
                alt="Logo Fundación Manos Abiertas"
                className="h-16 w-auto object-contain"
              />
            </div>
            <h2 className="text-2xl font-black text-white font-display">
              Panel Administrativo
            </h2>
            <p className="text-xs text-slate-400">
              Fundación Manos Abiertas de Jesús & María
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-2xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Correo de Administrador
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="pastoral@fundacionmanosabiertas.org"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-brand-teal outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-brand-teal outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-teal-600 hover:to-teal-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-teal/30 hover:scale-[1.02] transition-all"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Quick Demo Credentials helper */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1 text-center">
            <div className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
              Acceso Rápido de Prueba:
            </div>
            <div>Contraseña: <strong className="text-white font-mono">manosabiertas2026</strong></div>
            <button
              onClick={() => {
                setLoginEmail('admin@fundacionmanosabiertas.org');
                setLoginPass('manosabiertas2026');
                setIsAuthenticated(true);
              }}
              className="mt-1 text-brand-teal hover:underline text-[11px] font-bold block mx-auto"
            >
              👉 Clic aquí para entrar automáticamente
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onExitAdmin}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mx-auto font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Página Web Pública</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. DASHBOARD ADMINISTRATIVO PRINCIPAL
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-brand-teal selection:text-white">
      
      {/* Top Navbar del Panel */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-xl shadow-xs">
            <img src="/logo-manos-abiertas.png" alt="Logo" className="h-9 w-auto object-contain" />
          </div>
          <div>
            <h1 className="font-display font-black text-base sm:text-lg text-white leading-tight">
              Panel de Control Pastoral (Editor en Vivo)
            </h1>
            <p className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">
              Fundación Manos Abiertas de Jesús & María
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExitAdmin}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-all shadow-xs"
            title="Ver la página web como la ven los visitantes"
          >
            <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            <span className="hidden sm:inline">Ver Web Pública</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="inline-flex items-center gap-1.5 bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-bold px-3.5 py-2 rounded-xl border border-red-800/60 transition-all shadow-xs"
            title="Cerrar sesión"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Save Success Alert Notification */}
      {saveSuccessNotice && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-black animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveSuccessNotice}</span>
        </div>
      )}

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-2">
          <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800 space-y-1">
            
            {/* NUEVA PESTAÑA: Portada & Frases de Inicio */}
            <button
              onClick={() => { setActiveTab('hero'); setEditingItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'hero'
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-brand-gold" />
                <span>Página de Inicio & Frases</span>
              </div>
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">Hero</span>
            </button>

            {/* NUEVA PESTAÑA: Menú de Navegación */}
            <button
              onClick={() => { setActiveTab('nav'); setEditingItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'nav'
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Menu className="w-4 h-4" />
                <span>Menú y Navegación</span>
              </div>
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">7</span>
            </button>

            <button
              onClick={() => { setActiveTab('retreats'); setEditingItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'retreats'
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4" />
                <span>Retiros y Calendario</span>
              </div>
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">{events.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('shop'); setEditingItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'shop'
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Tienda Solidaria</span>
              </div>
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">{products.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('missions'); setEditingItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'missions'
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Target className="w-4 h-4" />
                <span>Misiones y Casos</span>
              </div>
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">{missions.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('reviews'); setEditingItem(null); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reviews'
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4" />
                <span>Reseñas y Testimonios</span>
              </div>
              {pendingReviews.length > 0 ? (
                <span className="bg-brand-coral text-white px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse">
                  {pendingReviews.length} pendientes
                </span>
              ) : (
                <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">{approvedReviews.length}</span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setEditingItem(null); }}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-brand-teal text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Contacto, Zelle & Redes</span>
            </button>
          </div>

          {/* Reset button */}
          <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-center">
            <button
              onClick={() => {
                if (window.confirm("¿Seguro que deseas restablecer todos los datos a los valores iniciales oficiales?")) {
                  resetToDefaults();
                  showNotification("Datos restablecidos a los valores por defecto");
                }
              }}
              className="text-[11px] text-slate-500 hover:text-slate-300 font-semibold flex items-center justify-center gap-1.5 mx-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Restablecer Valores Iniciales</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8">
          
          {/* ========================================================================= */}
          {/* TAB 0: PORTADA & PÁGINA DE INICIO (HERO) */}
          {/* ========================================================================= */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-gold" />
                    <span>Personalizar Portada de Inicio (Frases, Versículos y Botones)</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Edita los textos, versículos bíblicos, imagen central y nombres de botones de la página principal.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateHero(heroForm);
                    showNotification("¡Portada de inicio actualizada con éxito!");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-teal-600 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/20 hover:scale-105 transition-all"
                >
                  Guardar Cambios de Portada
                </button>
              </div>

              {/* Vista Previa en Vivo */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Vista Previa en Tiempo Real de la Portada:</span>
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/20 text-teal-300 text-[10px] font-black uppercase tracking-wider">
                    ✨ {heroForm.tag}
                  </div>

                  <div className="font-handwritten text-3xl sm:text-4xl text-brand-gold font-bold">
                    {heroForm.handwritten}
                  </div>

                  <div className="border-l-4 border-brand-gold/70 pl-3 py-1">
                    <div className="font-serif italic text-lg sm:text-xl text-white font-medium">
                      {heroForm.title}
                    </div>
                    <span className="text-amber-200 text-xs font-bold block mt-1">
                      📖 {heroForm.citation}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
                    {heroForm.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-4 py-2 rounded-full bg-brand-coral text-white text-xs font-black shadow-md">
                      ❤️ {heroForm.btnDonate}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
                      👥 {heroForm.btnVolunteer}
                    </span>
                    <span className="px-4 py-2 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold border border-brand-gold/40">
                      {heroForm.btnCauses} →
                    </span>
                  </div>
                </div>
              </div>

              {/* Formulario de Campos de Inicio */}
              <div className="space-y-4 text-xs">
                
                {/* 1. Subtítulo Manuscrito & Badge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Subtítulo Manuscrito Dorado (Frase Principal)
                    </label>
                    <input
                      type="text"
                      value={heroForm.handwritten}
                      onChange={(e) => setHeroForm({ ...heroForm, handwritten: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-brand-gold font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Etiqueta Superior (Badge de la portada)
                    </label>
                    <input
                      type="text"
                      value={heroForm.tag}
                      onChange={(e) => setHeroForm({ ...heroForm, tag: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                {/* 2. Versículo Bíblico & Cita */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 font-bold mb-1">
                      Versículo Bíblico o Mensaje Central
                    </label>
                    <textarea
                      rows="2"
                      value={heroForm.title}
                      onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-serif italic text-sm resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">
                      Cita del Libro Bíblico
                    </label>
                    <input
                      type="text"
                      placeholder="— 1 Pedro 4, 10"
                      value={heroForm.citation}
                      onChange={(e) => setHeroForm({ ...heroForm, citation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-bold text-sm"
                    />
                  </div>
                </div>

                {/* 3. Párrafo Descriptivo */}
                <div>
                  <label className="block text-slate-400 font-bold mb-1">
                    Párrafo Descriptivo de la Fundación en Portada
                  </label>
                  <textarea
                    rows="3"
                    value={heroForm.description}
                    onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed resize-none"
                  />
                </div>

                {/* 4. Textos de los 3 Botones */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Nombres de los 3 Botones de Acción de Portada:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Botón Rojo (Donar)</label>
                      <input
                        type="text"
                        value={heroForm.btnDonate}
                        onChange={(e) => setHeroForm({ ...heroForm, btnDonate: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Botón Secundario (Voluntario)</label>
                      <input
                        type="text"
                        value={heroForm.btnVolunteer}
                        onChange={(e) => setHeroForm({ ...heroForm, btnVolunteer: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Botón Dorado (Misiones)</label>
                      <input
                        type="text"
                        value={heroForm.btnCauses}
                        onChange={(e) => setHeroForm({ ...heroForm, btnCauses: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Emblema / Imagen del Logo de la Tarjeta Flotante */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Imagen del Logo / Flyer en la Tarjeta Flotante Izquierda:
                  </span>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center flex-shrink-0">
                      <img src={heroForm.logoCardImage} alt="Logo" className="max-h-full max-w-full object-contain" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Ruta o URL de la imagen (ej: /logo-manos-abiertas.png)"
                        value={heroForm.logoCardImage}
                        onChange={(e) => setHeroForm({ ...heroForm, logoCardImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-brand-teal file:text-white hover:file:bg-brand-teal-dark cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      updateHero(heroForm);
                      showNotification("¡Portada de inicio actualizada con éxito!");
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-teal-600 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/20 hover:scale-[1.01] transition-all"
                  >
                    Guardar Cambios de la Página de Inicio
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 0.5: MENÚ DE NAVEGACIÓN (NAVBAR) */}
          {/* ========================================================================= */}
          {activeTab === 'nav' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display flex items-center gap-2">
                    <Menu className="w-5 h-5 text-brand-teal" />
                    <span>Personalizar Menú de Navegación</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Cambia los nombres de cada una de las pestañas del menú superior.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    updateNav(navForm);
                    showNotification("¡Nombres del menú guardados con éxito!");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  Guardar Nombres del Menú
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Enlace 1 (Inicio)</label>
                  <input
                    type="text"
                    value={navForm.home}
                    onChange={(e) => setNavForm({ ...navForm, home: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Enlace 2 (Nuestra Misión)</label>
                  <input
                    type="text"
                    value={navForm.mission}
                    onChange={(e) => setNavForm({ ...navForm, mission: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Enlace 3 (Misiones y Causas)</label>
                  <input
                    type="text"
                    value={navForm.programs}
                    onChange={(e) => setNavForm({ ...navForm, programs: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Enlace 4 (La Casa de Ayuda)</label>
                  <input
                    type="text"
                    value={navForm.about}
                    onChange={(e) => setNavForm({ ...navForm, about: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Enlace 5 (Calendario de Actividades)</label>
                  <input
                    type="text"
                    value={navForm.retreats}
                    onChange={(e) => setNavForm({ ...navForm, retreats: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Enlace 6 (Misiones Completadas)</label>
                  <input
                    type="text"
                    value={navForm.goals}
                    onChange={(e) => setNavForm({ ...navForm, goals: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-bold mb-1">Enlace 7 (Tienda Solidaria)</label>
                  <input
                    type="text"
                    value={navForm.shop}
                    onChange={(e) => setNavForm({ ...navForm, shop: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    updateNav(navForm);
                    showNotification("¡Nombres del menú guardados con éxito!");
                  }}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-teal-600 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/20 hover:scale-[1.01] transition-all"
                >
                  Guardar Nombres del Menú
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 1: RETIROS Y CALENDARIO */}
          {/* ========================================================================= */}
          {activeTab === 'retreats' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display">
                    Gestión de Retiros y Actividades
                  </h2>
                  <p className="text-xs text-slate-400">
                    Agrega, edita fechas, cambia costos o fotos de los retiros del Centro Carismático Católico.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newRetreat = {
                      id: `ret-${Date.now()}`,
                      title: "Nuevo Retiro Espiritual",
                      date: "24 – 26 de Octubre, 2026",
                      schedule: "Viernes 6:30 PM a Domingo 3:00 PM",
                      cost: "$50 USD",
                      type: "Retiro Espiritual",
                      category: "Retiro General",
                      location: "Centro Carismático Católico (826 E. 166th St., Bronx, NY)",
                      desc: "Descripción del retiro vivencial...",
                      image: "/retreats/retiro-mujeres.jpg",
                      period: "current",
                      registrationLink: "https://tickets.centrobronx.com"
                    };
                    addEvent(newRetreat);
                    setEditingItem(newRetreat);
                    setEditingType('retreat');
                    showNotification("Nuevo retiro agregado a la lista");
                  }}
                  className="inline-flex items-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Nuevo Retiro</span>
                </button>
              </div>

              {/* Grid of Retreats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev) => (
                  <div key={ev.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between p-4 space-y-3">
                    <div className="flex gap-3">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-700"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-black tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-md">
                          {ev.category || ev.type}
                        </span>
                        <h4 className="font-bold text-sm text-white line-clamp-1">{ev.title}</h4>
                        <div className="text-xs text-teal-300 font-mono font-bold">{ev.date}</div>
                        <div className="text-xs text-slate-400">{ev.cost} • {ev.schedule}</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(ev);
                          setEditingType('retreat');
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 text-brand-teal" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`¿Seguro que deseas eliminar "${ev.title}"?`)) {
                            deleteEvent(ev.id);
                            showNotification("Retiro eliminado");
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white transition-colors"
                        title="Eliminar retiro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: TIENDA SOLIDARIA */}
          {/* ========================================================================= */}
          {activeTab === 'shop' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display">
                    Gestión de la Tienda Solidaria
                  </h2>
                  <p className="text-xs text-slate-400">
                    Cambia precios, actualiza descripciones o sube fotos de los artículos y libros católicos.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newProd = {
                      id: `prod-${Date.now()}`,
                      name: "Nuevo Artículo Católico",
                      category: "religious",
                      price: 20.00,
                      originalPrice: 25.00,
                      rating: 5,
                      image: "/shop/rosario-olivo.jpg",
                      desc: "Descripción del artículo...",
                      tag: "Novedad"
                    };
                    addProduct(newProd);
                    setEditingItem(newProd);
                    setEditingType('product');
                    showNotification("Nuevo producto agregado");
                  }}
                  className="inline-flex items-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Producto</span>
                </button>
              </div>

              {/* Grid of Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((prod) => (
                  <div key={prod.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between space-y-3">
                    <div className="flex gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-700"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider bg-brand-gold/10 px-2 py-0.5 rounded-md">
                          {prod.tag}
                        </span>
                        <h4 className="font-bold text-sm text-white line-clamp-1">{prod.name}</h4>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-black text-emerald-400 text-sm">${prod.price} USD</span>
                          {prod.originalPrice && (
                            <span className="line-through text-slate-500">${prod.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          setEditingItem(prod);
                          setEditingType('product');
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 text-brand-teal" />
                        <span>Editar Precio / Foto</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`¿Seguro que deseas eliminar "${prod.name}"?`)) {
                            deleteProduct(prod.id);
                            showNotification("Producto eliminado");
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400 hover:text-white transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MISIONES Y CASOS COMPLETOS */}
          {/* ========================================================================= */}
          {activeTab === 'missions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display">
                    Misiones, Metas y Casos en Detalle
                  </h2>
                  <p className="text-xs text-slate-400">
                    Modifica los textos del caso, necesidades inmediatas, montos recaudados y metas.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newMiss = {
                      id: Date.now(),
                      title: "Nueva Misión de Emergencia",
                      desc: "Distribución de ayuda y acompañamiento a familias...",
                      fullStory: "Esta causa responde directamente al llamado del Evangelio de asistir al desamparado.",
                      needs: "• Fondos para suministros\n• Voluntarios para reparto\n• Acompañamiento espiritual",
                      raisedAmount: "$0",
                      goalAmount: "$20,000",
                      percentage: 0,
                      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80"
                    };
                    addMission(newMiss);
                    setEditingItem(newMiss);
                    setEditingType('mission');
                    showNotification("Nueva misión creada");
                  }}
                  className="inline-flex items-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Nueva Misión</span>
                </button>
              </div>

              {/* List of Missions */}
              <div className="space-y-4">
                {missions.map((m) => (
                  <div key={m.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={m.image}
                        alt={m.title}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-700"
                      />
                      <div className="space-y-1.5 flex-1">
                        <h4 className="font-bold text-base text-white">{m.title}</h4>
                        <p className="text-xs text-slate-400 max-w-xl line-clamp-2">{m.desc}</p>
                        
                        {/* Progress bar */}
                        <div className="flex items-center gap-3 pt-1">
                          <div className="flex-1 max-w-md h-2.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-brand-teal to-emerald-400 rounded-full"
                              style={{ width: `${m.percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-emerald-400">{m.percentage}%</span>
                        </div>

                        <div className="text-xs text-slate-300 font-semibold">
                          Recaudado: <strong className="text-brand-gold">{m.raisedAmount}</strong> de {m.goalAmount}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setEditingItem(m);
                          setEditingType('mission');
                        }}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Edit className="w-3.5 h-3.5 text-brand-teal" />
                        <span>Editar Caso & Metas</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar la causa "${m.title}"?`)) {
                            deleteMission(m.id);
                            showNotification("Causa eliminada");
                          }
                        }}
                        className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: MODERACIÓN DE RESEÑAS */}
          {/* ========================================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-black text-white font-display">
                  Moderación de Reseñas y Testimonios
                </h2>
                <p className="text-xs text-slate-400">
                  Revisa los testimonios enviados por visitantes de la web antes de hacerlos públicos.
                </p>
              </div>

              {/* Pending Reviews */}
              {pendingReviews.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Testimonios Pendientes de Aprobación ({pendingReviews.length})</span>
                  </h3>

                  <div className="space-y-3">
                    {pendingReviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <strong className="text-white text-sm block">{rev.author}</strong>
                            <span className="text-xs text-amber-300">{rev.role}</span>
                          </div>
                          <div className="text-brand-gold text-xs">{"⭐".repeat(rev.rating || 5)}</div>
                        </div>

                        <p className="text-xs text-slate-200 italic bg-black/40 p-3 rounded-xl">
                          "{rev.quote}"
                        </p>

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            onClick={() => {
                              deleteReview(rev.id);
                              showNotification("Reseña rechazada");
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-red-950 text-red-300 hover:bg-red-900 text-xs font-bold"
                          >
                            Rechazar
                          </button>
                          <button
                            onClick={() => {
                              approveReview(rev.id);
                              showNotification("¡Testimonio aprobado y publicado en la web!");
                            }}
                            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Aprobar y Publicar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approved Reviews */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  Testimonios Publicados en la Web ({approvedReviews.length})
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {approvedReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="text-white text-sm block">{rev.author}</strong>
                          <span className="text-[11px] text-teal-300">{rev.role}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm("¿Eliminar este testimonio de la web?")) {
                              deleteReview(rev.id);
                              showNotification("Testimonio eliminado");
                            }
                          }}
                          className="p-1 text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 italic">"{rev.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: CONFIGURACIÓN GENERAL */}
          {/* ========================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <h2 className="text-xl font-black text-white font-display">
                  Configuración de Contacto, Zelle y Redes
                </h2>
                <p className="text-xs text-slate-400">
                  Modifica los canales oficiales de comunicación y donación de la fundación.
                </p>
              </div>

              <div className="space-y-4 text-xs max-w-xl">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Correo Central de la Fundación</label>
                  <input
                    type="email"
                    value={settings.officialEmail}
                    onChange={(e) => updateSettings({ officialEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Aquí llegarán todos los mensajes de contacto y propuestas de causas.</span>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Correo de Donaciones / Zelle</label>
                  <input
                    type="email"
                    value={settings.donationsEmail}
                    onChange={(e) => updateSettings({ donationsEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-brand-gold font-mono font-bold"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Es el correo que los donantes ven en el modal para transferir por Zelle.</span>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Teléfono y WhatsApp Oficial</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => updateSettings({ phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Dirección de la Casa de Ayuda</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => showNotification("¡Configuración guardada en toda la web!")}
                    className="py-3 px-6 rounded-2xl bg-brand-teal hover:bg-brand-teal-dark text-white font-black text-xs uppercase tracking-wider shadow-lg"
                  >
                    Guardar Configuración
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL UNIVERSAL EDIT MODAL CON PREVISUALIZADOR Y SUBIDOR DE FOTO */}
      {/* ========================================================================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl animate-fadeIn">
            
            {/* Header del Modal */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-brand-teal/20 text-brand-teal">
                  {editingType === 'retreat' && <Calendar className="w-5 h-5" />}
                  {editingType === 'product' && <ShoppingBag className="w-5 h-5" />}
                  {editingType === 'mission' && <Target className="w-5 h-5" />}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">
                    {editingType === 'retreat' && 'Editar Retiro Espiritual'}
                    {editingType === 'product' && 'Editar Artículo de Tienda'}
                    {editingType === 'mission' && 'Editar Misión y Caso Completo'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Cambia la foto, fechas o textos. Los cambios se reflejarán de inmediato en la web.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsPhotoPickerOpen(false);
                }}
                className="p-1.5 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FOTO ACTUAL CON BOTÓN DE CAMBIAR / CARGAR FOTO */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Foto del {editingType === 'retreat' ? 'Retiro' : editingType === 'product' ? 'Artículo' : 'Caso'}
              </span>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-brand-teal/40 flex-shrink-0 bg-slate-900 group">
                  <img
                    src={editingItem.image || '/retreats/retiro-mujeres.jpg'}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <ImageIcon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left w-full">
                  <p className="text-xs text-slate-300 font-medium">
                    Puedes cargar una foto nueva desde tu computadora/celular o pegar el link.
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsPhotoPickerOpen(!isPhotoPickerOpen)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-black shadow-md hover:scale-105 transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    <span>📷 Cambiar Foto / Subir Imagen o Link</span>
                  </button>
                </div>
              </div>

              {/* RECUADRO DESPLEGABLE PARA CAMBIAR FOTO */}
              {isPhotoPickerOpen && (
                <div className="mt-3 p-4 rounded-2xl bg-slate-900 border border-brand-teal/30 space-y-3 animate-fadeIn">
                  <div className="flex border-b border-slate-800 pb-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setPhotoPickerMode('upload')}
                      className={`pb-1 font-bold ${photoPickerMode === 'upload' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-slate-400'}`}
                    >
                      Subir Archivo
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoPickerMode('url')}
                      className={`pb-1 font-bold ${photoPickerMode === 'url' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-slate-400'}`}
                    >
                      Pegar Link / URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoPickerMode('gallery')}
                      className={`pb-1 font-bold ${photoPickerMode === 'gallery' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-slate-400'}`}
                    >
                      Galería Rápida
                    </button>
                  </div>

                  {/* Mode 1: Subir Archivo local */}
                  {photoPickerMode === 'upload' && (
                    <div className="space-y-2">
                      <label className="block text-xs text-slate-300">
                        Selecciona una foto desde tu dispositivo:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-brand-teal file:text-white hover:file:bg-brand-teal-dark cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Mode 2: Pegar URL */}
                  {photoPickerMode === 'url' && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/..."
                        value={tempUrlInput}
                        onChange={(e) => setTempUrlInput(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (tempUrlInput) {
                            setEditingItem({ ...editingItem, image: tempUrlInput });
                            setIsPhotoPickerOpen(false);
                            setTempUrlInput('');
                            showNotification("Foto actualizada por URL");
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-brand-teal text-white text-xs font-bold"
                      >
                        Aplicar
                      </button>
                    </div>
                  )}

                  {/* Mode 3: Galería Rápida */}
                  {photoPickerMode === 'gallery' && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1">
                      {quickGalleryImages.map((imgItem, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setEditingItem({ ...editingItem, image: imgItem.url });
                            setIsPhotoPickerOpen(false);
                            showNotification(`Foto seleccionada: ${imgItem.label}`);
                          }}
                          className="group relative rounded-xl overflow-hidden border border-slate-700 hover:border-brand-teal transition-all text-left"
                        >
                          <img src={imgItem.url} alt={imgItem.label} className="w-full h-14 object-cover" />
                          <span className="text-[9px] text-slate-300 block p-1 truncate bg-slate-950/80">
                            {imgItem.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FORMULARIO ESPECÍFICO SEGÚN TIPO */}

            {/* 1. CAMPOS DE RETIRO */}
            {editingType === 'retreat' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Nombre del Retiro</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                  />
                </div>

                {/* SELECTOR DE FECHA CON CALENDARIO + TEXTO LIBRE */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-brand-gold font-bold">
                    <CalendarDays className="w-4 h-4" />
                    <span>Seleccionar Fecha del Retiro:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Selector tipo Calendario */}
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Elegir en Calendario 📅</label>
                      <input
                        type="date"
                        onChange={handleDatePickerChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white cursor-pointer"
                      />
                    </div>

                    {/* Texto visible de la fecha */}
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Texto de la Fecha (Editable)</label>
                      <input
                        type="text"
                        placeholder="Ej: 24 – 26 de Octubre, 2026"
                        value={editingItem.date || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Costo / Inversión ($ USD)</label>
                    <input
                      type="text"
                      placeholder="Ej: $65 USD"
                      value={editingItem.cost || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, cost: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Horario del Encuentro</label>
                    <input
                      type="text"
                      placeholder="Ej: Viernes 6:30 PM – Domingo 3:00 PM"
                      value={editingItem.schedule || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, schedule: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Periodo en el Calendario</label>
                    <select
                      value={editingItem.period || 'current'}
                      onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                    >
                      <option value="current">Este Mes (Actual)</option>
                      <option value="next">El Próximo Mes</option>
                      <option value="future">Otras Próximas Actividades</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Enlace de Tickets / Registro</label>
                    <input
                      type="text"
                      placeholder="https://tickets.centrobronx.com"
                      value={editingItem.registrationLink || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, registrationLink: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Descripción del Retiro</label>
                  <textarea
                    rows="3"
                    value={editingItem.desc || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                  />
                </div>
              </div>
            )}

            {/* 2. CAMPOS DE TIENDA */}
            {editingType === 'product' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Nombre del Producto / Artículo</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Precio Actual ($ USD)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editingItem.price || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Precio Original (Opcional)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={editingItem.originalPrice || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, originalPrice: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Etiqueta / Tag (Ej: Devoción Mariana)</label>
                  <input
                    type="text"
                    value={editingItem.tag || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Descripción del Artículo</label>
                  <textarea
                    rows="3"
                    value={editingItem.desc || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                  />
                </div>
              </div>
            )}

            {/* 3. CAMPOS DE MISIÓN Y DETALLE COMPLETO DEL CASO */}
            {editingType === 'mission' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Título de la Misión o Caso</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Recaudado Actual ($)</label>
                    <input
                      type="text"
                      placeholder="Ej: $38,400"
                      value={editingItem.raisedAmount || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, raisedAmount: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-brand-gold font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Meta Necesaria ($)</label>
                    <input
                      type="text"
                      placeholder="Ej: $50,000"
                      value={editingItem.goalAmount || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, goalAmount: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">% Financiado</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editingItem.percentage || 0}
                      onChange={(e) => setEditingItem({ ...editingItem, percentage: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Descripción Breve (Visible en la Tarjeta)</label>
                  <textarea
                    rows="2"
                    value={editingItem.desc || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                  />
                </div>

                {/* DETALLE COMPLETO DEL CASO (Modal 'Ver Caso') */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-brand-teal font-bold">
                    <FileText className="w-4 h-4" />
                    <span>Detalle Completo del Caso (Pestaña 'Detalles del Caso'):</span>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">¿De qué se trata esta misión solidaria? (Historia completa)</label>
                    <textarea
                      rows="3"
                      placeholder="Explica la historia completa del caso para los donantes..."
                      value={editingItem.fullStory || editingItem.desc || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, fullStory: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">📋 Necesidades Inmediatas en esta Causa</label>
                    <textarea
                      rows="3"
                      placeholder="• Fondos para provisión de víveres&#10;• Voluntarios para reparto&#10;• Acompañamiento espiritual"
                      value={editingItem.needs || '• Fondos para insumos directos\n• Voluntarios de distribución\n• Apoyo pastoral y fraterno'}
                      onChange={(e) => setEditingItem({ ...editingItem, needs: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-mono text-[11px] resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BOTONES DE ACCIÓN DEL MODAL */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setIsPhotoPickerOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => {
                  if (editingType === 'retreat') {
                    updateEvent(editingItem.id, editingItem);
                    showNotification("¡Retiro guardado exitosamente!");
                  } else if (editingType === 'product') {
                    updateProduct(editingItem.id, editingItem);
                    showNotification("¡Producto guardado exitosamente!");
                  } else if (editingType === 'mission') {
                    updateMission(editingItem.id, editingItem);
                    showNotification("¡Misión y caso completo guardados exitosamente!");
                  }
                  setEditingItem(null);
                  setIsPhotoPickerOpen(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-teal-600 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-teal/20 hover:scale-105 transition-all"
              >
                Guardar Cambios
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
