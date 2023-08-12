import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import PlaceOrder from './PlaceOrder';
import apiLink from './config.js'

const ProductDetails = () => {
  const location = useLocation();
  const [productData, setProductData] = useState(null); // State to store product data
  const [ratings, setRatings] = useState([]); // State to store product rating
  const [stars, setStars] = useState([]); // State to store calculated stars
  const [inputRating, setInputRating] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [rated, setRated] = useState(false);

  //getting productId
  const productId = location.state?.productId;

  //check userId
  useEffect(() =>  {
      //check user
      setUserId(localStorage.getItem('userId'));
      console.log(`userId= ${userId}`);

      //move from useEffect(),[productId] => productId will not change
      axios
        .get(`${apiLink}/product/${productId}`)
        .then((response) => {
          setProductData(response.data); // Set the fetched product data to the state
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
        });

      axios
        .get(`${apiLink}/rating/`)
        .then((response) => {
          setRatings(response.data); // Set the fetched products to the state
          checkRating();
        })
        .catch((error) => {
          console.error('Error fetching ratings:', error);
        });        

    // eslint-disable-next-line
  }, []);

//check rating
 function checkRating() {

    if (userId !== null && userId !== 0) {
      axios
        .get(`${apiLink}/rating?userId=${userId}&productId=${productId}`)
        .then((response) => {
            console.log(response.data);
            if (response.data === null || response.data.length === 0) {
              setRated(false);
            } else {
              setRated(true);
            }
        })
        .catch((error) => {
          console.error('Error fetching rating by userId & productId: ', error);
        });
    }
  };

  useEffect(()=>{
      console.log(`rated: ${rated}`);
  }, [rated]);

  //check Login before rating
  function checkLogin() {
      console.log(`userId:`, userId);
      if (userId == null || userId == 0) {
            const returnUrl = encodeURIComponent(`/product/${productId}`);
            console.log(`returnUrl:`, returnUrl);
            window.location = `/login?return=${returnUrl}`;
            return; 
      }
  };
          

  const handleInputRatingChange = (event) => {
    setInputRating(event.target.value);
  };

  const handleSubmitRating = (event) => {
    event.preventDefault();
    checkLogin();

    if (inputRating !== '') {
      // Create a new rating object with the productId and rating value
      const newRatingObj = {
        productId: productData.productId,
        rating: parseInt(inputRating),
        userId: userId
      };

      // Make a POST request to insert the new rating into the database
      axios
        .post(`${apiLink}/rating/add`, newRatingObj)
        .then((response) => {
          // Update the ratings state with the new rating
          setRatings([...ratings, newRatingObj]);
          setInputRating(''); // Clear the inputRating after submission
          console.log('Input rating cleared:', inputRating); // Check the value of inputRating
          setRatingSubmitted(true); // Set the ratingSubmitted state to true
        })
        .catch((error) => {
          console.error('Error inserting rating:', error);
          console.error('Response data:', error.response.data);
        });
    }
  };

  useEffect(() => {
    console.log(ratings);

    const calculateAverageRating = () => {
      if (!ratings || ratings.length === 0) {
        return 0;
      }

      const productRatings = ratings.filter(
        (ratingObj) => ratingObj.productId === productData.productId
      );
      
      if (productRatings.length === 0) {
        return 0;
      }
      
      const totalRating = productRatings.reduce(
        (acc, curr) => acc + curr.rating,
        0
      );

      const averageRating = totalRating / productRatings.length;

      return averageRating;
    };

    if (productData && ratings.length > 0) {
      const averageRating = calculateAverageRating();
    
      const fullStars = Math.floor(averageRating);
      const hasHalfStar = averageRating - fullStars >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

      const stars = [];
      for (let i = 0; i < fullStars; i++) {
        stars.push(
          <span
            key={i}
            className="bi bi-star-fill"
            style={{ fontSize: '20px', color: 'rgb(243, 156, 18)' }}
          />
        );
      }
      if (hasHalfStar) {
        stars.push(
          <span
            key="half"
            className="bi bi-star-half"
            style={{ fontSize: '20px', color: 'rgb(243, 156, 18)' }}
          />
        );
      }
      for (let i = 0; i < emptyStars; i++) {
        stars.push(
          <span
            key={`empty${i}`}
            className="bi bi-star"
            style={{ fontSize: '20px', color: 'rgb(243, 156, 18)' }}
          />
        );
      }

      setStars(stars);
    }
  }, [productData, ratings, productId]);

  if (!productData) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }

  const isStock = productData.stock > 0;
  // console.log("isStock: " + isStock);
  
  return (
    <div className="main-content">
      <div className="container-md">
        <h3 className="pageTitle">{productData.title}</h3>
        <div className="LR-display">
          <div id="detailLeftDiv">
            <img className="detailImg" src={productData.img_src} alt="productimage" />
          </div>
          <div id="detailRightDiv">
            <h5 className="brandAndCategory">{productData.brand} - {productData.category}</h5>
            <h4 className="model">{productData.model}</h4>
            <p className="desc">{productData.description}</p>
            <h4 className="price">CAD {productData.price}</h4>

            <p className="tag">Rating: {stars}</p>

            {ratingSubmitted || rated ? (
              <p>Thanks for your rating!</p>
              ) 
              : 
              (
                  // <div class="input-container">
                  //   <label className="tag">Your Rating(1-5): </label> 
                  //   <input type="number" id="inputRating" name="inputRating" placeholder={inputRating} min="1" max="5" onChange={handleInputRatingChange} className="shorterInput" />
                  //   {/* <input type="button" className="btn btn-primary" value="Rate" onClick={handleSubmitRating} /> */}
                  //   <button className="btn btn-primary btn-sm" onClick={handleSubmitRating}>Rate</button>
                  // </div>

                  <div class="input-container">
                    <label className="tag">Your Rating(1-5): </label> 
                    <div class="input-button-container">
                        <input type="number" id="inputRating" name="inputRating" placeholder={inputRating} min="1" max="5" onChange={handleInputRatingChange} className="shorterInput" />
                        <button className="btn btn-primary btn-sm" onClick={handleSubmitRating}>Rate</button>
                    </div>
                  </div>
              )
            }

            {isStock ? (
              <PlaceOrder
                productImg = {productData.img_src}
                productId={productData.productId}
                productTitle={productData.title}
                price={productData.price}
                checkLogin={checkLogin}
              />
            ) : (
              <p className="highlightText">Out of Stock</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
