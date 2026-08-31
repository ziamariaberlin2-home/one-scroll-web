export const EMAILJS_PUBLIC_KEY = 'fJjxFb00WcpGc9lDX';
export const EMAILJS_SERVICE_ID = 'service_kbchpcs';
export const EMAILJS_RESERVATION_TEMPLATE = 'template_q4vwcwm';
export const EMAILJS_HOST_TEMPLATE = 'template_aul6fwl';
// Order pickup/delivery confirmations moved off EmailJS -- they're now sent
// server-side via Resend (see lib/resend.js and
// app/api/send-order-confirmation/route.js), called from Checkout.js. This
// avoided both EmailJS's free-tier template-count limit and matches the
// server-verified pattern already used for PayPal and the WhatsApp alert.
// Reservations and catering/business-lunch enquiries above still use
// EmailJS as before.

export const WHATSAPP_NUMBER = '4915172487397';
export const CONTACT_EMAIL = 'bringteamtogether@ziamariaberlin.com';

export async function sendEnquiry({ templateId, data }) {
  const emailjs = (await import('@emailjs/browser')).default;
  emailjs.init(EMAILJS_PUBLIC_KEY);
  return emailjs.send(EMAILJS_SERVICE_ID, templateId, data);
}

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
