import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import PlaceOrder from '../components/PlaceOrder';

const ProductDetails = () => {
  const location = useLocation();
  const [productData, setProductData] = useState(null); // State to store product data

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
  }, [productId]);

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
            <p>Rating: [to show] </p>
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
