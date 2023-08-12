import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import apiLink from './config.js'

const OrderTable = (props) => {

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return new Date(dateString).toLocaleString(undefined, options);
    }

    return (
        <div key={props.index+1} className="list-table">
            <p>Order number: {props.order._id}<br/>Order date: {formatDate(props.order.createdAt)}</p>

            <table className="table table-hover">
                <thead>
                    <tr>
                        {/* <th scope="col"></th> */}
                        <th scope="col" id="col4">Item(s)</th>
                        <th scope="col" id="col5" className="itemQuantity">Quantity</th>
                        <th scope="col" id="col6" className="itemPrice">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {(props.order.items).map((item, index) => 

                        <tr scope="row" key={index+1}>
                            {/* <td><img src={item.productImg} alt="" width="100" height="100"/></td>     */}
                            <td>{item.productTitle}</td>
                            <td className="itemQuantity">{item.quantity}</td>
                            <td className="itemPrice">${(item.priceSubTotal).toFixed(2)}</td>
                        </tr>
                    )}
                        <tr scope="row">
                            {/* <td></td>*/}
                            <td colSpan="2"><strong>Grand total:</strong></td>
                            <td className="itemPrice"><strong>${props.order.grandTotal}</strong></td>
                        </tr>
                </tbody>

            </table>
        </div>
    )
};


const MyOrders = () => {

    const [userId] = useState(localStorage.getItem('userId'));
    const [orderList, setOrderList] = useState([])

    useEffect(()=> {
        console.log(`userId = ${userId}`);

        axios
            .get(`${apiLink}/order?userId=${userId}`) 
            .then((response) => {
                setOrderList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            // eslint-disable-next-line
    },[]);

    

    return (
        <div className="main-content">
            <div className="container-md">
            <h2 className="pageTitle">My Orders</h2>
            { orderList.length===0 ?
                <h4 className="subHeader">Your have no orders.</h4>
                :
                <div>
                    <h4 className="subHeader">No. of outstanding orders: {orderList.length}</h4>

                    {orderList.map((order, index) => {
                        return(
                            <OrderTable 
                            order={order}
                            index={index}
                        /> 
                        )                              
                    })}
                    
                </div>
            }

        </div>
        </div>
        
    )
};

export default MyOrders;