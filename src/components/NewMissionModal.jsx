import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Sparkles, Send, CheckCircle2, HeartHandshake, MapPin, User, Mail, Phone, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NewMissionModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { newMissionModal } = t;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    causeTitle: '',
    location: '',
    needType: newMissionModal.needTypes[0],
    targetGoal: '',
    description: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden relative border border-brand-teal/30 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-brand-navy to-brand-teal text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-slate-950 text-[10px] font-black uppercase tracking-wider mb-2 shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{newMissionModal.badge}</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            {newMissionModal.title}
          </h3>
          <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-lg">
            {newMissionModal.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-black text-2xl text-slate-900">
                {newMissionModal.successTitle}
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                {newMissionModal.successDesc}
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 max-w-md mx-auto">
                <div><strong>Causa:</strong> {formData.causeTitle}</div>
                <div><strong>Ubicación:</strong> {formData.location}</div>
                <div><strong>Solicitante:</strong> {formData.name} ({formData.phone})</div>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold text-sm shadow-md"
              >
                {newMissionModal.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {newMissionModal.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Diácono Manuel / Hna. Teresa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {newMissionModal.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (718) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {newMissionModal.emailLabel}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {newMissionModal.causeTitleLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Apoyo Comedor San Juan Bosco"
                    value={formData.causeTitle}
                    onChange={(e) => setFormData({ ...formData, causeTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {newMissionModal.locationLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Bronx, NY / Parroquia Santa Rita"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {newMissionModal.needTypeLabel}
                  </label>
                  <select
                    value={formData.needType}
                    onChange={(e) => setFormData({ ...formData, needType: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none bg-white font-medium text-slate-800"
                  >
                    {newMissionModal.needTypes.map((type, idx) => (
                      <option key={idx} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {newMissionModal.targetGoalLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. $2,500 USD o 200 despensas"
                    value={formData.targetGoal}
                    onChange={(e) => setFormData({ ...formData, targetGoal: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {newMissionModal.descriptionLabel}
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder={newMissionModal.descriptionPlaceholder}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand-teal hover:bg-brand-teal-dark text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-teal/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{newMissionModal.btnSubmit}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
