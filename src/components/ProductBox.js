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
          <li>Rating: {props.rating} star(s)({props.countRating} review(s))</li>
          <li>
            Your Rating(1-5):
            <input
              type="text"
              id="inputRating"
              size="1"
              value={inputRating}
              onChange={handleInputRatingChange}
            />
            <input type="button" id="BtnInputRating" value="Done" onClick={handleSubmitRating} />
          </li>
          
          <h4 onClick={() => props.selectedProduct(props.productData._id)}><u>View product details</u></h4>
        </ul>
      </div>
    </div>
  );
};


export default ProductBox;