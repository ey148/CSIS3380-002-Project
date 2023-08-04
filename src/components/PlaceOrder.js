import React, { useState }  from 'react';
import axios from 'axios';
// import { cartList } from '../../src/data/cartList';

const PlaceOrder = (props) => {

    const [quantity, setQuantity] = useState("1");

    const handleOrderClick = (event, productId, productTitle, price, quantity) => {
        event.preventDefault();
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
            priceSubTotal: priceSubTotal
        };
        
        axios
              .post('http://localhost:5000/cart/add', cartItem)
              .then((res) => {
                    window.location = '/cart';
              });

    };

    const handleChange = (event) => {
        setQuantity(event.target.value); 
    };

    //check quantity against stock

    return(
        <div>
            <form>
                <label htmlFor="Quantity">Select quantity: </label>
                {/* <input type="text" id="quantity" name="quantity" value={quantity} onChange={handleChange}/> */}
                <input type="number" id="quantity" name="quantity" placeholder={quantity} min="1" onChange={handleChange}/>
            </form><br/>
            <button onClick={(event) => handleOrderClick(event, props.productId, props.productTitle, props.price, quantity)}>Add to Shopping Cart</button>
        </div>
    )
}
 
export default PlaceOrder;