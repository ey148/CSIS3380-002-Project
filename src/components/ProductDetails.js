import React from 'react';
import { useLocation } from 'react-router-dom';
import { ALLproducts } from '../../src/data/products';
import PlaceOrder from '../components/PlaceOrder'


const ProductDetails = ( ) => {
    
    let location = useLocation();
    let productId = location.state.productId;

    const findProductById = (productId) => {
        return ALLproducts.find((product) => product.id === productId);
    };

    const productData = findProductById(productId);
    // console.log(productData);

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
                        {/* <p>Stock: {productData.stock}</p> */}
                        {isStock ?  
                            <PlaceOrder
                                productId={productData.id}
                                productTitle={productData.title}
                                price={productData.price}/> 
                            : 
                            <p className="highlightText">Out of Stock</p> }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProductDetails;