// Delivery/prep time tiers based on how many pizzas are in an order. Used on
// the Menu and Catering pages (as an informational banner) and in Checkout
// (as a live estimate based on what's actually in the cart). Purely
// informational -- large orders are flagged as "needs discussion" but never
// block checkout.
export const DELIVERY_TIERS = [
  { key: 'small', range: 'Fewer than 5 pizzas', estimate: '~30 minutes', min: 0, max: 4 },
  { key: 'medium', range: '5–15 pizzas', estimate: '~1 hour', min: 5, max: 15 },
  { key: 'large', range: '16–50 pizzas', estimate: '~4 hours', min: 16, max: 50 },
  { key: 'xlarge', range: 'More than 50 pizzas', estimate: 'Needs to be discussed with us first', min: 51, max: Infinity },
];

// Counts only pizza line items (menu item names all start with "Pizza ") --
// salads, drinks, etc. don't count toward the delivery-time tiers.
export function pizzaCountFromItems(items) {
  return items
    .filter((i) => i.name.startsWith('Pizza'))
    .reduce((sum, i) => sum + i.qty, 0);
}

export function getDeliveryTier(pizzaCount) {
  if (!pizzaCount || pizzaCount <= 0) return null;
  return DELIVERY_TIERS.find((t) => pizzaCount >= t.min && pizzaCount <= t.max) || null;
}
