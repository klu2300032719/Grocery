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

  // ✅ Show loading while products are being fetched
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-primary">Loading product...</p>
      </div>
    );
  }

  // ✅ Ensure ID comparison works for string/number
  const product = products.find((item) => Number(item.id) === Number(id));

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-2xl font-medium text-primary">Product not found.</p>
      </div>
    );
  }

  // ✅ Image field fix
  const imageUrl = product.imageUrl || product.image_url || "/fallback.png";

  useEffect(() => {
    if (products.length > 0 && product) {
      const productsCopy = products.filter(
        (item) => product.category === item.category && item.id !== product.id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    if (product) {
      setThumbnail(imageUrl);
    }
  }, [product]);

  return (
    <div className="mt-12">
      {/* Breadcrumbs */}
      <p>
        <Link to={"/"}>Home</Link> /
        <Link to={"/products"}> Products</Link> /
        <span>{product.category}</span> /
        <span className="text-primary"> {product.name}</span>
      </p>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Images */}
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

        {/* Info */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>

          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="md:w-4 w-3.5"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

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

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {(Array.isArray(product.description)
              ? product.description
              : [product.description]
            ).map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product.id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product.id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} products={p} />
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
