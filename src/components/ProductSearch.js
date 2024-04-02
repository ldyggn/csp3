import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(''); 
  const [maxPrice, setMaxPrice] = useState(''); 
  const [searchResults, setSearchResults] = useState([]);

  const searchByName = async () => {
    try {
      const response = await fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/products/searchByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for product by name:', error);
    }
  };

  const searchByPriceRange = async () => {
    try {
      const response = await fetch('http://ec2-18-217-154-136.us-east-2.compute.amazonaws.com/b5/products/searchByPrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ minPrice, maxPrice })
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching for product by price range:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery) {
      await searchByName();
    }
    await searchByPriceRange();
  };

  return (
    <div>
      <h2 className='mt-3'>Product Search</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
      </div>
      <div className="form-group mt-3">
      <h2>Search Product By Price Range</h2>
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          className="form-control mb-3"
          value={minPrice}
          onChange={event => setMinPrice(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          className="form-control"
          value={maxPrice}
          onChange={event => setMaxPrice(event.target.value)}
        />
      </div>
      <button className="btn btn-primary my-3" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul>
      {searchResults.map(product => (
          <ProductCard productProp={product} key={product._id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
