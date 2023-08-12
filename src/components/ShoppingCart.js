import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import apiLink from './config.js'
// import 'bootstrap/dist/css/bootstrap.min.css'; //will change overall layout if added

const ShoppingCart = () => {

    const [itemList, setItemList] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedItem, setSelectedItem] = useState([]);
    const [updatedItem, setUpdatedItem] = useState("");
    const [cartUpdateCounter, setCartUpdateCounter] = useState(0);
    const [userId] = useState(localStorage.getItem('userId'));
    
    console.log(`userId= ${userId}`);

    useEffect(() => {              
        //search cart by user
        axios
            .get(`${apiLink}/cart?userId=${userId}`)
            .then((response) => {
                setItemList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, [userId, cartUpdateCounter]);

    useEffect(() => {
        console.log(`itemList length: ${itemList.length}`); //0

        if (itemList.length > 0) {
            const totalQty = itemList.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = itemList.reduce((total, item) => total + parseFloat(item.priceSubTotal), 0).toFixed(2);

            setTotalQuantity(totalQty);
            setTotalPrice(totalPrice);
        }
        else {
            setTotalQuantity(0);
            setTotalPrice(0);
        }

    }, [itemList]);

    useEffect(() => {

        if (updatedItem) {
            console.log("updated item below:");
            console.log(updatedItem);

            axios
                .post(`${apiLink}/cart/update/${updatedItem._id}`, updatedItem)
                .then((response) => {
                    console.log("cartItems edit updated");
                    setCartUpdateCounter(prevCounter => prevCounter + 1);
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }, [updatedItem]);

    const handleEdit = (event, _id) => {
        event.preventDefault();

        axios
            .get(`${apiLink}/cart/${_id}`)
            .then((response) => {
                setSelectedItem(response.data); //fetch the item
                setCartUpdateCounter(prevCounter => prevCounter + 1);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const changeQuantity = (event, _id) => {
        event.preventDefault();

        let newQuantity = parseInt(document.querySelector("#newQty").value);

        setUpdatedItem(
            {
                _id: selectedItem._id,
                quantity: newQuantity,
                priceSubTotal: (selectedItem.price * newQuantity).toFixed(2)
            }
        )

        setSelectedItem([]);
    }

    const handleDelete = (event, _id) => {
        event.preventDefault();

        axios
            .delete(`${apiLink}/cart/delete/${_id}`)
            .then((response) => {
                setCartUpdateCounter(prevCounter => prevCounter + 1);
            })
            .catch((error) => {
                console.log(error)
            })
        
    }

    const postToOrderList = async (event) => {
        event.preventDefault();

        const totalQty = itemList.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = itemList.reduce((total, item) => total + parseFloat(item.priceSubTotal), 0).toFixed(2);
      
        const newOrder = {
                items: itemList,
                totalItems: totalQty,
                grandTotal: totalPrice,
                userId: userId,
        };

        //post cartItems to order
        await axios
            .post(`${apiLink}/order/add`, newOrder)
            .then((response) => {
                console.log(response.config.data);
                console.log("newOrder added!");
                alert("Your order has been confirmed!");
                clearCart();
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const clearCart = () => {
        //clear for specific user
        axios.delete(`${apiLink}/cart/clear/${userId}`)
            .then(() => {
                console.log(`Cart cleared for user${userId} successfully.`);
                setTotalQuantity(0);
                setItemList([]);
            })  
            .catch((error) => {
                console.log(error)
            })
    };

    return (
        <div className="main-content">
            <div className="container-md">
                <h2 className="pageTitle">Shopping Cart</h2>
                {totalQuantity==0 && itemList.length===0 ?
                    <h4 className="subHeader" id="emptyCart">Your cart is empty</h4>
                    :
                    <div>
                        <h4 className="subHeader">Total order: {totalQuantity} item(s)</h4>
                        {/* <h4>Order Date:{orderDate}</h4> */}
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    {/* <th scope="col"></th> */}
                                    <th scope="col" id="col1">Item(s)</th>
                                    <th scope="col" id="col2" className="itemQuantity">Quantity</th>
                                    <th scope="col" id="col3" className="itemPrice">Price</th>
                                    <th scope="col" id="col4"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemList.map((item, index) => (
                                    item._id === selectedItem._id ?

                                        // Editing view                               
                                        <tr scope="row" key={index+1}>
                                            {/* <td><img src={item.productImg} alt="" width="100" height="100"/></td>     */}
                                            <td>{item.productTitle}</td>
                                            <td>
                                                <input className="newQtyInput" id="newQty" type="number" placeholder={item.quantity} min="1" />
                                            </td>
                                            <td>${(item.priceSubTotal).toFixed(2)}</td>
                                            <td>
                                                <button className="cartBtn" onClick={(event) => changeQuantity(event, item._id)}>
                                                    <i className="bi bi-cart-check"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        :

                                        // Normal view  
                                        <tr scope="row" key={index+1}>
                                            {/* <td><img src={item.productImg} alt="" width="100" height="100"/></td>     */}
                                            <td>{item.productTitle}</td>
                                            <td className="itemQuantity">{item.quantity}</td>
                                            <td className="itemPrice">${(item.priceSubTotal).toFixed(2)}</td>
                                            <td>
                                                <button className="cartBtn"onClick={(event) => handleEdit(event, item._id)}>
                                                    <i className="bi bi-pen"></i>
                                                </button>
                                                <button className="cartBtn" onClick={(event) => handleDelete(event, item._id)}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                ))}
                                <tr scope="row">
                                    {/* <td></td>*/}
                                    <td colspan="2"><strong>Grand total:</strong></td>
                                    <td className="itemPrice"><strong>${totalPrice}</strong></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-primary" onClick={(event) => postToOrderList(event)}>Confirm Order</button>
                    </div>
                }

            </div>
        </div>
    )
};

export default ShoppingCart;