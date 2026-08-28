// Server-side PayPal REST API helper. Mirrors lib/stripe.js's pattern: reads
// credentials from environment variables set in Vercel, never hardcoded.
// NEXT_PUBLIC_PAYPAL_CLIENT_ID is the only piece that also reaches the
// browser (required to render the PayPal button) -- it identifies the app,
// it isn't a secret. PAYPAL_SECRET stays server-only. PAYPAL_ENV picks
// sandbox vs live ('sandbox' unless explicitly set to 'live'), so flipping
// to real payments later is a Vercel env var change, not a code change.
const PAYPAL_ENV = process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox';
const PAYPAL_API_BASE =
  PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

function getCredentials() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  if (!clientId || !secret) {
    throw new Error(
      "PayPal credentials are not set. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID and PAYPAL_SECRET in your Vercel project's Environment Variables."
    );
  }
  return { clientId, secret };
}

// Fetches a short-lived OAuth2 access token via the client-credentials grant.
// Not cached across requests -- Vercel functions are short-lived anyway, and
// one token fetch per checkout action is well within PayPal's rate limits.
async function getAccessToken() {
  const { clientId, secret } = getCredentials();
  const basicAuth = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) {
    throw new Error(`PayPal auth failed (${res.status})`);
  }
  const data = await res.json();
  return data.access_token;
}

// Authenticated fetch against the PayPal REST API. Throws with PayPal's own
// error message/details when the response isn't ok, so route handlers can
// surface something useful without leaking credentials.
export async function paypalFetch(path, options = {}) {
  const accessToken = await getAccessToken();
  const res = await fetch(`${PAYPAL_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || data?.details?.[0]?.description || `PayPal API error (${res.status})`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export { PAYPAL_ENV };
