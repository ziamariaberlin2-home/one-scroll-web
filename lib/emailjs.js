export const EMAILJS_PUBLIC_KEY = 'fJjxFb00WcpGc9lDX';
export const EMAILJS_SERVICE_ID = 'service_kbchpcs';
export const EMAILJS_RESERVATION_TEMPLATE = 'template_q4vwcwm';
export const EMAILJS_HOST_TEMPLATE = 'template_aul6fwl';

export const WHATSAPP_NUMBER = '4917627705583';
export const CONTACT_EMAIL = 'bringteamtogether@ziamariaberlin.com';

export async function sendEnquiry({ templateId, data }) {
  const emailjs = (await import('@emailjs/browser')).default;
  emailjs.init(EMAILJS_PUBLIC_KEY);
  return emailjs.send(EMAILJS_SERVICE_ID, templateId, data);
}

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
