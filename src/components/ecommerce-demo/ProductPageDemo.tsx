"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Product } from "./types";

interface ProductPageDemoProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductPageDemo({ product, onAddToCart }: ProductPageDemoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.value ?? "");

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="aspect-square md:aspect-auto md:min-h-[280px] relative bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
          <p className="text-2xl font-bold text-black mb-4">{product.price.toLocaleString("pl-PL")} zł</p>
          {product.description && (
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          )}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Wariant</label>
              <select
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {product.variants.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.name}: {v.value}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Zmniejsz ilość"
              >
                −
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Zwiększ ilość"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 min-w-[140px] py-2.5 px-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
