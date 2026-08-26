// Central icon + color registry. Replaces the old emoji-as-icon convention
// with a real icon set (lucide-react) so every icon is crisp at any size and
// themeable. Each entry gets its own distinct, curated color rather than one
// flat brand tint, so the icon row reads as colorful and legible at a glance
// — while every color here is still hand-picked to sit comfortably next to
// the site's wine/olive/cream palette rather than clashing with it.
import {
  Flame,
  Sprout,
  Leaf,
  Beef,
  Fish,
  Salad,
  Droplet,
  CupSoda,
  Wine,
  CakeSlice,
  Pizza,
  Truck,
  PartyPopper,
  ClipboardList,
  Zap,
  FileEdit,
  Timer,
  Sparkles,
  BadgeEuro,
  MapPin,
  Repeat,
  Receipt,
  MessageSquare,
  ChefHat,
  Briefcase,
  Heart,
  Cake,
  Users,
} from 'lucide-react';

// Menu category → icon + color, keyed the same as menuData's category names.
export const CATEGORY_ICONS = {
  'Most Ordered': { Icon: Flame, color: '#E2572B' },
  'Vegan Pizzas': { Icon: Sprout, color: '#3F7A4E' },
  'Vegetarian Pizzas': { Icon: Leaf, color: '#8DA33C' },
  'Meat Pizzas': { Icon: Beef, color: '#8B4B2E' },
  'Fish Pizzas': { Icon: Fish, color: '#2F7A9B' },
  'Salads': { Icon: Salad, color: '#3F9C6B' },
  'Dipping Oils': { Icon: Droplet, color: '#A68A2E' },
  'Non-Alcoholic Drinks': { Icon: CupSoda, color: '#2E93A6' },
  'Alcoholic Drinks': { Icon: Wine, color: '#7B2D5C' },
  'Desserts': { Icon: CakeSlice, color: '#C9793A' },
};

// Catering / feature-list icons, shared across the homepage catering
// section and the dedicated catering page.
export const FEATURE_ICONS = {
  pizza: { Icon: Pizza, color: '#C53416' },
  vegan: { Icon: Sprout, color: '#3F7A4E' },
  delivery: { Icon: Truck, color: '#2F7A9B' },
  celebration: { Icon: PartyPopper, color: '#9A3F7A' },
  quote: { Icon: FileEdit, color: '#A68A2E' },
  staffing: { Icon: ClipboardList, color: '#5B6E3F' },
  fast: { Icon: Zap, color: '#C9793A' },
};

// Catering "occasions" grid icons.
export const OCCASION_ICONS = {
  office: { Icon: Briefcase, color: '#2F7A9B' },
  wedding: { Icon: Heart, color: '#9A3F7A' },
  birthday: { Icon: Cake, color: '#C9793A' },
  team: { Icon: Users, color: '#5B6E3F' },
};

// "Why choose us" point icons.
export const WHY_ICONS = {
  dough: { Icon: Timer, color: '#8B4B2E' },
  fresh: { Icon: Sparkles, color: '#3F7A4E' },
  price: { Icon: BadgeEuro, color: '#C53416' },
  location: { Icon: MapPin, color: '#2E93A6' },
};

// Business-lunch perks / steps icons.
export const BIZ_ICONS = {
  recurring: { Icon: Repeat, color: '#5B6E3F' },
  delivery: { Icon: Truck, color: '#2F7A9B' },
  invoice: { Icon: Receipt, color: '#C9793A' },
  vegan: { Icon: Sprout, color: '#3F7A4E' },
  headcount: { Icon: MessageSquare, color: '#C53416' },
  build: { Icon: ChefHat, color: '#5B6E3F' },
  deliver: { Icon: Truck, color: '#2F7A9B' },
  classic: { Icon: Pizza, color: '#C53416' },
  green: { Icon: Salad, color: '#3F9C6B' },
  hearty: { Icon: Flame, color: '#E2572B' },
};

export { Pizza };
