import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import apiLink from './config.js'

const Home = () => {
  const navigate = useNavigate();
  const [maxRatings, setMaxRatings] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`, { state: { productId: productId } });
  };
  
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const calculateAverageRating = async (productId) => {
    try {
      const response = await axios.get(`${apiLink}/rating?productId=${productId}`);
      const ratings = response.data;

      const totalRating = ratings.reduce((acc, rating) => {  
        return acc + rating.rating;
      }, 0);

      console.log("productId_cal", productId + '-' + totalRating + '-' + ratings.length )

      const averageRating = totalRating / ratings.length;

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

      setIsLoading(true);
  
      for (const category of categories) {
        try {
          const response = await axios.get(`${apiLink}/product?category=${category}`);
          const products = response.data;
          console.log("category: ", category);
          console.log("category length: ", products.length);
  
          let maxRating = 0;
          let maxRatingProduct = null;
  
          for (const product of products) {
            const averageRating = await calculateAverageRating(product.productId);
            console.log("product", product.productId)
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

      setIsLoading(false);
    };
  
    fetchMaxRatings();
  }, []); 

  return (
    <div className="main-content" id="homeDiv">

      <div>
          <img src="./images/index_image_1.jpg" id="mainImg" alt="camping" width="100%" />
      </div>

      <h2 className="subtitle">Everything you need for camping!</h2>
      <div className="home-table-container">
          <div className="row">
              <div className="col" onClick={() => handleCategoryClick('Tent')}>
                  <h5><u>Tents</u></h5>
                  <img src="./images/Tents_index.jpg" alt="Tents" width="155" height="155" />
              </div>
              <div className="col" onClick={() => handleCategoryClick('Cooking Utensils')}>
                  <h5><u>Cooking Utensils</u></h5>
                  <img src="./images/cooking_utensils_index.jpg" alt="Cooking Utensils" width="155" height="155" />
              </div>
              <div className="col" onClick={() => handleCategoryClick('Sleeping bags')}>
                  <h5><u>Sleeping Bags</u></h5>
                  <img src="./images/sleeping-bags_index.jpg" alt="Sleeping Bags" width="155" height="155" />
              </div>
          </div>
      </div>
      
      <h3 className="subtitle">Popular Items By Category</h3>

      <div className="home-table-container">
          
          { isLoading ? 
              <p style={{ fontWeight: "bold", textAlign: "center"}}>Loading...</p>
              :
              (
                <div className="row">
                    <div className="col" >
                        {maxRatings['Tent'] && (
                            <span onClick={() => handleProductClick(maxRatings['Tent'].productId)}>
                                <img className="popImg" src={maxRatings['Tent'].img_src} alt="Tents" />
                                <p className="productTitle">{maxRatings['Tent'].title}</p>
                            </span>
                        )}  
                    </div>
                    <div className="col" >
                        {maxRatings['Cooking Utensils'] && (
                            <span onClick={() => handleProductClick(maxRatings['Cooking Utensils'].productId)}>
                                <img className="popImg" src={maxRatings['Cooking Utensils'].img_src} alt="Cooking Utensils" />
                                <p className="productTitle">{maxRatings['Cooking Utensils'].title}</p>
                            </span>
                        )}
                    </div>
                    <div className="col" >
                        {maxRatings['Sleeping bags'] && (
                            <span onClick={() => handleProductClick(maxRatings['Sleeping bags'].productId)}>
                                <img className="popImg" src={maxRatings['Sleeping bags'].img_src} alt="Sleeping Bags" />
                                <p className="productTitle">{maxRatings['Sleeping bags'].title}</p>
                            </span>
                        )}
                    </div>
                </div>
              )
          }

      </div>

    </div>
  );

};

export default Home;
