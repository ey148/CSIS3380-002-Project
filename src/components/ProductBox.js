import React from 'react';

const ProductBox = (props) => {

    return ( 
        <div className="box"  onClick={() => props.selectedProduct(props.productData._id)}>
            <img className="detailImg" src={props.img} alt="product" />
            <div>
                <h5>{props.title}</h5>
                <ul>
                    <li>{props.brand}</li>
                    <li>CAD {props.price}</li>
                    <li>Ratings {props.rating}</li>
                </ul>  
            </div>
        </div>
    );
}
 
export default ProductBox;