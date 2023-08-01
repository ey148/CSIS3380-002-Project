import React from 'react';

const ProductBox = (props) => {

    return ( 
        <div className="box"  onClick={() => props.selectedProduct(props.productId)}>
            <img className="detailImg" src={props.img} alt="product" />
            <div>
                <h5>{props.title}</h5>
                <ul>
                    <li>{props.brand}</li>
                    <li>CAD {props.price}</li>
                    <li>ratings to show</li>
                </ul>
                
            </div>
        </div>

    );
}
 
export default ProductBox;