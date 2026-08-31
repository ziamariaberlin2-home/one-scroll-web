// Server-side order-confirmation email via Resend (resend.com). Replaces the
// EmailJS-based order confirmation -- EmailJS is still used for the
// Reservation and Catering/Business Lunch enquiry forms (see lib/emailjs.js),
// but the order confirmation moved here because it's sent from the same
// trusted backend that already verifies PayPal orders and pushes the
// WhatsApp owner alert, rather than being triggered from the browser.
//
// Setup (one-time):
//   1. Sign up at resend.com and add RESEND_API_KEY to Vercel's Environment
//      Variables (Settings -> Environment Variables). Never hardcoded here.
//   2. Add and verify a sending domain: Resend dashboard -> Domains -> Add
//      Domain -> ziamariaberlin.com -> add the SPF/DKIM DNS records it gives
//      you wherever that domain's DNS is managed. This is independent of
//      where the site itself is hosted -- the domain doesn't need to be
//      live yet for its email DNS records to verify.
//   3. Until RESEND_API_KEY is set (or the domain isn't verified yet),
//      sendOrderConfirmationEmail() no-ops gracefully, same pattern as
//      PayPal/WhatsApp before their credentials were configured.
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || 'Zia Maria <orders@ziamariaberlin.com>';

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Builds the confirmation email body from the same order-data shape already
// used for the WhatsApp owner alert (see app/api/notify-order/route.js) --
// name, phone, email, fulfillment, date, time, address, items, subtotal,
// notes, readyEstimate, via.
function buildEmail({ name, fulfillment, date, time, address, items, subtotal, notes, readyEstimate, via }) {
  const itemLines = (items || '')
    .split('\n')
    .filter(Boolean)
    .map((line) => `<li style="padding:4px 0;color:#3a2620;">${escapeHtml(line)}</li>`)
    .join('');

  const addressRow =
    fulfillment === 'Delivery' && address && address !== '—'
      ? `<p style="margin:4px 0;color:#3a2620;"><strong>Address:</strong> ${escapeHtml(address)}</p>`
      : '';
  const notesRow =
    notes && notes !== '—' ? `<p style="margin:4px 0;color:#3a2620;"><strong>Notes:</strong> ${escapeHtml(notes)}</p>` : '';

  const html = `
    <div style="font-family:Georgia,'Times New Roman',serif;max-width:480px;margin:0 auto;background:#fffaf5;padding:32px 28px;border-radius:16px;">
      <p style="text-transform:uppercase;letter-spacing:0.15em;font-size:11px;color:#a8412f;margin:0 0 8px;">Order Confirmed</p>
      <h1 style="font-size:24px;color:#7a2b20;margin:0 0 16px;">Thanks${name ? `, ${escapeHtml(name)}` : ''}!</h1>
      <p style="color:#3a2620;margin:0 0 20px;">
        Your order will be ready in about <strong>${escapeHtml(readyEstimate || 'shortly')}</strong>.
      </p>
      <div style="background:#ffffff;border:1px solid rgba(58,38,32,0.1);border-radius:12px;padding:20px;margin-bottom:20px;">
        <p style="margin:4px 0;color:#3a2620;"><strong>${escapeHtml(fulfillment || 'Pickup')}</strong>${date ? ` on ${escapeHtml(date)}` : ''}${time ? ` at ${escapeHtml(time)}` : ''}</p>
        ${addressRow}
        <ul style="list-style:none;padding:0;margin:12px 0 0;border-top:1px solid rgba(58,38,32,0.08);padding-top:12px;">${itemLines}</ul>
        <p style="margin:12px 0 0;padding-top:12px;border-top:1px solid rgba(58,38,32,0.08);color:#7a2b20;font-weight:bold;">Total: ${escapeHtml(subtotal || '')}</p>
        ${notesRow}
      </div>
      <p style="color:#3a2620;font-size:13px;margin:0;">
        Questions about your order? Just reply to this email or message us on WhatsApp.
      </p>
      <p style="color:#8a7a72;font-size:11px;margin:24px 0 0;">Zia Maria &middot; Berlin</p>
    </div>
  `.trim();

  const text = [
    `Thanks${name ? `, ${name}` : ''}!`,
    `Your order will be ready in about ${readyEstimate || 'shortly'}.`,
    '',
    `${fulfillment || 'Pickup'}${date ? ` on ${date}` : ''}${time ? ` at ${time}` : ''}`,
    fulfillment === 'Delivery' && address && address !== '—' ? `Address: ${address}` : null,
    '',
    items || '',
    `Total: ${subtotal || ''}`,
    notes && notes !== '—' ? `Notes: ${notes}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');

  return { html, text };
}

// Returns { sent: false, reason } instead of throwing when Resend isn't
// configured yet, so Checkout.js can no-op gracefully -- same pattern as
// PayPal and WhatsApp before their credentials were set.
export async function sendOrderConfirmationEmail(order) {
  if (!RESEND_API_KEY) {
    return { sent: false, reason: 'Resend is not configured yet (missing RESEND_API_KEY).' };
  }
  if (!order?.email) {
    return { sent: false, reason: 'No customer email address on this order.' };
  }

  const { html, text } = buildEmail(order);

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: order.email,
      subject: 'Your Zia Maria order confirmation',
      html,
      text,
    });
    if (error) {
      return { sent: false, reason: error.message || 'Resend API error.' };
    }
    return { sent: true, id: data?.id };
  } catch (err) {
    return { sent: false, reason: err?.message || 'Resend send failed.' };
  }
}
