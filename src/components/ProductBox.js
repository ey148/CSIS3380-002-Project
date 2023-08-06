import React, { useState } from 'react';

const ProductBox = (props) => {
  const [inputRating, setInputRating] = useState('');

  const handleInputRatingChange = (event) => {
    setInputRating(event.target.value);
    
  };

  const handleSubmitRating = () => {
    if (inputRating !== '') {
      const newCountRating = props.countRating + 1;
      const newRating =
        (props.rating * props.countRating + parseFloat(inputRating)) / newCountRating;
      props.updateRating(props.productData.productId, newRating, newCountRating);
      setInputRating('');
    }
  };

  return (
    <div className="box">
      <img className="detailImg" src={props.img} alt="product" />
      <div>
        <h5>{props.title}</h5>
        <ul>
          <li>{props.brand}</li>
          <li>CAD {props.price}</li>
          <li>
            Rate this product(1-5):
            <input
              type="text"
              id="inputRating"
              size="1"
              value={inputRating}
              onChange={handleInputRatingChange}
            />
            <input type="button" id="BtnInputRating" value="Submit" onClick={handleSubmitRating} />
          </li>
          <li>Average Ratings: {props.rating}</li>
          <li>No of Ratings: {props.countRating}</li>
          <h4 onClick={() => props.selectedProduct(props.productData._id)}>show product details</h4>
        </ul>
      </div>
    </div>
  );
};


export default ProductBox;