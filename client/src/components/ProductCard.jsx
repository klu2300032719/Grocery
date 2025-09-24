import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ products }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  if (!products) return null;

  // ✅ Handle both snake_case and camelCase
  const imageUrl = products.imageUrl || products.image_url || "/fallback.png";

  return (
    <div
      onClick={() => {
        navigate(`/products/${products.id}`);
        scrollTo(0, 0);
      }}
      className="flex flex-col h-full border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full"
    >
      {/* Product Image */}
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-h-40 object-contain"
          src={imageUrl}
          alt={products.name || "Product"}
        />
      </div>

      {/* Product Info */}
      <div className="text-gray-500/60 text-sm flex flex-col flex-1 mt-2">
        <p>{products.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {products.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <img
                key={i}
                className="md:w-3.5 w-3"
                src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                alt=""
              />
            ))}
          <p>(4)</p>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-end justify-between mt-auto">
          <p className="md:text-xl text-base font-medium text-primary">
            {currency}
            {products.offerPrice || products.offer_price || products.price}{" "}
            {(products.offerPrice || products.offer_price) && (
              <span className="text-gray-500/60 md:text-sm text-xs line-through">
                {currency}
                {products.price}
              </span>
            )}
          </p>

          {/* Cart Buttons */}
          <div onClick={(e) => e.stopPropagation()} className="text-primary">
            {!cartItems[products.id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer"
                onClick={() => addToCart(products.id)}
              >
                <img src={assets.cart_icon} alt="cart_icon" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                <button
                  onClick={() => removeFromCart(products.id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">
                  {cartItems[products.id]}
                </span>
                <button
                  onClick={() => addToCart(products.id)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
