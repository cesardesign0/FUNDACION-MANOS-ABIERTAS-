import React, { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { 
  Calendar, ShoppingBag, Target, Star, Settings, LogOut, ExternalLink, 
  Plus, Edit, Trash2, Check, X, ShieldCheck, RefreshCw, AlertCircle, 
  ArrowLeft, Lock, Mail, Phone, MapPin, DollarSign, Image as ImageIcon,
  CheckCircle2, Clock, Sparkles, User, Link as LinkIcon
} from 'lucide-react';

export const AdminDashboard = ({ onExitAdmin }) => {
  const {
    events, products, missions, reviews, approvedReviews, pendingReviews, settings,
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

  // Active Tab: 'retreats', 'shop', 'missions', 'reviews', 'settings'
  const [activeTab, setActiveTab] = useState('retreats');

  // Modals & Editing states
  const [editingItem, setEditingItem] = useState(null);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');

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
              Panel de Control Pastoral
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
                <span>Misiones y Metas</span>
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
                if (window.confirm("¿Seguro que deseas restablecer los datos a los valores iniciales oficiales?")) {
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
                      date: "Próximo Fin de Semana",
                      schedule: "Viernes 6:30 PM a Domingo 3:00 PM",
                      cost: "$50 USD",
                      type: "Retiro Espiritual",
                      category: "Retiro General",
                      location: "Centro Carismático Católico (826 E. 166th St., Bronx, NY)",
                      desc: "Descripción del retiro...",
                      image: "/retreats/retiro-mujeres.jpg",
                      period: "current",
                      registrationLink: "https://tickets.centrobronx.com"
                    };
                    addEvent(newRetreat);
                    setEditingItem(newRetreat);
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
                        onClick={() => setEditingItem(ev)}
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

              {/* Retreat Edit Drawer / Form */}
              {editingItem && editingItem.id?.startsWith('ret-') && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="font-bold text-lg text-white">Editar Retiro Espiritual</h3>
                      <button onClick={() => setEditingItem(null)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Nombre del Retiro</label>
                        <input
                          type="text"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Fecha</label>
                          <input
                            type="text"
                            value={editingItem.date}
                            onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Costo / Inversión</label>
                          <input
                            type="text"
                            value={editingItem.cost}
                            onChange={(e) => setEditingItem({ ...editingItem, cost: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Horario</label>
                          <input
                            type="text"
                            value={editingItem.schedule}
                            onChange={(e) => setEditingItem({ ...editingItem, schedule: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Categoría / Periodo</label>
                          <select
                            value={editingItem.period}
                            onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                          >
                            <option value="current">Este Mes</option>
                            <option value="next">El Próximo Mes</option>
                            <option value="future">Otras Próximas Actividades</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Enlace de Compra de Tickets</label>
                        <input
                          type="text"
                          value={editingItem.registrationLink}
                          onChange={(e) => setEditingItem({ ...editingItem, registrationLink: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Ruta o URL de la Imagen</label>
                        <input
                          type="text"
                          value={editingItem.image}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Descripción</label>
                        <textarea
                          rows="3"
                          value={editingItem.desc}
                          onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                      <button
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          updateEvent(editingItem.id, editingItem);
                          setEditingItem(null);
                          showNotification("Cambios guardados en el retiro");
                        }}
                        className="px-5 py-2 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-black"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                        className="w-18 h-18 rounded-xl object-cover flex-shrink-0 border border-slate-700"
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
                        onClick={() => setEditingItem(prod)}
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

              {/* Product Edit Modal */}
              {editingItem && editingItem.id?.startsWith('prod-') && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="font-bold text-lg text-white">Editar Artículo de Tienda</h3>
                      <button onClick={() => setEditingItem(null)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Nombre del Producto</label>
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Precio Actual ($ USD)</label>
                          <input
                            type="number"
                            step="0.5"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Precio Original / Tachado</label>
                          <input
                            type="number"
                            step="0.5"
                            value={editingItem.originalPrice || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, originalPrice: Number(e.target.value) })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">URL de la Foto</label>
                        <input
                          type="text"
                          value={editingItem.image}
                          onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Etiqueta / Tag (Ej: Devoción Mariana)</label>
                        <input
                          type="text"
                          value={editingItem.tag}
                          onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Descripción</label>
                        <textarea
                          rows="3"
                          value={editingItem.desc}
                          onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                      <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          updateProduct(editingItem.id, editingItem);
                          setEditingItem(null);
                          showNotification("Producto actualizado exitosamente");
                        }}
                        className="px-5 py-2 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white text-xs font-black"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: MISIONES Y METAS */}
          {/* ========================================================================= */}
          {activeTab === 'missions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h2 className="text-xl font-black text-white font-display">
                    Misiones y Metas de Recaudación
                  </h2>
                  <p className="text-xs text-slate-400">
                    Actualiza las barras de progreso, metas y montos recaudados de las obras sociales.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const newMiss = {
                      id: Date.now(),
                      title: "Nueva Misión de Emergencia",
                      desc: "Detalle de la causa comunitaria...",
                      raisedAmount: "$0",
                      goalAmount: "$20,000",
                      percentage: 0,
                      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80"
                    };
                    addMission(newMiss);
                    setEditingItem(newMiss);
                    showNotification("Nueva misión creada");
                  }}
                  className="inline-flex items-center gap-2 bg-brand-coral hover:bg-brand-coral-dark text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md hover:scale-105 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Crear Misión</span>
                </button>
              </div>

              {/* List of Missions */}
              <div className="space-y-4">
                {missions.map((m) => (
                  <div key={m.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <h4 className="font-bold text-base text-white">{m.title}</h4>
                      <p className="text-xs text-slate-400 max-w-xl">{m.desc}</p>
                      
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

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => setEditingItem(m)}
                        className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5 text-brand-teal" />
                        <span>Actualizar Meta</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar la causa "${m.title}"?`)) {
                            deleteMission(m.id);
                            showNotification("Causa eliminada");
                          }
                        }}
                        className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900 text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mission Edit Modal */}
              {editingItem && !editingItem.id?.toString().startsWith('prod-') && !editingItem.id?.toString().startsWith('ret-') && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <h3 className="font-bold text-lg text-white">Actualizar Misión</h3>
                      <button onClick={() => setEditingItem(null)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Título de la Causa</label>
                        <input
                          type="text"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Monto Recaudado ($)</label>
                          <input
                            type="text"
                            value={editingItem.raisedAmount}
                            onChange={(e) => setEditingItem({ ...editingItem, raisedAmount: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-400 font-bold mb-1">Meta Total ($)</label>
                          <input
                            type="text"
                            value={editingItem.goalAmount}
                            onChange={(e) => setEditingItem({ ...editingItem, goalAmount: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 font-bold mb-1">Porcentaje de Avance (0 a 100%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={editingItem.percentage}
                          onChange={(e) => setEditingItem({ ...editingItem, percentage: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                      <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          updateMission(editingItem.id, editingItem);
                          setEditingItem(null);
                          showNotification("Meta actualizada exitosamente");
                        }}
                        className="px-5 py-2 rounded-xl bg-brand-teal text-white text-xs font-black"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              )}
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

    </div>
  );
};
