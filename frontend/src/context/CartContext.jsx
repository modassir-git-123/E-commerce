import {
  createContext, useContext, useState, useEffect, createRef
} from "react";
import {authFetch, getAccessToken} from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart from Django
  const fetchCart = async () => {
    try {
      const res = await authFetch(`${BASEURL}/api/cart/`);

      const data = await res.json();

      console.log("Cart data:", data);

      setCartItems(data.items || []);
      setTotal(data.total || 0);

    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Fetch cart when application starts
  useEffect(() => {
    fetchCart();
  }, []);

  // Add product to cart
const addToCart = async (product) => {
  try {
    console.log("Adding product:", product);

    const res = await authFetch(`${BASEURL}/api/cart/add/`, {
      method: "POST",
      body: JSON.stringify({
        product_id: product.id,
      }),
    });

    const data = await res.json();

    console.log("Cart status:", res.status);
    console.log("Cart response:", data);

    if (!res.ok) {
      throw new Error(
        data.error || data.detail || "Failed to add product to cart"
      );
    }

    await fetchCart();

    console.log("Product added successfully");
  } catch (error) {
    console.error("Add to cart error:", error);
  }
};
  // Remove product from cart
  const removeFromCart = async (itemId) => {
    try {
      const res = await authFetch(`${BASEURL}/api/cart/remove/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: itemId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      await fetchCart();

    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };


  // Update quantity
  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const res = await authFetch(`${BASEURL}/api/cart/update/`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          item_id: itemId,
          quantity: quantity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }

      await fetchCart();

    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart=()=>{
    setCartItems([]);
    setTotal(0);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);