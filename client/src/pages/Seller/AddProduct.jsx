import React, { useState } from "react";
import axios from "axios";

function AddProduct({ username }) {
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState([""]);
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([""]);

  // ✅ Add new description field
  const handleAddDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const handleChangeDescription = (value, index) => {
    const newDesc = [...descriptions];
    newDesc[index] = value;
    setDescriptions(newDesc);
  };

  // ✅ Add new image field
  const handleAddImage = () => {
    setImages([...images, ""]);
  };

  const handleChangeImage = (value, index) => {
    const newImgs = [...images];
    newImgs[index] = value;
    setImages(newImgs);
  };

  // ✅ Submit product to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description: descriptions.filter((d) => d.trim() !== ""),
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      category,
      image: images.filter((img) => img.trim() !== ""),
    };

    try {
      const response = await axios.post(
        `http://localhost:2025/products/add/${username}`, // ✅ fixed port
        productData
      );
      alert("Product added successfully!");
      console.log(response.data);

      // Reset form after submit
      setName("");
      setDescriptions([""]);
      setPrice("");
      setStockQuantity("");
      setCategory("");
      setImages([""]);
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Descriptions */}
        <h4>Descriptions</h4>
        {descriptions.map((desc, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Description ${idx + 1}`}
            value={desc}
            onChange={(e) => handleChangeDescription(e.target.value, idx)}
            required={idx === 0}
          />
        ))}
        <button type="button" onClick={handleAddDescription}>
          + Add Description
        </button>

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />

        {/* Category */}
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        {/* Images */}
        <h4>Images</h4>
        {images.map((img, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Image URL ${idx + 1}`}
            value={img}
            onChange={(e) => handleChangeImage(e.target.value, idx)}
            required={idx === 0}
          />
        ))}
        <button type="button" onClick={handleAddImage}>
          + Add Image
        </button>

        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
