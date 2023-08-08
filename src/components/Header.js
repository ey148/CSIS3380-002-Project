import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        
        props.updateUser(0,"");
        localStorage.clear();
        window.location = '/';
    };

    return (
        <header>
            <h1 className="title">Camping Cart</h1>
            <ul className="main-nav">
                <li><NavLink to="/">Home</NavLink></li>
                {/* <li><NavLink to="/about">About Us</NavLink></li> */}
                <li><NavLink to="/products">Our Products</NavLink></li>
                {/* <li><NavLink to="/cart">Shopping Cart</NavLink></li> */}
                <li><NavLink to="/contact">Contact Us</NavLink></li>
            </ul>
            {props.fname === "" ? 
                <NavLink to="/login"><button><i className="bi bi-person-circle"></i></button></NavLink>
                :
                // <button>Hi, {props.fname}!
                
                // </button>
                <ul onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                    <i className="bi bi-person-circle"/> {props.fname}
                    {showDropdown && (
                    <div className="dropdown-menu">
                        {/* <li>My Order</li> */}
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    )}
                </ul>                
            }
            <NavLink to="/cart"><button><i className="bi bi-cart-fill"/></button></NavLink>                      
        </header>
    );
}
 
export default Header;