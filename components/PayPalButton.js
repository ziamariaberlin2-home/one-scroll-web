'use client';

import { useEffect, useRef, useState } from 'react';

// PayPal sandbox test Client ID. This renders real, working PayPal Smart
// Buttons in PayPal's sandbox/test environment. Swap in your live Client ID
// from https://developer.paypal.com/dashboard/applications/live before
// accepting real payments.
const PAYPAL_CLIENT_ID = 'sb';

export default function PayPalButton({ amount, onSuccess, disabled }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    if (disabled || !amount || amount <= 0) return undefined;

    let cancelled = false;
    setStatus('loading');

    function renderButtons() {
      if (cancelled || !containerRef.current || !window.paypal) return;
      containerRef.current.innerHTML = '';
      try {
        window.paypal
          .Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'pill', label: 'paypal' },
            createOrder: (data, actions) =>
              actions.order.create({
                purchase_units: [
                  { amount: { value: amount.toFixed(2), currency_code: 'EUR' } },
                ],
              }),
            onApprove: async (data, actions) => {
              const details = await actions.order.capture();
              if (!cancelled) onSuccess?.(details);
            },
            onError: () => {
              if (!cancelled) setStatus('error');
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
  }, [amount, disabled, onSuccess]);

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
          PayPal couldn&rsquo;t load right now. Please use &ldquo;Order via WhatsApp&rdquo; below, or reload the page.
        </p>
      )}
    </div>
  );
}
