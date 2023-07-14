import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1 className="title">Camping Cart</h1>
            <ul className="main-nav">
                <li><NavLink to="/">Home</NavLink></li>
                {/* <li><NavLink to="/about">About Us</NavLink></li> */}
                <li><NavLink to="/products">Our Products</NavLink></li>
                <li><NavLink to="/cart">Shopping Cart</NavLink></li>
                <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>                      
        </header>
    );
}
 
export default Header;