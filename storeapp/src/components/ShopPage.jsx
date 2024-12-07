import React, { useState } from 'react';

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const products = [
    {
      id: 1,
      name: 'Smartphone',
      price: 199.99,
      image: 'https://via.placeholder.com/300x300?text=Smartphone',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Laptop',
      price: 999.99,
      image: 'https://via.placeholder.com/300x300?text=Laptop',
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Headphones',
      price: 59.99,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      category: 'Electronics',
    },
    {
      id: 4,
      name: 'Sofa',
      price: 499.99,
      image: 'https://via.placeholder.com/300x300?text=Sofa',
      category: 'Furniture',
    },
    {
      id: 5,
      name: 'Coffee Table',
      price: 150.99,
      image: 'https://via.placeholder.com/300x300?text=Coffee+Table',
      category: 'Furniture',
    },
    {
      id: 6,
      name: 'Watch',
      price: 149.99,
      image: 'https://via.placeholder.com/300x300?text=Watch',
      category: 'Accessories',
    },
  ];

  const categories = ['All', 'Electronics', 'Furniture', 'Accessories'];

  const filteredProducts = products.filter((product) => {
    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const inCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const inSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return inPriceRange && inCategory && inSearchTerm;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-8">
        {/* Search Bar */}
        <div className="w-full sm:w-2/5 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Options */}
        <div className="flex space-x-4">
          {/* Category Filter */}
          <select
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Price Range Filter */}
          <div className="flex items-center space-x-2">
            <span>Price:</span>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, e.target.value])}
              className="w-32"
            />
            <span>{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-xl text-blue-600">${product.price}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition duration-200 ease-in-out">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
