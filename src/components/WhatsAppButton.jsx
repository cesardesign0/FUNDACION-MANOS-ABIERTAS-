import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhatsAppButton = () => {
  const { language } = useLanguage();

  const phoneNumber = "17183781734";
  const defaultText = language === 'es'
    ? "Hola, deseo más información sobre la Fundación Manos Abiertas de Jesús y María."
    : "Hello, I would like more information about Manos Abiertas de Jesús y María Foundation.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <aside aria-label="Contacto WhatsApp" className="fixed bottom-6 left-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-300/40"
        aria-label={language === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        {/* WhatsApp Icon */}
        <svg
          className="w-5 h-5 fill-current flex-shrink-0"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.969.587 1.933.914 2.8.914 3.179 0 5.765-2.586 5.765-5.766.001-3.18-2.585-5.766-5.769-5.766zm8.814 5.765c-.002 4.863-3.957 8.819-8.814 8.819-1.547 0-3.048-.403-4.364-1.168l-4.867 1.276 1.298-4.743c-.84-1.378-1.285-2.969-1.287-4.604.002-4.863 3.958-8.819 8.816-8.819 4.858 0 8.818 3.956 8.818 8.819z" />
        </svg>

        <span className="text-xs font-black tracking-wide hidden sm:inline">
          {language === 'es' ? 'WhatsApp Oficial' : 'Official WhatsApp'}
        </span>

        {/* Floating Tooltip */}
        <span className="absolute -top-10 left-0 bg-slate-950 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-800">
          {language === 'es' ? '💬 Escríbenos al Centro NY' : '💬 Chat with us NY Center'}
        </span>
      </a>
    </aside>
  );
};
