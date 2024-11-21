import React, { useState, useRef } from 'react';
import './index.css';
import Cookies from 'js-cookie';

const FarmersHome = () => {
  const [formData, setFormData] = useState({
    name: '',
    farmer: '',
    price: '',
    unit: '',
    quality: '', // Add quality field
    image: null,
  });
  
  const fileInputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if an image is uploaded and validate its type
    if (!formData.image || !formData.image.type.startsWith('image/')) {
      console.error('Please upload a valid image file');
      return;
    }
  
    // Validate image size (e.g., 5MB limit)
    if (formData.image.size > 5 * 1024 * 1024) {
      console.error('Image size should be less than 5MB');
      return;
    }
  
    try {
      // Upload the image to Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', formData.image);
      cloudinaryFormData.append('upload_preset', 'easyTrade_storage');
  
      const cloudinaryResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dzdsmapd6/image/upload',
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      );
  
      const cloudinaryData = await cloudinaryResponse.json();
  
      if (!cloudinaryData.secure_url) {
        console.error('Failed to upload image to Cloudinary');
        return;
      }
  
      const imageUrl = cloudinaryData.secure_url;
  
      // Prepare the product data including the quality
      const productData = {
        name: formData.name,
        farmer: formData.farmer,
        price: formData.price,
        unit: formData.unit,
        quality: formData.quality, // Send quality as part of product data
        image_public_id: cloudinaryData.public_id,
        image: imageUrl,
      };
      console.log(productData);
  
      // Send the product data to your backend with the JWT token
      const response = await fetch('https://easy-trade-backed.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get("jwt_token")}`, // Include the JWT token
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Backend error: ${errorData.message || 'Failed to send product data'}`);
        return;
      }
  
      console.log('Product added successfully');
  
      // Reset form data
      setFormData({
        name: '',
        farmer: '',
        price: '',
        unit: '',
        quality: '', // Reset quality as well
        image: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
  
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container4">
      <h1>Farmer's Marketplace</h1>
      <div className="upload-form">
        <h2>Add New Crop</h2>
        <form className='addForm' onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cropName">Crop Name</label>
            <input
              id="cropName"
              type="text"
              placeholder="Crop Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="farmerName">Farmer Name</label>
            <input
              id="farmerName"
              type="text"
              placeholder="Farmer Name"
              value={formData.farmer}
              onChange={(e) => setFormData({ ...formData, farmer: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <select
              id="unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            >
              <option value="">Select Unit</option>
              <option value="kg">Kilogram</option>
              <option value="ton">Ton</option>
              <option value="quintal">Quintal</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="quality">Quality</label>
            <input
              id="quality"
              type="text"
              placeholder="80%"
              value={formData.quality}
              onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              id="image"
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
            />
          </div>
          <button type="submit">Upload Crop</button>
        </form>
      </div>
    </div>
  );
};

export default FarmersHome;
