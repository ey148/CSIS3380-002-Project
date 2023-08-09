import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const Home = () => {
  const navigate = useNavigate();
  const [maxRatings, setMaxRatings] = useState({});

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`, { state: { productId: productId } });
  };
  
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const calculateAverageRating = async (productId) => {
    try {
      const response = await axios.get(`https://three380projectbackend.onrender.com/rating`);
      const ratings = response.data;

      const filteredRatings = ratings.filter(rating => rating.productId === productId);

      if (filteredRatings.length === 0) {
        return 0;
      }

      const totalRating = filteredRatings.reduce((acc, rating) => {
        return acc + rating.rating;
      }, 0);

      console.log("productId_cal", productId + '-' + totalRating + '-' + filteredRatings.length )

      const averageRating = totalRating / filteredRatings.length;

      return averageRating;
    } catch (error) {
      console.error(`Error calculating average rating for product ${productId}:`, error);
      return 0;
    }
  };

  useEffect(() => {
    const fetchMaxRatings = async () => {
      const categories = ['Tent', 'Cooking Utensils', 'Sleeping bags'];
      const maxRatingsByCategory = {};
  
      for (const category of categories) {
        try {
          const response = await axios.get('https://three380projectbackend.onrender.com/product/');
          const products = response.data;
  
          // Filter products by category
          const filteredProducts = products.filter(product => product.category === category);
          console.log("category_start", category + '-' + products.length)

          let maxRating = 0;
          let maxRatingProduct = null;
  
          for (const product of filteredProducts) {
            const averageRating = await calculateAverageRating(product.productId);
            console.log("product", product.productId + '-' + averageRating)
            if (averageRating > maxRating) {
              maxRating = averageRating;
              maxRatingProduct = product;
            }
          }
  
          maxRatingsByCategory[category] = maxRatingProduct;
        } catch (error) {
          console.error(`Error fetching products for category ${category}:`, error);
        }
      }
  
      setMaxRatings(maxRatingsByCategory);
    };
  
    fetchMaxRatings();
  }, []); 

  return (
    <div className="main-content">
      <img src="./images/index_image.jpg" id="mainImg" alt="camping" width="500" />
      <hr />
      <h2 className="subtitle">Everything you need for camping</h2>
      <div className="table">
        <div className="row">
          <span onClick={() => handleCategoryClick('Tent')}><u>Tents</u></span>
          <span onClick={() => handleCategoryClick('Cooking Utensils')}><u>Cooking Utensils</u></span>
          <span onClick={() => handleCategoryClick('Sleeping bags')}><u>Sleeping Bags</u></span>
        </div>
        <div className="row">
          <span onClick={() => handleCategoryClick('Tent')}>
            <img src="./images/Tents_index.jpg" alt="Tents" width="155" height="155" />
          </span>
          <span onClick={() => handleCategoryClick('Cooking Utensils')}>
            <img src="./images/cooking_utensils_index.jpg" alt="Cooking Utensils" width="155" height="155" />
          </span>
          <span onClick={() => handleCategoryClick('Sleeping bags')}>
            <img src="./images/sleeping-bags_index.jpg" alt="Sleeping Bags" width="155" height="155" />
          </span>
        </div>
      </div>
      <h3 className="subtitle">Popularity Items</h3>
      <div className="table">
        <div className="row">
          {maxRatings['Tent'] && (
            <span onClick={() => handleProductClick(maxRatings['Tent'].productId)}>
              <img className="popImg" src={maxRatings['Tent'].img_src} alt="Tents" />
            </span>
          )}
          {maxRatings['Cooking Utensils'] && (
            <span onClick={() => handleProductClick(maxRatings['Cooking Utensils'].productId)}>
              <img className="popImg" src={maxRatings['Cooking Utensils'].img_src} alt="Cooking Utensils" />
            </span>
          )}
          {maxRatings['Sleeping bags'] && (
            <span onClick={() => handleProductClick(maxRatings['Sleeping bags'].productId)}>
              <img className="popImg" src={maxRatings['Sleeping bags'].img_src} alt="Sleeping Bags" />
            </span>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Home;
