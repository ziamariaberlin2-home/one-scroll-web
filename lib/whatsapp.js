// Server-side WhatsApp Business Cloud API helper (Meta's official API), used
// to push a real-time "new order" alert to the business owner's WhatsApp --
// unlike the customer-facing wa.me links elsewhere on the site, this sends
// automatically, with nobody needing to tap "send".
//
// Setup (one-time, in the Meta developer dashboard):
//   1. Create a Meta Business app -> add the "WhatsApp" product.
//   2. Under WhatsApp > API Setup, note the "Phone number ID" (NOT the
//      phone number itself) -> WHATSAPP_PHONE_NUMBER_ID.
//   3. Generate a permanent access token (System User token, in Meta
//      Business Settings > System Users -> Generate Token, with
//      whatsapp_business_messaging permission) -> WHATSAPP_ACCESS_TOKEN.
//   4. Under WhatsApp > Message Templates, create a template (category:
//      Utility) with a single body variable, e.g.:
//        Name: order_alert
//        Body: "New Zia Maria order:\n{{1}}"
//      Submit for approval (usually minutes for a simple utility template)
//      -> WHATSAPP_TEMPLATE_NAME (and WHATSAPP_TEMPLATE_LANG, e.g. "en_US",
//      matching whatever language you created the template in).
//   5. WHATSAPP_OWNER_NUMBER is the number that should receive the alert,
//      in international format with no "+" or spaces (e.g. "4915172487397").
//      It must be added as a verified recipient while the app is in
//      Development mode, or the WhatsApp number itself upgraded to Live.
// All five env vars are set directly in Vercel -- nothing WhatsApp-related
// is ever exposed to the browser.
const GRAPH_API_VERSION = 'v21.0';

function getConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const ownerNumber = process.env.WHATSAPP_OWNER_NUMBER;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLang = process.env.WHATSAPP_TEMPLATE_LANG || 'en_US';
  if (!accessToken || !phoneNumberId || !ownerNumber || !templateName) {
    return null;
  }
  return { accessToken, phoneNumberId, ownerNumber, templateName, templateLang };
}

// Sends the approved template message with `bodyText` as its one variable.
// Returns { sent: false, reason } when WhatsApp isn't configured yet instead
// of throwing, so callers can no-op gracefully (same pattern as PayPal
// before credentials are set).
export async function sendWhatsAppOrderAlert(bodyText) {
  const config = getConfig();
  if (!config) {
    return { sent: false, reason: 'WhatsApp Business API is not configured yet.' };
  }

  const { accessToken, phoneNumberId, ownerNumber, templateName, templateLang } = config;
  const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: ownerNumber,
      type: 'template',
      template: {
        name: templateName,
        language: { code: templateLang },
        components: [
          {
            type: 'body',
            parameters: [{ type: 'text', text: bodyText.slice(0, 1024) }],
          },
        ],
      },
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.error?.message || `WhatsApp API error (${res.status})`;
    return { sent: false, reason: message };
  }
  return { sent: true, id: data?.messages?.[0]?.id };
}
