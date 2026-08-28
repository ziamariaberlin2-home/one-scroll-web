'use client';

import { useEffect, useRef, useState } from 'react';

// Client ID only identifies the app to PayPal -- it isn't a secret, but it
// now comes from an env var (NEXT_PUBLIC_PAYPAL_CLIENT_ID, set in Vercel)
// instead of being hardcoded, so switching sandbox -> live is a Vercel
// settings change, not a code change. The order itself is created and
// captured server-side (see lib/paypal.js and app/api/paypal/*/route.js) --
// this component never computes or sends a total, only item names/quantities.
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function PayPalButton({ items, onSuccess, disabled }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [payError, setPayError] = useState('');

  useEffect(() => {
    if (disabled || !items || items.length === 0) return undefined;

    if (!PAYPAL_CLIENT_ID) {
      setStatus('error');
      setPayError('PayPal is not configured yet.');
      return undefined;
    }

    let cancelled = false;
    setStatus('loading');
    setPayError('');

    function renderButtons() {
      if (cancelled || !containerRef.current || !window.paypal) return;
      containerRef.current.innerHTML = '';
      try {
        window.paypal
          .Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'paypal' },
            // Asks our own backend to create the order -- it looks up real
            // menu prices and computes the total server-side, so nothing
            // the browser sends is ever trusted as the amount to charge.
            createOrder: async () => {
              const res = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items }),
              });
              const data = await res.json();
              if (!res.ok || !data.id) {
                throw new Error(data.error || 'Could not start PayPal checkout.');
              }
              return data.id;
            },
            // The buyer has approved in the PayPal popup -- this asks our
            // backend to capture (actually charge) that same order.
            onApprove: async (data) => {
              const res = await fetch('/api/paypal/capture-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderID: data.orderID }),
              });
              const result = await res.json();
              if (!res.ok || result.status !== 'COMPLETED') {
                throw new Error(result.error || 'Payment could not be completed.');
              }
              if (!cancelled) onSuccess?.(result);
            },
            onError: () => {
              if (!cancelled) {
                setStatus('error');
                setPayError('PayPal ran into a problem. Please try again.');
              }
            },
          })
          .render(containerRef.current);
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    if (window.paypal) {
      renderButtons();
    } else {
      const existing = document.getElementById('paypal-sdk');
      if (existing) {
        existing.addEventListener('load', renderButtons);
        existing.addEventListener('error', () => !cancelled && setStatus('error'));
      } else {
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=EUR&intent=capture`;
        script.addEventListener('load', renderButtons);
        script.addEventListener('error', () => !cancelled && setStatus('error'));
        document.body.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, disabled, onSuccess]);

  if (disabled) {
    return (
      <p className="rounded-full border border-cream/15 px-4 py-3 text-center text-xs text-cream/40">
        Fill in your details above to enable PayPal checkout.
      </p>
    );
  }

  return (
    <div>
      <div ref={containerRef} />
      {status === 'loading' && <p className="text-center text-xs text-cream/40">Loading PayPal…</p>}
      {status === 'error' && (
        <p className="text-center text-xs text-sand">
          {payError || 'PayPal couldn’t load right now. Please use “Order via WhatsApp” below, or reload the page.'}
        </p>
      )}
    </div>
  );
}
