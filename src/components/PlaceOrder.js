import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import apiLink from './config.js'

const PlaceOrder = (props) => {

    const [quantity, setQuantity] = useState("1");
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    const handleOrderClick = async (event, productId, productTitle, price, quantity) => {
        event.preventDefault();
        
        console.log(`userId: ${userId}`);

        //check Login before adding to cart
        props.checkLogin();

        console.log(`Product Data: id=${productId}, title=${productTitle}, price=${price}`);
        console.log(`Quantity: ${quantity}`);

        //add to cartList
        let priceSubTotal = price;

        if (quantity > 1){
            priceSubTotal = (price * quantity).toFixed(2);
            console.log(`Price= ${price}`);
        }

        const cartItem = { 
            productId: productId,
            productTitle: productTitle,
            quantity: quantity,
            price: price,
            priceSubTotal: priceSubTotal,
            userId: userId
        };
        
        try {
            await axios.post(`${apiLink}/cart/add`, cartItem);
            window.location = '/cart';
        } catch (error) {
            console.log(error);
        }

    };

    const handleChange = (event) => {
        setQuantity(event.target.value); 
    };

    return(
        <div>
            <form class="input-container">
                <label htmlFor="Quantity" className="tag">Select quantity: </label>
                <input type="number" id="quantity" name="quantity" placeholder={quantity} min="1" onChange={handleChange} className="shorterInput"/>
            </form><br/>
            <button className="btn btn-primary" onClick={(event) => handleOrderClick(event, props.productId, props.productTitle, props.price, quantity)}>Add to Shopping Cart</button>
        </div>
    )
}
 
export default PlaceOrder;