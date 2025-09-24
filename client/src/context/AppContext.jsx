import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api"; // ✅ axios instance

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      toast.error("Failed to load products");
    }
  };

  // ✅ Add Product to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      updated[itemId] = (updated[itemId] || 0) + 1;
      return updated;
    });
    toast.success("Added to Cart");
  };

  // ✅ Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev, [itemId]: quantity };
      return updated;
    });
    toast.success("Cart Updated");
  };

  // ✅ Remove product from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId]) {
        updated[itemId] -= 1;
        if (updated[itemId] <= 0) {
          delete updated[itemId];
        }
      }
      return updated;
    });
    toast.success("Removed from Cart");
  };

  // ✅ Get total cart item count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((a, b) => a + b, 0);
  };

  // ✅ Get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p.id === parseInt(itemId));
      if (product) {
        const price = product.offerPrice || product.price; // ✅ fallback to price
        totalAmount += price * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // ✅ Fetch products when app loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Context value
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Custom hook for consuming context
export const useAppContext = () => {
  return useContext(AppContext);
};
