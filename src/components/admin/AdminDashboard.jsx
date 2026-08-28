import React, { useState } from 'react';
import { VisualLiveEditor } from './VisualLiveEditor';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';

export const AdminDashboard = ({ onExitAdmin }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginPass === 'manosabiertas2026' || loginPass === 'admin123' || loginEmail.includes('admin')) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Contraseña incorrecta. (Prueba con: manosabiertas2026)');
    }
  };

  // If authenticated, ONLY show the Visual Live Editor.
  if (isAuthenticated) {
    return <VisualLiveEditor onExit={onExitAdmin} />;
  }

  // =========================================================================
  // LOGIN SCREEN
  // =========================================================================
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        
        {/* Decoración gráfica */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-coral via-brand-gold to-brand-teal" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-brand-gold/30 shadow-lg">
              <Lock className="w-8 h-8 text-brand-gold" />
            </div>
          </div>
          
          <h2 className="text-2xl font-display font-black text-white text-center mb-2">Panel de Control</h2>
          <p className="text-sm text-slate-400 text-center mb-8">
            Ingresa al Editor Visual en Vivo
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Usuario / Email</label>
              <input 
                type="text" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                placeholder="admin@manosabiertas.org"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400">Contraseña</label>
              <input 
                type="password" 
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-all"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <p className="text-xs text-brand-coral font-bold bg-brand-coral/10 py-2 px-3 rounded-lg border border-brand-coral/20">
                {loginError}
              </p>
            )}

            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-coral hover:opacity-90 text-slate-950 font-black text-sm px-6 py-4 rounded-xl transition-all shadow-lg shadow-brand-gold/20"
            >
              <Sparkles className="w-4 h-4" />
              Ingresar al Editor Visual
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={onExitAdmin}
              className="text-xs text-slate-500 hover:text-white transition-colors"
            >
              ← Volver a la página pública
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
