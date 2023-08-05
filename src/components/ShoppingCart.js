import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; //will change overall layout if added

const ShoppingCart = () => {

    const [itemList, setItemList] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedItem, setSelectedItem] = useState([]);
    const [updatedItem, setUpdatedItem] = useState("");
    const [newOrder, setNewOrder] = useState("");
    const [orderDate, setOrderDate] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/cart/')
            .then((response) => {
                setItemList(response.data)
            })
            .catch((error) => {
                console.log(error)
            })

        setTotalQuantity(itemList.reduce((total, item) => total + item.quantity, 0));
        setTotalPrice(itemList.reduce((total, item) => total + item.priceSubTotal, 0).toFixed(2));
    }, [itemList])

    useEffect(() => {
        // Get the current date and format it as 'MM/DD/YYYY'
        const today = new Date();
        const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
        setOrderDate(formattedDate);
    }, []);

    // useEffect(() => {
    //     console.log(selectedItem);
    // }, [selectedItem])

    useEffect(() => {

        if (updatedItem) {
            console.log("updated item below:");
            console.log(updatedItem);

            axios
                .post(`http://localhost:5000/cart/update/${updatedItem._id}`, updatedItem)
                .then((response) => {
                    console.log("cartItems edit updated");
                    // window.location = '/cart'
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }, [updatedItem]);

    const handleEdit = (event, _id) => {
        event.preventDefault();

        axios
            .get(`http://localhost:5000/cart/${_id}`)
            .then((response) => {
                setSelectedItem(response.data); //fetch the item
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
                productId: selectedItem.productId,
                productTitle: selectedItem.productTitle,
                quantity: newQuantity,
                price: selectedItem.price,
                priceSubTotal: (selectedItem.price * newQuantity).toFixed(2)
            }
        )

        setSelectedItem([]);
    }

    const handleDelete = (event, _id) => {
        event.preventDefault();

        axios
            .delete(`http://localhost:5000/cart/delete/${_id}`)
            .then((response) => {
                window.location = '/cart';
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const postToOrderList = async (event) => {
        event.preventDefault();

        setNewOrder(
            {
                items: itemList,
                totalItems: totalQuantity,
                grandTotal: totalPrice,
            }
        )

        //post cartItems to order
        await axios
            .post(`http://localhost:5000/order/add`, newOrder)
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
        try {
            axios.delete(`http://localhost:5000/cart/clear`);
            console.log("Cart cleared successfully.");
        } catch (error) {
            console.log("Error clearing cart:", error);
        }
    };

    return (
        <div className="main-content">
            <h2>Shopping Cart</h2>
            {totalQuantity === 0 ?
                <h4>Your cart is empty</h4>
                :
                <div>
                    <h4>Total order: {totalQuantity} items</h4>
                    <h4>Order Date:{orderDate}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList.map((item) => (
                                item._id === selectedItem._id ?
                                    <tr key={item.productId}>
                                        <td>{item.productTitle}</td>
                                        <td>
                                            <input id="newQty" type="number" placeholder={item.quantity} min="1" />
                                        </td>
                                        <td>${item.priceSubTotal}</td>
                                        <td>
                                            <button onClick={(event) => changeQuantity(event, item._id)} style={{ border: 'none', backgroundColor: 'transparent', color: 'lightgray' }}>
                                                <i className="bi bi-cart-check"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    :
                                    <tr key={item.productId}>
                                        <td>{item.productTitle}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.priceSubTotal}</td>
                                        <td>
                                            <button onClick={(event) => handleEdit(event, item._id)} style={{ border: 'none', backgroundColor: 'transparent', color: 'black' }}>
                                                <i className="bi bi-pen"></i>
                                            </button>
                                            <button onClick={(event) => handleDelete(event, item._id)} style={{ border: 'none', backgroundColor: 'transparent', color: 'black' }}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                            ))}
                            <tr>
                                <td><strong>Grand total:</strong></td>
                                <td></td>
                                <td><strong>${totalPrice}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={(event) => postToOrderList(event)}>Confirm Order</button>
                </div>
            }

        </div>
    )
};

export default ShoppingCart;