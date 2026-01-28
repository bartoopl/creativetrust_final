"use client";

import React from "react";
import Image from "next/image";
import type { CartItem } from "./types";

interface MiniCartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function MiniCart({
  items,
  onRemove,
  onUpdateQuantity,
  isOpen = true,
  onClose,
}: MiniCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          Koszyk {totalItems > 0 && `(${totalItems})`}
        </h3>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-700"
            aria-label="Zamknij"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="max-h-72 overflow-y-auto">
        {items.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500 text-sm">
            Koszyk jest pusty. Dodaj produkty z listy obok.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="px-4 py-3 flex gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden relative">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      —
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.price.toLocaleString("pl-PL")} zł × {item.quantity}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="w-7 h-7 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium"
                    aria-label="Zmniejsz"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium"
                    aria-label="Zwiększ"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                  aria-label="Usuń"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Razem:</span>
            <span className="font-semibold text-lg">{total.toLocaleString("pl-PL")} zł</span>
          </div>
          <button
            type="button"
            className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Przejdź do kasy
          </button>
        </div>
      )}
    </div>
  );
}
