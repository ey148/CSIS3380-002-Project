import React from 'react';

const ProductBox = (props) => {
  // Calculate the number of full stars to display (rounded down)
  const fullStars = Math.floor(props.rating / 20);
  // Calculate the remaining decimal part to display a half star if needed
  const hasHalfStar = props.rating / 20 - fullStars >= 0.5;
  // Calculate the number of empty stars to display (5 - fullStars - hasHalfStar)
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Create an array of JSX elements to render the stars
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i} className="bi bi-star-fill" style={{ fontSize: '16px', color: 'rgb(255, 210, 48)' }} />);
  }
  if (hasHalfStar) {
    stars.push(<span key="half" className="bi bi-star-half" style={{ fontSize: '16px', color: 'rgb(255, 210, 48)' }} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<span key={`empty${i}`} className="bi bi-star" style={{ fontSize: '16px', color: 'rgb(255, 210, 48)' }} />);
  }

  return ( 
    <div className="box" onClick={() => props.selectedProduct(props.productData._id)}>
      <img className="detailImg" src={props.img} alt="product" />
      <div>
        <h5>{props.title}</h5>
        <ul>
          <li>{props.brand}</li>
          <li>CAD {props.price}</li>
          <li>{stars}</li>
        </ul>  
      </div>
    </div>
  );
}
 
export default ProductBox;