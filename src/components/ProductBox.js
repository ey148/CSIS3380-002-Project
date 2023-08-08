const ProductBox = (props) => {
  const renderStars = () => {
    const rating = props.rating;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="bi bi-star-fill" style={{ fontSize: '20px', color: 'rgb(255, 210, 48)' }} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="bi bi-star-half" style={{ fontSize: '20px', color: 'rgb(255, 210, 48)' }} />);
      } else {
        stars.push(<span key={i} className="bi bi-star" style={{ fontSize: '20px', color: 'rgb(255, 210, 48)' }} />);
      }
    }

    return stars;
  };

  //updated to props.productData._id
  return (
    <div className="box" onClick={() => props.selectedProduct(props.productData.productId)}> 
      <img className="detailImg" src={props.img} alt="product" />
      <div>
        <h5>{props.title}</h5>
        <ul>
          <p>{props.brand}</p>
          <p>CAD {props.price}</p>
          <p>Rating: {renderStars()} ({props.countRating} review(s))</p>
          
          <h4><u>View product details</u></h4>
        </ul>
      </div>
    </div>
  );
};


export default ProductBox;