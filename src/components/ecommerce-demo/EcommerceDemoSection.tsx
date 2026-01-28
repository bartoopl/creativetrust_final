"use client";

import React, { useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import MiniCart from "./MiniCart";
import ProductPageDemo from "./ProductPageDemo";
import type { CartItem, Product } from "./types";

const DEMO_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Kurtka zimowa Classic",
    price: 449,
    description: "Ciepła kurtka na zimę. Materiał wodoodporny.",
    variants: [{ name: "Rozmiar", value: "S" }, { name: "Rozmiar", value: "M" }, { name: "Rozmiar", value: "L" }],
  },
  {
    id: "2",
    name: "Plecak miejski",
    price: 189,
  },
  {
    id: "3",
    name: "Buty sportowe",
    price: 329,
  },
];

const FEATURED_PRODUCT: Product = {
  id: "4",
  name: "Słuchawki bezprzewodowe Pro",
  price: 599,
  description: "Słuchawki z redukcją szumów i długa żywotność baterii. Idealne do pracy i podróży.",
  variants: [{ name: "Kolor", value: "Czarny" }, { name: "Kolor", value: "Biały" }],
};

function productToCartItem(p: Product, quantity = 1): CartItem {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    quantity,
    image: p.image,
  };
}

export default function EcommerceDemoSection() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, productToCartItem(product, quantity)];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  return (
    <section className="w-full py-16 md:py-24 px-6 bg-white">
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            Komponenty e-commerce w Next.js
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Poniżej przykładowe, działające elementy sklepu zbudowane w React i Next.js: karty produktów, strona produktu i koszyk. Możesz dodać produkty do koszyka i zmieniać ilości – wszystko działa po stronie klienta (demo).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Karty produktów (lista)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {DEMO_PRODUCTS.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Strona produktu</h3>
              <ProductPageDemo product={FEATURED_PRODUCT} onAddToCart={addToCart} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Koszyk</h3>
              <MiniCart
                items={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
