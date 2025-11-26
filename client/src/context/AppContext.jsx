import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api"; // axios instance

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

  // Fallback sample data
  const defaultProducts = [
    {
      id: 1,
      name: "Fresh Apples",
      description: "Crisp and sweet apples.",
      price: 150,
      offerPrice: 120,
      category: "Fresh Fruits",
      stockQuantity: 20,
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Basmati Rice",
      description: "Premium long grain rice.",
      price: 200,
      offerPrice: 180,
      category: "Grains & Cereals",
      stockQuantity: 30,
      imageUrl: "https://via.placeholder.com/200",
    },
  ];

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      if (res.data?.length === 0) {
        console.warn("⚠ No products found – Using sample data");
        setProducts(defaultProducts);
      } else {
        setProducts(res.data);
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      toast.error("Failed to load products. Showing sample data.");
      setProducts(defaultProducts); // fallback
    }
  };

  // Add Product to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success("Added to Cart");
  };

  // Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
    toast.success("Cart Updated");
  };

  // Remove product from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      updated[itemId] = (updated[itemId] || 0) - 1;

      if (updated[itemId] <= 0) delete updated[itemId];
      return updated;
    });
    toast.success("Removed from Cart");
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p.id === parseInt(itemId));
      if (product) {
        const price = product.offerPrice || product.price;
        total += price * cartItems[itemId];
      }
    }
    return Math.floor(total * 100) / 100;
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

// Custom Hook
export const useAppContext = () => useContext(AppContext);
