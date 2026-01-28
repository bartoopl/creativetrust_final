"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Product } from "./types";

interface ProductPageDemoProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const VALUE_ICONS = {
  quality: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  eco: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C8 6 6 10 6 14c0 3.314 2.686 6 6 6s6-2.686 6-6c0-4-2-8-6-12z" />
    </svg>
  ),
  craft: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  curated: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
};

export default function ProductPageDemo({ product, onAddToCart }: ProductPageDemoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.value ?? "");
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

  const hasDiscount = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const thumbnails = product.variants ?? [];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-lg shadow-gray-200/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Lewa kolumna – zdjęcie + miniatury */}
        <div className="relative bg-[#fafaf9] p-6 lg:p-8">
          <div className="aspect-square max-w-xl mx-auto relative rounded-xl overflow-hidden bg-gray-100">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                </svg>
              </div>
            )}
            {product.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-gray-900 text-white rounded-md">
                {product.badge}
              </span>
            )}
          </div>
          {thumbnails.length > 0 && (
            <div className="flex gap-2 mt-4 justify-center flex-wrap">
              {thumbnails.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => setSelectedVariant(v.value)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all ${
                    selectedVariant === v.value
                      ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  title={v.value}
                >
                  {v.hex ? (
                    <span className="block w-full h-full" style={{ backgroundColor: v.hex }} />
                  ) : (
                    <span className="block w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                      {v.value.slice(0, 1)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Prawa kolumna – info + CTA + accordion + value bar */}
        <div className="p-6 lg:p-8 flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
            {product.name}
          </h1>

          {(product.rating != null || product.reviewCount != null) && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= (product.rating ?? 0) ? "text-amber-400" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {product.reviewCount != null && (
                <span className="text-sm text-gray-500">({product.reviewCount} opinii)</span>
              )}
            </div>
          )}

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {product.price.toLocaleString("pl-PL")} zł
            </span>
            {hasDiscount && (
              <span className="text-lg text-gray-400 line-through">
                {product.compareAtPrice!.toLocaleString("pl-PL")} zł
              </span>
            )}
          </div>

          {/* Swatche kolorów (jeśli są z hex) */}
          {product.variants?.some((v) => v.hex) && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Kolor: {selectedVariant}</p>
              <div className="flex gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.value}
                    type="button"
                    onClick={() => setSelectedVariant(v.value)}
                    className={`w-8 h-8 rounded-full border-2 overflow-hidden transition-all ${
                      selectedVariant === v.value ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2" : "border-gray-200"
                    }`}
                    title={v.value}
                  >
                    {v.hex ? (
                      <span className="block w-full h-full" style={{ backgroundColor: v.hex }} />
                    ) : (
                      <span className="block w-full h-full bg-gray-200" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 min-w-[140px] py-3 px-5 border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Dodaj do koszyka
            </button>
            <button
              type="button"
              onClick={() => onAddToCart(product, quantity)}
              className="flex-1 min-w-[140px] py-3 px-5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
            >
              Kup teraz
            </button>
            <button
              type="button"
              onClick={() => setWishlisted(!wishlisted)}
              className="p-3 rounded-xl border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
              aria-label="Ulubione"
            >
              <svg
                className={`w-5 h-5 ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                fill={wishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="space-y-2 mb-6">
            {product.deliveryInfo && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" />
                </svg>
                {product.deliveryInfo}
              </div>
            )}
            {product.giftWrapAvailable && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                Dostępne opakowanie na prezent
              </div>
            )}
          </div>

          {/* Ilość (opcjonalnie – można zostawić lub dodać) */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-gray-700">Ilość:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Zmniejsz"
              >
                −
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                aria-label="Zwiększ"
              >
                +
              </button>
            </div>
          </div>

          {/* Accordion */}
          {product.accordion && product.accordion.length > 0 && (
            <div className="border-t border-gray-100 pt-6 space-y-0 mb-6">
              {product.accordion.map((item) => {
                const isOpen = expandedAccordion === item.title;
                return (
                  <div key={item.title} className="border-b border-gray-100 last:border-0">
                    <button
                      type="button"
                      onClick={() => setExpandedAccordion(isOpen ? null : item.title)}
                      className="w-full py-4 flex items-center justify-between text-left text-sm font-medium text-gray-900 hover:text-gray-700"
                    >
                      {item.title}
                      <span className={`text-gray-400 transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm text-gray-600 leading-relaxed">{item.content}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Value bar – żółte tło, ikony + etykiety */}
          {product.valueProps && product.valueProps.length > 0 && (
            <div className="mt-auto bg-[#fef9e7] rounded-xl p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {product.valueProps.map((vp) => (
                <div key={vp.label} className="flex flex-col items-center text-center gap-1">
                  <span className="text-gray-700">
                    {VALUE_ICONS[vp.icon]}
                  </span>
                  <span className="text-xs font-medium text-gray-700">{vp.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
