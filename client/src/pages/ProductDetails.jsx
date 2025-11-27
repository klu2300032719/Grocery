import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-primary">Loading product...</p>
      </div>
    );
  }

  const product = products.find((item) => Number(item.id) === Number(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-primary">Product not found.</p>
      </div>
    );
  }

  const imageUrl = product.imageUrl || product.image_url || "/fallback.png";

  useEffect(() => {
    if (products.length > 0 && product) {
      const related = products.filter(
        (item) => item.category === product.category && item.id !== product.id
      );
      setRelatedProducts(related.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    if (product) setThumbnail(imageUrl);
  }, [product]);

  return (
    <div className="mt-12">
      <p>
        <Link to={"/"}>Home</Link> /
        <Link to={"/products"}> Products</Link> /
        <span>{product.category}</span> /
        <span className="text-primary"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            <div
              onClick={() => setThumbnail(imageUrl)}
              className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
            >
              <img src={imageUrl} alt="Product" />
            </div>
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail}
              alt="Selected product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="mt-6">
            {product.offerPrice || product.offer_price ? (
              <>
                <p className="text-gray-500/70 line-through">
                  MRP: {currency}
                  {product.price}
                </p>
                <p className="text-2xl font-medium">
                  MRP: {currency}
                  {product.offerPrice || product.offer_price}
                </p>
              </>
            ) : (
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.price}
              </p>
            )}
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <button
            onClick={() => addToCart(product.id)}
            className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition mt-10"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20">
        <p className="text-3xl font-medium">Related Products</p>
        <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} products={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
