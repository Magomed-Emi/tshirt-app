import { useState, useEffect } from "react";

export default function useCart() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("panier");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (produit) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === produit.id);
      if (existing) {
        return prev.map((p) =>
          p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p
        );
      } else {
        return [...prev, { ...produit, quantite: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantite) => {
    if (quantite <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantite } : p))
    );
  };

  const clearCart = () => setCart([]);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
}
