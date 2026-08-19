// Small pizza illustration, used in place of the word "pizza" in a few UI
// spots (calculator teasers, callouts). Emoji rather than custom SVG, so it
// reads unambiguously as a pizza at small inline sizes.
export default function PizzaIcon({ className = '' }) {
  return (
    <span className={`text-base ${className}`} role="img" aria-label="pizza">
      🍕
    </span>
  );
}
