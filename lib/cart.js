'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { menuData } from './menuData';

const CartContext = createContext(null);

const STORAGE_KEY = 'zia-maria-cart';

// Categories that count as "a drink" or "a dessert" for the purposes of
// Aunt Zia's suggestion — once one of these is in the cart, we stop nudging.
const DRINK_CATEGORIES = ['Non-Alcoholic Drinks', 'Alcoholic Drinks'];
const DESSERT_CATEGORIES = ['Desserts'];
const SUGGESTIBLE_CATEGORIES = [...DRINK_CATEGORIES, ...DESSERT_CATEGORIES];

export function parsePrice(price) {
  return parseFloat(String(price).replace('€', '').replace(',', '.')) || 0;
}

function loadCart() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function pickSuggestion(currentItems) {
  const pool = menuData.filter(
    (m) => SUGGESTIBLE_CATEGORIES.includes(m.category) && !currentItems.some((i) => i.name === m.name)
  );
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Load any previously saved cart once, on mount, in the browser only.
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Persist every change once we've hydrated (so we don't overwrite a saved
  // cart with an empty one before the initial load runs).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can fail (private browsing, quota, etc.) — cart just won't persist.
    }
  }, [items, hydrated]);

  const addItem = useCallback((item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      const next = existing
        ? prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { name: item.name, price: item.price, category: item.category, image: item.image, qty }];

      const alreadyHasSuggestible = next.some((i) => SUGGESTIBLE_CATEGORIES.includes(i.category));
      if (!SUGGESTIBLE_CATEGORIES.includes(item.category) && !alreadyHasSuggestible) {
        const s = pickSuggestion(next);
        if (s) setSuggestion(s);
      }

      return next;
    });
  }, []);

  const removeItem = useCallback((name) => {
    setItems((prev) => prev.filter((i) => i.name !== name));
  }, []);

  const updateQty = useCallback((name, qty) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.name !== name);
      return prev.map((i) => (i.name === name ? { ...i, qty } : i));
    });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const dismissSuggestion = useCallback(() => setSuggestion(null), []);
  const acceptSuggestion = useCallback(() => {
    setSuggestion((current) => {
      if (current) addItem(current, 1);
      return null;
    });
  }, [addItem]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      count,
      subtotal,
      suggestion,
      dismissSuggestion,
      acceptSuggestion,
      hydrated,
    }),
    [items, addItem, removeItem, updateQty, clearCart, count, subtotal, suggestion, dismissSuggestion, acceptSuggestion, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
