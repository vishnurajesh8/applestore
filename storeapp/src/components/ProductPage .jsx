import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const { id } = useParams();

  const BASE_URL = 'http://127.0.0.1:8000';

  useEffect(() => {
    // Fetch product data from API
    axios
      .get(`${BASE_URL}/api/products/${id}/`)
      .then((response) => {
        const data = response.data;
        setProduct(data);

        // Set primary image as selected by default
        const primaryImage = data.images.find((img) => img.is_primary) || data.images[0];
        setSelectedImage(`${BASE_URL}${primaryImage.image}`);

        // Fetch related products
        fetchRelatedProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const fetchRelatedProducts = (productData) => {
    axios
      .get(`${BASE_URL}/api/products/`) // Replace with your related products API endpoint
      .then((response) => {
        // Filter out the current product from related products
        const related = response.data.filter((item) => item.id !== productData.id);
        setRelatedProducts(related.slice(0, 4)); // Limit to 4 products
      })
      .catch((error) => {
        console.error('Error fetching related products:', error);
      });
  };

  const addCartHandler = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Ensure the user is logged in before adding to cart
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token in header
        },
      };
  
      // Correct endpoint according to the Django path pattern
      const response = await axios.post(
        `${BASE_URL}/api/add_to_cart/${id}/`, // Use `id` to match `pk` in the URL
        null,
        config
      );
  
      if (response.status === 200) {
        alert('Product added to cart successfully!');
        navigate('/cart'); // Redirect to cart page
      }
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
      alert('Failed to add product to cart. Please try again.');
    }
  };
  

  if (!product) {
    return <div className="text-center text-gray-600 mt-10">Loading product details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap">
        {/* Left: Product Images */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex space-x-2 mt-4">
            {product.images.map((image) => (
              <img
                key={image.id}
                src={`${BASE_URL}${image.image}`}
                alt="Product Thumbnail"
                className="w-20 h-20 object-cover cursor-pointer rounded-md border border-gray-300 hover:border-gray-500"
                onClick={() => setSelectedImage(`${BASE_URL}${image.image}`)}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full lg:w-1/2 p-4">
          <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-2">₹{product.price}</p>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-800">Product Details</h2>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-gray-500 mt-2">Stock: {product.stock_quantity}</p>
          </div>

          <div className="mt-6">
            <button 
            onClick={addCartHandler}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={
                  product.images.length > 0
                    ? `${BASE_URL}${product.images[0].image}`
                    : 'https://via.placeholder.com/300x300?text=No+Image'
                }
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-xl text-blue-600">₹{product.price}</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition duration-200 ease-in-out">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
