import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import PlaceOrder from './PlaceOrder';

const ProductDetails = () => {
  const location = useLocation();
  const [productData, setProductData] = useState(null); // State to store product data
  const [ratings, setRatings] = useState([]); // State to store product rating
  const [stars, setStars] = useState([]); // State to store calculated stars
  const [inputRating, setInputRating] = useState('');

  //getting productId
  const productId = location.state?.productId;

  const handleInputRatingChange = (event) => {
    setInputRating(event.target.value);
  };

  const handleSubmitRating = () => {
    if (inputRating !== '') {
      // Create a new rating object with the productId and rating value
      const newRatingObj = {
        productId: productData.productId,
        rating: parseInt(inputRating),
      };

      // Make a POST request to insert the new rating into the database
      axios
        .post('http://localhost:5000/rating/add', newRatingObj)
        .then((response) => {
          // Update the ratings state with the new rating
          setRatings([...ratings, newRatingObj]);
          setInputRating(''); // Clear the inputRating after submission
          console.log('Input rating cleared:', inputRating); // Check the value of inputRating
        })
        .catch((error) => {
          console.error('Error inserting rating:', error);
          console.error('Response data:', error.response.data);
        });
    }
  };

  useEffect(() => {
    // Fetch product details from the server using axios
    axios
      .get(`http://localhost:5000/product/${productId}`)
      .then((response) => {
        setProductData(response.data); // Set the fetched product data to the state
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });

    axios
      .get('http://localhost:5000/rating/')
      .then((response) => {
        setRatings(response.data); // Set the fetched products to the state
      })
      .catch((error) => {
        console.error('Error fetching ratings:', error);
      });
  }, [productId]);

  useEffect(() => {
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
            <p>Rating: {stars}</p>
            <p>
            <label>Your Rating(1-5): </label> 
            <input type="number" id="inputRating" name="inputRating" placeholder={inputRating} min="1" max="5" onChange={handleInputRatingChange} className="shorterInput" />
            <input type="button" id="BtnInputRating" value="Rate" onClick={handleSubmitRating} />
            </p>

            {isStock ? (
              <PlaceOrder
                productId={productData.productId}
                productTitle={productData.title}
                price={productData.price}
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
