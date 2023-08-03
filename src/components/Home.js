import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="main-content">
      <img src="./images/index_image.jpg" id="mainImg" alt="camping" width="500" />
      <hr />
      <h2 className="subtitle">Everything you need for camping</h2>
      <div className="table">
        <div className="row">
          <span onClick={() => handleCategoryClick('Tent')}>
            <img src="./images/Tents_index.jpg" alt="Tents" width="150" height="150" />
          </span>
          <span onClick={() => handleCategoryClick('Cooking Utensils')}>
            <img src="./images/cooking_utensils_index.jpg" alt="Cooking Utensils" width="150" height="150" />
          </span>
          <span onClick={() => handleCategoryClick('Sleeping bags')}>
            <img src="./images/sleeping-bags_index.jpg" alt="Sleeping Bags" width="150" height="150" />
          </span>
        </div>
        <div className="row">
          <span onClick={() => handleCategoryClick('Tent')}>Tents</span>
          <span onClick={() => handleCategoryClick('Cooking Utensils')}>Cooking Utensils</span>
          <span onClick={() => handleCategoryClick('Sleeping bags')}>Sleeping Bags</span>
        </div>
      </div>
      <h2 className="subtitle">Popularity Items</h2>
      <div className="table">
        <div className="row">
          <span>
            <img src="./images/index_image.jpg" alt="Tents" width="150" />
          </span>
          <span>
            <img src="./images/index_image.jpg" alt="Sleeping Bags" width="150" />
          </span>
          <span>
            <img src="./images/index_image.jpg" alt="Cooking Utensils" width="150" />
          </span>
        </div>
        <div className="row">
          <span>Tents</span>
          <span>Sleeping Bags</span>
          <span>Cooking Utensils</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
