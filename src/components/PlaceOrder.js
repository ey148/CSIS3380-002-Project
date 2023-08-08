import React, { useState, useEffect }  from 'react';
import axios from 'axios';

const PlaceOrder = (props) => {

    const [quantity, setQuantity] = useState("1");
    // const [userId] = useState(localStorage.getItem('userId'));

    // useEffect(() => {
    //     console.log(userId);

    //     if (userId==null || userId===0){
    //         const returnUrl = encodeURIComponent(`/product/${props.productId}`);
    //         window.location = `/login?return=${returnUrl}`;
    //     }

    // }, [])
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);

    const handleOrderClick = async (event, productId, productTitle, price, quantity) => {
        event.preventDefault();
        
        console.log(`userId: ${userId}`);

        //asked to login before adding to cart
        if (userId == null || userId === "0") {
            const returnUrl = encodeURIComponent(`/product/${props.productId}`);
            window.location = `/login?return=${returnUrl}`;
            return; 
        }

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
            await axios.post('http://localhost:5000/cart/add', cartItem);
            window.location = '/cart';
        } catch (error) {
            console.log(error);
        }

    };

    const handleChange = (event) => {
        setQuantity(event.target.value); 
    };

    //check quantity against stock

    return(
        <div>
            <form>
                <label htmlFor="Quantity">Select quantity: </label>
                <input type="number" id="quantity" name="quantity" placeholder={quantity} min="1" onChange={handleChange} className="shorterInput"/>
            </form><br/>
            <button onClick={(event) => handleOrderClick(event, props.productId, props.productTitle, props.price, quantity)}>Add to Shopping Cart</button>
        </div>
    )
}
 
export default PlaceOrder;