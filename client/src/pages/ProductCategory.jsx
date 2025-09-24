import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api"; // ✅ axios instance
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const ProductCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/category/${encodeURIComponent(category)}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products for this category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading) {
    return <p className="mt-16 text-center">Loading products...</p>;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-medium mb-6">
        {category.toUpperCase()}
      </h2>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} products={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-primary">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
