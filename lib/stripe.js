import Stripe from 'stripe';

// Lazily-constructed Stripe client, server-side only. STRIPE_SECRET_KEY must
// be set as an environment variable in the hosting platform (Vercel project
// settings) — never hardcoded here and never exposed to the client.
let stripeInstance = null;

export function getStripe() {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set. Add it in your Vercel project\'s Environment Variables.');
    }
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
}
