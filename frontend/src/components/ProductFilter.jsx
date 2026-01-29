import React, { useState } from 'react';
import { useState as useStateCallback } from 'react';

function ProductFilter({ onFilterChange, categories = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({
      search: value,
      category: selectedCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  const handleCategoryChange = (category) => {
    const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(newCategory);
    onFilterChange({
      search: searchTerm,
      category: newCategory,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    });
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: parseInt(value) };
    setPriceRange(newRange);
    onFilterChange({
      search: searchTerm,
      category: selectedCategory,
      minPrice: newRange.min,
      maxPrice: newRange.max,
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 100000 });
    onFilterChange({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 100000,
    });
  };

  return (
    <div className="w-full md:w-64 md:sticky md:top-20">
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="md:hidden w-full bg-blue-500 text-white py-2 px-4 rounded mb-4 font-semibold"
      >
        {isExpanded ? 'Hide Filters' : 'Show Filters'}
      </button>

      {/* Filter Container */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block bg-gray-50 p-4 rounded-lg border`}>
        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Search Products</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, brand..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Category</label>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-blue-500 rounded"
                  />
                  <span className="ml-2 text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">Price Range</label>
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-600">Min: ₹{priceRange.min.toLocaleString()}</label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Max: ₹{priceRange.max.toLocaleString()}</label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full bg-gray-300 text-gray-800 py-2 px-4 rounded font-semibold hover:bg-gray-400 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default ProductFilter;
