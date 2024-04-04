import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { AiOutlineSearch } from 'react-icons/ai'; // Import search icon

const ProductSearch = ({ products, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  const searchByName = (query) => {
    try {
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
  
  const handleSearch = () => {
    searchByName(searchQuery);
    onSearch(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

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
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
              <AiOutlineSearch />
            </button>
          </div>
        </div>
      </div>
      {error && <div>Error: {error.message}</div>}
      {showResults && searchResults.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h5>Search Results:</h5>
          <div className="product-cards-container">
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
