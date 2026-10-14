import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Star, Heart, CheckCircle2, ShieldCheck, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FOUNDATION_CONFIG } from '../config/foundationConfig';

export const ReviewModal = ({ isOpen, onClose, onReviewSubmitted }) => {
  const { language } = useLanguage();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Hermano en la Fe');
  const [city, setCity] = useState('Bronx, NY');
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newReview = {
      id: 'rev-' + Date.now(),
      author: name,
      role: `${role} • ${city}`,
      quote: comment,
      rating,
      date: new Date().toLocaleDateString(),
      approved: false // Marcada para moderación pastoral
    };

    if (onReviewSubmitted) {
      onReviewSubmitted(newReview);
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setComment('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-slate-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-brand-navy text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-wider mb-2 border border-brand-gold/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'TESTIMONIOS Y EXPERIENCIAS' : 'TESTIMONIALS & REVIEWS'}</span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            {language === 'es' ? 'Deja tu Reseña o Testimonio' : 'Leave a Review or Testimony'}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            {language === 'es' 
              ? 'Comparte cómo la Fundación Manos Abiertas o el Centro Católico Carismático Bronx de Nueva York ha bendecido tu vida o la de tu familia.'
              : 'Share how Manos Abiertas Foundation or the Catholic Charismatic Center has blessed your life.'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-bold text-2xl text-slate-900">
                {language === 'es' ? '¡Gracias por Compartir tu Testimonio!' : 'Thank You for Sharing Your Testimony!'}
              </h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                {language === 'es'
                  ? 'Hemos recibido tu testimonio exitosamente. Será remitido a nuestro equipo pastoral y publicado una vez revisado.'
                  : 'We have received your review successfully. It will be reviewed by our pastoral team before publication.'}
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>{language === 'es' ? 'Moderación y Transparencia' : 'Moderation & Transparency'}</span>
                </div>
                <p className="text-[11px] text-amber-800">
                  {language === 'es'
                    ? `Notificación enviada a la administración (${FOUNDATION_CONFIG.officialEmail}). ¡Dios te bendiga!`
                    : `Notification sent to administration (${FOUNDATION_CONFIG.officialEmail}). God bless you!`}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md"
              >
                {language === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Selector */}
              <div className="text-center pb-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {language === 'es' ? 'Calificación / Tu Valoración' : 'Your Rating'}
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          (hoverRating || rating) >= star
                            ? 'text-brand-gold fill-brand-gold'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-semibold block mt-1">
                  {rating === 5 ? '⭐⭐⭐⭐⭐ Excelente bendición' : `${rating} de 5 estrellas`}
                </span>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {language === 'es' ? 'Nombre Completo' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Roberto Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {language === 'es' ? 'Correo Electrónico' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="roberto@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              {/* Role & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {language === 'es' ? 'Tu Relación con la Fundación' : 'Your Relationship'}
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none bg-white text-slate-700"
                  >
                    <option value="Beneficiario de Jornadas de Ayuda">Beneficiario / Ayudado</option>
                    <option value="Voluntario Activo">Voluntario Activo</option>
                    <option value="Donante Solidario">Donante Solidario</option>
                    <option value="Comunidad Isha-Bethel">Comunidad Isha-Bethel</option>
                    <option value="Asistente a Retiros Espirituales">Asistente a Retiros</option>
                    <option value="Hermano en la Fe">Hermano en la Fe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    {language === 'es' ? 'Ciudad / Estado' : 'City / State'}
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Bronx, NY / Queens, NY"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              {/* Testimony / Review Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  {language === 'es' ? 'Tu Reseña o Testimonio' : 'Your Review / Testimony'} *
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Escribe aquí tu experiencia, agradecimiento o palabras sobre la labor de la fundación..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none leading-relaxed resize-none"
                />
              </div>

              {/* Moderation Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  {language === 'es'
                    ? '🔒 Por respeto a la comunidad cristiana, todas las reseñas pasan por una breve revisión de moderación antes de ser publicadas en la página.'
                    : '🔒 To maintain community respect, all reviews are reviewed by our pastoral team before being published.'}
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-coral to-amber-500 hover:from-brand-coral-dark hover:to-amber-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-coral/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{language === 'es' ? 'Enviar Reseña para Aprobación' : 'Submit Review for Approval'}</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
