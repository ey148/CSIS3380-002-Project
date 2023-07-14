import React from 'react';

const ProductBox = (props) => {

    return ( 
        <div class="box">
            <img class="" src={props.img} alt="product" />
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