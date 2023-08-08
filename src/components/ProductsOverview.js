import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import ProductBox from './ProductBox';

const ProductsOverview = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]); // State to store fetched products
  const [ratings, setRatings] = useState([]); // State to store fetched products
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category') || '';

  useEffect(() => {
    // Fetch products from the server using axios
    axios.get('http://localhost:5000/product/')
      .then(response => {
        setProducts(response.data); // Set the fetched products to the state
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios
      .get('http://localhost:5000/rating/')
      .then(response => {
        setRatings(response.data); // Set the fetched products to the state

      })
      .catch(error => {
        console.error('Error fetching ratings:', error);
      });
  }, []); // Empty dependency array to fetch products only once

  
  const calculateAverageRating = (productId) => {
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const productRatings = ratings.filter(
      (ratingObj) => ratingObj.productId === productId
    );
      
    if (productRatings.length === 0) {
      return 0;
    }
      
    const totalRating = productRatings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / productRatings.length;
    return averageRating;
  };

  const calculateCountRating = (productId) => {
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const productRatings = ratings.filter(
      (ratingObj) => ratingObj.productId === productId
    );
      
    if (productRatings.length === 0) {
      return 0;
    }
    return productRatings.length;
  };
  
  const updateRating = (productId, newRating, newCountRating) => {
    const ratingToUpdate = ratings.find((ratingObj) => ratingObj.productId === productId);

    if (ratingToUpdate) {
      // Update the rating and countRating in the state
      setRatings((prevRatings) =>
        prevRatings.map((ratingObj) =>
          ratingObj.productId === productId
            ? { ...ratingObj, rating: newRating, countRating: newCountRating }
            : ratingObj
        )
      );

      // Also update the rating and countRating of the product in the products state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, rating: newRating, countRating: newCountRating }
            : product
        )
      );
    } else {
      // If the rating is not found in the state, add it to the state
      setRatings((prevRatings) => [
        ...prevRatings,
        { productId: productId, rating: newRating, countRating: newCountRating },
      ]);

      // Also add the rating and countRating to the corresponding product in the products state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, rating: newRating, countRating: newCountRating }
            : product
        )
      );
    }
  };


  //issue with productId
  const handleProductClick = (productId) => {
    console.log(productId);
    navigate(`/product/${productId}`, { state: { productId: productId } });
  };

  const handleSearch = () => {
    const inputName = document.getElementById('inputName');
    setSearchQuery(inputName.value);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const filteredProducts = products.filter((product) => {
    const titleMatches = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatches = selectedCategory ? product.category === selectedCategory : true;
    return titleMatches && categoryMatches;
  });

  return (
    <div className="main-content">
      <h2>Product Overview</h2>
      <div className="searchbar-container">
        <h4 className="searchbar">
          <input type="text" id="inputName" placeholder="Input product name" />
          <input type="button" value="Search" id="searchBtn" onClick={handleSearch} />
        </h4>
        <ul className="product-nav">
          <li className={selectedCategory === 'Tent' ? 'active' : ''} onClick={() => handleCategoryClick('Tent')}>
            <h3><u>Tents</u></h3>
          </li>
          <li className={selectedCategory === 'Cooking Utensils' ? 'active' : ''} onClick={() => handleCategoryClick('Cooking Utensils')}>
            <h3><u>Cooking Utensils</u></h3>
          </li>
          <li className={selectedCategory === 'Sleeping bags' ? 'active' : ''} onClick={() => handleCategoryClick('Sleeping bags')}>
            <h3><u>Sleeping bags</u></h3>
          </li>
        </ul>

      </div>

      <ul className="container">
        {filteredProducts.map((product) => (
          <ProductBox
            productData={product}
            title={product.title}
            brand={product.brand}
            price={product.price}
            desc={product.description}
            img={product.img_src}
            productId={product.productId}
            selectedProduct={handleProductClick}
            rating={calculateAverageRating(product.productId)}
            countRating={calculateCountRating(product.productId)}
            updateRating={updateRating}
            key={product._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductsOverview;