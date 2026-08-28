// Delivery/prep time tiers based on the total size of an order (every item
// in the cart, not just pizzas -- pizza is what dominates prep time, but the
// whole order still needs to go out together). Used on the Menu and
// Catering pages (as an informational banner) and in Checkout (as a live
// estimate based on what's actually in the cart). Purely informational --
// large orders are flagged as "needs discussion" but never block checkout.
export const DELIVERY_TIERS = [
  { key: 'small', title: 'Small Order', range: 'Fewer than 5 items', estimate: '~30 min', caption: 'prep + delivery', min: 0, max: 4 },
  { key: 'medium', title: 'Medium Order', range: '5–15 items', estimate: '~1 hr', caption: 'prep + delivery', min: 5, max: 15 },
  { key: 'large', title: 'Large Order', range: '16–50 items', estimate: '~4 hrs', caption: 'prep + delivery', min: 16, max: 50 },
  { key: 'xlarge', title: 'Bulk Order', range: 'More than 50 items', estimate: 'Custom', caption: 'contact us first', min: 51, max: Infinity },
];

// Total quantity across every line in the cart -- pizzas, salads, drinks,
// everything counts toward which delivery-time tier an order falls into.
export function totalQuantityFromItems(items) {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function getDeliveryTier(totalQuantity) {
  if (!totalQuantity || totalQuantity <= 0) return null;
  return DELIVERY_TIERS.find((t) => totalQuantity >= t.min && totalQuantity <= t.max) || null;
}
