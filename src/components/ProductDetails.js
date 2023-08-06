import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import PlaceOrder from './PlaceOrder';

const ProductDetails = () => {
  const location = useLocation();
  const [productData, setProductData] = useState(null); // State to store product data
  const [ratings, setRatings] = useState([]); // State to store product rating
  const [stars, setStars] = useState([]); // State to store calculated stars

  let productId = location.state.productId;

  useEffect(() => {
    // Fetch product details from the server using axios
    axios.get(`http://localhost:5000/product/${productId}`)
      .then(response => {
        setProductData(response.data); // Set the fetched product data to the state
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });

    axios
      .get('http://localhost:5000/rating/')
      .then(response => {
        setRatings(response.data); // Set the fetched products to the state
      })
      .catch(error => {
        console.error('Error fetching ratings:', error);
      });    
  }, [productId]);

  useEffect(() => {
    // Calculate the stars based on the fetched ratings
    if (productData && ratings.length > 0) {
      const productId = productData.productId;
      const getProductRating = (productId) => {
        let rating = null;
        for (const ratingObj of ratings) {
          if (ratingObj.productId === productId) {
            rating = ratingObj.rating;
            break;
          }
        }
        return rating ? rating : 0;
      };

      // Calculate the number of full stars to display (rounded down)
      const rating = getProductRating(productId);
      const fullStars = Math.floor(rating);
      // Calculate the remaining decimal part to display a half star if needed
      const hasHalfStar = rating - fullStars >= 0.5;
      // Calculate the number of empty stars to display (5 - fullStars - hasHalfStar)
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      // Create an array of JSX elements to render the stars
      const stars = [];
      for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="bi bi-star-fill" style={{ fontSize: '20px', color: 'rgb(243, 156, 18)' }} />);
      }
      if (hasHalfStar) {
        stars.push(<span key="half" className="bi bi-star-half" style={{ fontSize: '20px', color: 'rgb(243, 156, 18)' }} />);
      }
      for (let i = 0; i < emptyStars; i++) {
        stars.push(<span key={`empty${i}`} className="bi bi-star" style={{ fontSize: '20px', color: 'rgb(243, 156, 18)' }} />);
      }

      // Set the calculated stars to the state
      setStars(stars);
    }
  }, [productData, ratings]);

  if (!productData) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }

  const isStock = productData.stock > 0;
  console.log("isStock: " + isStock);

  return (
    <div className="main-content">
      <div className="content-display">
        <h2>{productData.title}</h2>
        <div className="LR-display">
          <div id="detailLeftDiv">
            <img className="detailImg" src={productData.img_src} alt="productimage" />
          </div>
          <div id="detailRightDiv">
            <h5 className="brand&category">{productData.brand} - {productData.category}</h5>
            <h4>{productData.model}</h4>
            <p className="desc">{productData.description}</p>
            <h4>CAD {productData.price}</h4>
            <p>{stars}</p>
            {isStock ?
              <PlaceOrder
                // productId={productData.id}
                productId={productData.productId}
                productTitle={productData.title}
                price={productData.price}
              />
              :
              <p className="highlightText">Out of Stock</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
