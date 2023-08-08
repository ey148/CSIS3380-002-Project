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
    // const [orderDate, setOrderDate] = useState('');
    const [cartUpdateCounter, setCartUpdateCounter] = useState(0);
    const [userId] = useState(localStorage.getItem('userId'));
    
    console.log(`userId= ${userId}`);

    useEffect(() => {       
        
        // //search full cart
        // axios
        //     .get('http://localhost:5000/cart/')
        //     .then((response) => {
        //         setItemList(response.data)
        //         setTotalQuantity(itemList.reduce((total, item) => total + item.quantity, 0));
        //         setTotalPrice(parseFloat(itemList.reduce((total, item) => total + item.priceSubTotal, 0)));
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        
        //search cart by user
        axios
            .get(`http://localhost:5000/cart?userId=${userId}`)
            .then((response) => {
                setItemList(response.data);
                //setTotalQuantity(itemList.reduce((total, item) => total + item.quantity, 0));
                //setTotalPrice(itemList.reduce((total, item) => total + parseFloat(item.priceSubTotal), 0).toFixed(2));
            })
            .catch((error) => {
                console.log(error);
            });
        // eslint-disable-next-line
    }, [userId, cartUpdateCounter]);

    useEffect(() => {
        if (itemList.length > 0) {
            const totalQty = itemList.reduce((total, item) => total + item.quantity, 0);
            const totalPrice = itemList.reduce((total, item) => total + parseFloat(item.priceSubTotal), 0).toFixed(2);

            setTotalQuantity(totalQty);
            setTotalPrice(totalPrice);
        }
    }, [itemList]);

    // useEffect(() => {
    //     // Get the current date and format it as 'MM/DD/YYYY'
    //     const today = new Date();
    //     const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    //     setOrderDate(formattedDate);
    // }, []);

    useEffect(() => {

        if (updatedItem) {
            console.log("updated item below:");
            console.log(updatedItem);

            axios
                .post(`http://localhost:5000/cart/update/${updatedItem._id}`, updatedItem)
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
            .get(`http://localhost:5000/cart/${_id}`)
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
            .delete(`http://localhost:5000/cart/delete/${_id}`)
            .then((response) => {
                // window.location = '/cart';
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
        // try {
        //     axios.delete(`http://localhost:5000/cart/clear`);
        //     console.log("Cart cleared successfully.");
        //     setTotalQuantity(0);
        // } catch (error) {
        //     console.log("Error clearing cart:", error);
        // }

        //clear for specific user
        try {
            axios.delete(`http://localhost:5000/cart/clear/${userId}`);
            console.log(`Cart cleared for user${userId} successfully.`);
            setTotalQuantity(0);
        } catch (error) {
            console.log("Error clearing cart:", error);
        }
    };

    //clear by userId


    return (
        <div className="main-content">
            <h2>Shopping Cart</h2>
            {totalQuantity === 0 ?
                <h4>Your cart is empty</h4>
                :
                <div>
                    <h4>Total order: {totalQuantity} items</h4>
                    {/* <h4>Order Date:{orderDate}</h4> */}
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemList.map((item, index) => (
                                item._id === selectedItem._id ?
                                    <tr key={index+1}>
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
                                    <tr key={index+1}>
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