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
    console.log("Products:", products);
    console.log("Cart items:", cartItems);

    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => Number(item.id) === Number(key));
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  useEffect(() => {
    if (products.length > 0) {
      getCart();
    }
  }, [products, cartItems]);

  // ✅ FIX: show loader until products are ready
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-primary">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => { navigate(`/products/${product.id}`); scrollTo(0, 0); }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.imageUrl || product.image_url || "/fallback.png"}
                  alt={product.name}
                />
              </div>

              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="flex items-center gap-2">
                  <p>Qty:</p>
                  <select
                    onChange={(e) => updateCartItem(product.id, Number(e.target.value))}
                    value={cartItems[product.id]}
                    className="outline-none"
                  >
                    {Array(10).fill("").map((_, idx) => (
                      <option key={idx} value={idx + 1}>
                        {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center">
              {currency}{(product.offerPrice || product.price) * product.quantity}
            </p>

            <button onClick={() => removeFromCart(product.id)} className="cursor-pointer mx-auto">
              <img src={assets.remove_icon} alt="remove" className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />
        <p className="flex justify-between text-lg font-medium mt-3">
          <span>Total Amount</span>
          <span>{currency}{getCartAmount()}</span>
        </p>
        <button className="w-full py-3 mt-6 bg-primary text-white font-medium hover:bg-primary-dull transition">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
