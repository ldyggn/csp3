import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { AiOutlineSearch } from 'react-icons/ai'; 

// Component for searching products
const ProductSearch = ({ products, onSearch }) => {
  // State variables for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  // Function to search products by name
  const searchByName = (query) => {
    try {
      // Filter products based on search query
      const filtered = products ? products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      ) : [];
      setSearchResults(filtered);
      setShowResults(true);
      setError(null);
    } catch (error) {
      console.error('Error searching for product by name:', error);
      setError(error);
    }
  };
  
  // Function to handle search button click
  const handleSearch = () => {
    searchByName(searchQuery);
    onSearch(searchQuery);
  };

  // Function to handle Enter key press in search input
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Function to handle input change in search input
  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value === '') {
      setShowResults(false);
      setSearchResults([]);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Search input */}
      <div className={`form-group ${showResults ? 'has-results' : ''}`}>
        <div className="input-group" style={{ width: '300px' }}>
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {/* Search button */}
          <div className="input-group-append">
            <button className="btn" type="button" onClick={handleSearch} style={{ backgroundColor: '#985F4B', border: 'none' }}>
              <AiOutlineSearch style={{ color: 'white' }} />
            </button>
          </div>
        </div>
      </div>
      {/* Display error message if there is an error */}
      {error && <div>Error: {error.message}</div>}
      {/* Display search results if there are results */}
      {showResults && searchResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h5>Search Results:</h5>
          <div className="product-cards-container">
            {/* Map through search results and display product cards */}
            {searchResults.map(product => (
              <ProductCard productProp={product} key={product._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;