import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, Bot, User, Sparkles, MessageCircle, Heart, Phone, Mail, CheckCircle2, Church } from 'lucide-react';

export const ChatAssistantModal = ({ isOpen, onClose, onOpenDonate, onOpenNewMission, onOpenVolunteer }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: language === 'es' 
        ? '¡Paz y bien! 🙏 Bienvenido a la Fundación Manos Abiertas de Jesús & María y el Centro Carismático Católico. ¿En qué podemos orientarte o ayudarte hoy?' 
        : 'Peace and blessings! 🙏 Welcome to Manos Abiertas de Jesús & María and the Catholic Charismatic Center. How can we assist or guide you today?',
      quickReplies: language === 'es' ? [
        '¿Dónde están ubicados?',
        '¿Cómo puedo donar?',
        '¿Cuándo son los retiros?',
        '¿Cómo solicitar ayuda?',
        'Hablar con un asesor'
      ] : [
        'Where are you located?',
        'How can I donate?',
        'When are the retreats?',
        'How to request aid?',
        'Talk to an advisor'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isEscalated, setIsEscalated] = useState(false);
  const [escalateData, setEscalateData] = useState({ name: '', phone: '', email: '', query: '' });
  const [escalateSubmitted, setEscalateSubmitted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isEscalated]);

  if (!isOpen) return null;

  const handleSendMessage = (text) => {
    const userText = text || inputMessage;
    if (!userText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Bot Response Logic
    setTimeout(() => {
      let botReply = '';
      let options = [];
      const lower = userText.toLowerCase();

      if (lower.includes('donar') || lower.includes('aporte') || lower.includes('donate')) {
        botReply = language === 'es'
          ? 'Puedes realizar tu donación solidaria segura en línea directamente en nuestra página. El 100% de los fondos se destina a ayuda humanitaria, víveres y retiros espirituales respaldados por el Centro Carismático Católico de NY.'
          : 'You can make a secure donation directly on our website. 100% of proceeds fund humanitarian relief, grocery supplies, and retreats supported by the Catholic Charismatic Center of NY.';
        options = language === 'es' ? ['Abrir formulario de Donación', '¿Dónde están ubicados?', 'Otra pregunta'] : ['Open Donation form', 'Where are you located?', 'Other question'];
      } else if (lower.includes('ubicad') || lower.includes('direcci') || lower.includes('donde') || lower.includes('located') || lower.includes('address')) {
        botReply = language === 'es'
          ? 'Nuestra sede y cuna espiritual es el Centro Carismático Católico de Nueva York, ubicado en: 📍 826 E. 166th St., Bronx, NY 10459 (Junto a la Parroquia St. Anthony of Padua). Teléfono: (718) 378-1734.'
          : 'Our spiritual home and headquarters is the Catholic Charismatic Center of New York, located at: 📍 826 E. 166th St., Bronx, NY 10459 (Next to St. Anthony of Padua Church). Phone: (718) 378-1734.';
        options = language === 'es' ? ['¿Cuándo son los retiros?', '¿Cómo puedo donar?', 'Hablar con un asesor'] : ['When are the retreats?', 'How to donate?', 'Talk to advisor'];
      } else if (lower.includes('retiro') || lower.includes('oraci') || lower.includes('espiritual') || lower.includes('retreat')) {
        botReply = language === 'es'
          ? 'Organizamos retiros de sanación interior, jornadas de avivamiento carismático y vigilias de oración continua guiadas por la comunidad Isha Bethel y predicadores de la arquidiócesis.'
          : 'We organize inner healing retreats, charismatic revival days, and continuous prayer vigils guided by the Isha Bethel community.';
        options = language === 'es' ? ['Ver Calendario de Retiros', '¿Cómo puedo donar?', 'Hablar con un asesor'] : ['View Retreats Calendar', 'How to donate?', 'Talk to advisor'];
      } else if (lower.includes('ayuda') || lower.includes('solicitar') || lower.includes('necesit') || lower.includes('alimento') || lower.includes('help')) {
        botReply = language === 'es'
          ? 'Brindamos ayuda humanitaria con despensas de alimentos, auxilio ante emergencias, apoyo espiritual y retiros de sanación. También puedes postular un caso vulnerable con nuestro botón "Proponer Causa".'
          : 'We provide humanitarian relief with emergency food boxes, social care, spiritual accompaniment, and retreats.';
        options = language === 'es' ? ['Proponer una Causa', 'Hablar con un asesor', '¿Dónde están ubicados?'] : ['Propose a Cause', 'Talk to advisor', 'Where are you located?'];
      } else if (lower.includes('asesor') || lower.includes('persona') || lower.includes('correo') || lower.includes('contact') || lower.includes('talk')) {
        setIsEscalated(true);
        setEscalateData((prev) => ({ ...prev, query: userText }));
        return;
      } else {
        botReply = language === 'es'
          ? 'Gracias por tu mensaje. Para responderte con exactitud sobre este caso particular, ¿te gustaría que enviemos tu consulta directamente a nuestra pastoral para que te respondan por correo o WhatsApp?'
          : 'Thank you for your message. Would you like us to forward your question directly to our pastoral team so they can reach out to you via email or WhatsApp?';
        options = language === 'es' ? ['Sí, hablar con un asesor', '¿Dónde están ubicados?', '¿Cómo puedo donar?'] : ['Yes, talk to advisor', 'Where are you located?', 'How to donate?'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply,
          quickReplies: options
        }
      ]);
    }, 600);
  };

  const handleQuickReply = (reply) => {
    if (reply.includes('Donación') || reply.includes('Donation')) {
      onDonateClick();
    } else if (reply.includes('Proponer') || reply.includes('Propose')) {
      onNewMissionClick();
    } else if (reply.includes('Retiros') || reply.includes('Retreats')) {
      onClose();
      const heroEl = document.getElementById('home');
      if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
    } else if (reply.includes('asesor') || reply.includes('advisor')) {
      setIsEscalated(true);
    } else {
      handleSendMessage(reply);
    }
  };

  const onDonateClick = () => {
    onClose();
    onOpenDonate();
  };

  const onNewMissionClick = () => {
    onClose();
    onOpenNewMission();
  };

  const handleEscalateSubmit = (e) => {
    e.preventDefault();
    setEscalateSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-brand-teal/30 h-[85vh] sm:h-[600px] flex flex-col">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-slate-950 via-brand-navy to-brand-teal text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-brand-teal-light shadow-inner">
              <Church className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-black text-sm sm:text-base leading-none">
                  {language === 'es' ? 'Asistente Fraterno en Línea' : 'Fraternal Online Assistant'}
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-teal-100 mt-0.5">
                Fundación Manos Abiertas • Centro Carismático NY
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Cerrar chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-[#fbfbfa]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-brand-teal text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>

              {/* Quick Reply Pills */}
              {msg.quickReplies && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.quickReplies.map((qr, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(qr)}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white hover:bg-brand-teal hover:text-white text-slate-700 border border-slate-300 shadow-xs transition-all"
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Formulario de Escalamiento a Correo de la Pastoral */}
          {isEscalated && (
            <div className="p-4 rounded-2xl bg-white border border-brand-teal/40 shadow-md space-y-3 my-2 animate-fadeIn">
              {escalateSubmitted ? (
                <div className="text-center py-4 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h4 className="font-display font-black text-sm text-slate-900">
                    {language === 'es' ? '¡Consulta Enviada a la Pastoral!' : 'Question Sent to Pastoral Team!'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {language === 'es' 
                      ? 'Nos pondremos en contacto contigo a la brevedad al correo/teléfono indicado.' 
                      : 'We will get back to you shortly at your email/phone.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEscalateSubmit} className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{language === 'es' ? 'Enviar tu duda a nuestro equipo pastoral:' : 'Send your question to our pastoral team:'}</span>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder={language === 'es' ? 'Tu Nombre Completo' : 'Your Full Name'}
                    value={escalateData.name}
                    onChange={(e) => setEscalateData({ ...escalateData, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-teal"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Correo Electrónico"
                      value={escalateData.email}
                      onChange={(e) => setEscalateData({ ...escalateData, email: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-teal"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Teléfono / WhatsApp"
                      value={escalateData.phone}
                      onChange={(e) => setEscalateData({ ...escalateData, phone: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-teal"
                    />
                  </div>

                  <textarea
                    rows="2"
                    required
                    placeholder={language === 'es' ? 'Escribe tu consulta o duda...' : 'Write your question or request...'}
                    value={escalateData.query}
                    onChange={(e) => setEscalateData({ ...escalateData, query: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs outline-none focus:border-brand-teal resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-brand-teal hover:bg-brand-teal-dark text-white font-extrabold text-xs shadow-md transition-all"
                  >
                    {language === 'es' ? 'Enviar Consulta por Correo' : 'Send Question via Email'}
                  </button>
                </form>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 flex-shrink-0"
        >
          <input
            type="text"
            placeholder={language === 'es' ? 'Escribe tu duda o pregunta...' : 'Type your question...'}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm outline-none focus:border-brand-teal bg-slate-50"
          />

          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white flex items-center justify-center shadow-md transition-all flex-shrink-0"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
