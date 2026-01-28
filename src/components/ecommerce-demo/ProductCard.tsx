"use client";

import React from "react";
import Image from "next/image";
import type { Product } from "./types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice != null && product.compareAtPrice > product.price;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300/80 transition-all duration-300">
      <div className="aspect-square relative bg-[#fafaf9] overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform duration-500">
            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </svg>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide bg-gray-900 text-white rounded-md shadow-sm">
            {product.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold bg-red-500 text-white rounded-md">
            −
            {Math.round(
              (1 - product.price / product.compareAtPrice!) * 100
            )}
            %
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-1.5 tracking-tight line-clamp-2">
          {product.name}
        </h3>
        {(product.rating != null || product.reviewCount != null) && (
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= (product.rating ?? 0)
                      ? "text-amber-400"
                      : "text-gray-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {product.reviewCount != null && (
              <span className="text-xs text-gray-500">({product.reviewCount})</span>
            )}
          </div>
        )}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString("pl-PL")} zł
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {product.compareAtPrice!.toLocaleString("pl-PL")} zł
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="w-full py-3 px-4 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}
