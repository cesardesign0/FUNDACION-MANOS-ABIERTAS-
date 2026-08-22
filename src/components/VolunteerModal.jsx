import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Users, Handshake, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const VolunteerModal = ({ isOpen, onClose, initialMode = 'volunteer' }) => {
  const { t } = useLanguage();
  const { volunteerModal } = t;

  const [mode, setMode] = useState(initialMode); // 'volunteer' or 'help'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    selection: '',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className={`p-6 text-white relative flex-shrink-0 ${
          mode === 'volunteer' ? 'bg-brand-navy' : 'bg-brand-teal'
        }`}>
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            {mode === 'volunteer' ? (
              <Users className="w-5 h-5 text-brand-gold" />
            ) : (
              <Handshake className="w-5 h-5 text-brand-gold" />
            )}
            <span className="text-xs uppercase font-bold tracking-wider opacity-80">
              {mode === 'volunteer' ? 'Súmate al Equipo' : 'Asistencia Comunitaria'}
            </span>
          </div>

          <h3 className="font-display font-black text-2xl">
            {mode === 'volunteer' ? volunteerModal.titleVolunteer : volunteerModal.titleGetHelp}
          </h3>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-bold text-2xl text-slate-900">
                {volunteerModal.successTitle}
              </h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                {volunteerModal.successDesc}
              </p>
              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-full bg-brand-navy hover:bg-slate-800 text-white font-bold text-sm shadow-md"
              >
                {volunteerModal.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Mode Switcher */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl mb-4">
                <button
                  type="button"
                  onClick={() => setMode('volunteer')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'volunteer'
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🤝 Ser Voluntario
                </button>
                <button
                  type="button"
                  onClick={() => setMode('help')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'help'
                      ? 'bg-brand-teal text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🤲 Solicitar Ayuda
                </button>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {volunteerModal.name}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {volunteerModal.email}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {volunteerModal.phone}
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {volunteerModal.city}
                  </label>
                  <input
                    type="text"
                    placeholder="Tu Ciudad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              {/* Dropdown for Interest or Help Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {mode === 'volunteer' ? volunteerModal.interest : volunteerModal.helpType}
                </label>
                <select
                  required
                  value={formData.selection}
                  onChange={(e) => setFormData({ ...formData, selection: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none bg-white text-slate-700"
                >
                  <option value="">Selecciona una opción...</option>
                  {(mode === 'volunteer' ? volunteerModal.interestsList : volunteerModal.helpTypesList).map((item, idx) => (
                    <option key={idx} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {volunteerModal.message}
                </label>
                <textarea
                  rows="3"
                  placeholder="Cuéntanos brevemente sobre tu disponibilidad o situación..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`w-full py-4 rounded-2xl text-white font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.02] ${
                  mode === 'volunteer' 
                    ? 'bg-brand-navy hover:bg-slate-800 shadow-brand-navy/30' 
                    : 'bg-brand-teal hover:bg-brand-teal-dark shadow-brand-teal/30'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {mode === 'volunteer' ? volunteerModal.btnSubmitVolunteer : volunteerModal.btnSubmitHelp}
                </span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
