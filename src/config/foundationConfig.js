/**
 * CONFIGURACIÓN CENTRAL DE LA FUNDACIÓN MANOS ABIERTAS DE JESÚS & MARÍA
 * 
 * Cuando el cliente te pase el correo oficial definitivo, 
 * solo cámbialo en 'officialEmail' y se actualizará en todos los formularios
 * de contacto, solicitudes de ayuda, propuestas de causas y reseñas de la web.
 */

export const FOUNDATION_CONFIG = {
  name: "Fundación Manos Abiertas de Jesús & María",
  
  // 👉 CORREO CENTRAL DE LA FUNDACIÓN:
  // Todos los mensajes (contacto, nuevas causas, solicitudes de voluntariado y reseñas) llegan aquí:
  officialEmail: "contacto@fundacionmanosabiertas.org",
  
  // Correo para donaciones y Zelle:
  donationsEmail: "donaciones@fundacionmanosabiertas.org",
  
  // Teléfono y WhatsApp oficial:
  phone: "+1 (718) 378-1734",
  
  // Dirección física de nuestra Casa de Ayuda:
  address: "Centro Carismático Católico, 826 E. 166th St., Bronx, NY 10459",
  
  // Enlaces de redes sociales:
  instagramUrl: "https://www.instagram.com",
  facebookUrl: "https://www.facebook.com",
  
  // Redirección de correo de formularios (preparado para Formspree / EmailJS / Mailto):
  formEndpoint: "https://formspree.io/f/contacto@fundacionmanosabiertas.org"
};
