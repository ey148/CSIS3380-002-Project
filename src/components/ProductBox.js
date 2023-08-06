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
            Input Rating Score:
            <input type="number" id="inputRating" name="inputRating" placeholder={inputRating} min="1" max="5" onChange={handleInputRatingChange} className="shorterInput"/>
            <input type="button" id="BtnInputRating" value="Submit" onClick={handleSubmitRating} />
          </li>
          <li>Average Ratings: {props.rating}</li>
          <li>Rating Scores inputted: {props.countRating}</li>
          <h4 onClick={() => props.selectedProduct(props.productData._id)}>show product details</h4>
        </ul>
      </div>
    </div>
  );
};


export default ProductBox;