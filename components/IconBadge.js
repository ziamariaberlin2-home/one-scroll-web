// Small reusable icon presentation pieces built on lucide-react, used
// wherever the site used to drop an emoji in as an "icon". Two shapes:
//  - IconChip: a soft color-tinted circle, for feature/why-choose/menu cards.
//  - IconGlyph: a bare colored icon, for inline use (nav pills, buttons).
// Both carry the `icon-pop` class so they animate together with `.card-pop`
// cards on hover (see globals.css) — give the parent card `group` to enable it.

const CHIP_BOX = { sm: 'h-9 w-9', md: 'h-11 w-11', lg: 'h-14 w-14' };
const CHIP_ICON = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' };
const GLYPH_SIZE = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' };

export default function IconChip({ icon: Icon, color = '#5B6E3F', size = 'md', bg, className = '' }) {
  return (
    <span
      className={`icon-pop inline-flex flex-shrink-0 items-center justify-center rounded-full ${CHIP_BOX[size]} ${className}`}
      style={{ backgroundColor: bg || `${color}1F`, color }}
      aria-hidden="true"
    >
      <Icon className={CHIP_ICON[size]} strokeWidth={2.25} />
    </span>
  );
}

export function IconGlyph({ icon: Icon, color = '#5B6E3F', active = false, size = 'md', className = '' }) {
  return (
    <Icon
      className={`icon-pop flex-shrink-0 ${GLYPH_SIZE[size]} ${className}`}
      style={{ color: active ? '#fff' : color }}
      strokeWidth={2.25}
      aria-hidden="true"
    />
  );
}
