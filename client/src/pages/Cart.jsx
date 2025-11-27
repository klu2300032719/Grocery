import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);

  const getCart = () => {
    const tempArray = [];

    for (const itemId in cartItems) {
      const product =
        products.find((p) => String(p.id) === String(itemId)) ||
        products.find((p) => String(p.productId) === String(itemId)) ||
        products.find((p) => String(p._id) === String(itemId));

      if (product) {
        tempArray.push({ ...product, quantity: cartItems[itemId] });
      }
    }

    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0) getCart();
  }, [products, cartItems]);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-primary">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-16 gap-8">
      {/* LEFT CART ITEMS */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        {/* HEADER */}
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b border-gray-300">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {/* CART ITEMS */}
        {cartArray.map((product, index) => {
          const imageUrl =
            product.imageUrl || product.image_url || "/fallback.png";

          return (
            <div
              key={index}
              className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium py-4 border-b border-gray-200"
            >
              {/* PRODUCT DETAILS */}
              <div className="flex items-center gap-6">
                <div
                  onClick={() => navigate(`/products/${product.id || product.productId || product._id}`)}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden bg-gray-50"
                >
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={imageUrl}
                    alt={product.name}
                  />
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {currency}{product.offerPrice || product.offer_price || product.price} each
                  </p>
                </div>
              </div>

              {/* PRICE */}
              <p className="text-center font-medium">
                {currency}
                {(product.offerPrice || product.offer_price || product.price) *
                  product.quantity}
              </p>

              {/* REMOVE BUTTON */}
              <div className="flex justify-center">
                <button
                  onClick={() => removeFromCart(product.id || product.productId || product._id)}
                  className="cursor-pointer hover:bg-red-50 p-2 rounded"
                >
                  <img src={assets.remove_icon} alt="remove" className="w-6 h-6" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ORDER SUMMARY */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border border-gray-300/70 rounded-lg h-fit">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>

        <div className="space-y-3 mb-4">
          <p className="flex justify-between text-gray-600">
            <span>Items ({getCartCount()})</span>
            <span>{currency}{getCartAmount()}</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between text-gray-600">
            <span>Tax (2%)</span>
            <span>{currency}{(getCartAmount() * 0.02).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
