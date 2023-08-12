import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

    const handleLogout = () => {
        
        props.updateUser(0,"");
        localStorage.clear();
        window.location = '/';
    };

    return (
        <nav className="navbar navbar-light">
            <div className='container-md'>
                <h1 id="brandName">Camping Cart</h1>

                <div className="navbar navbar-expand-lg navbar-light bg-transparent">
                    <ul className="navbar-nav mr-auto d-flex">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link"to="/products">Our Products</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="navbar navbar-expand-lg navbar-light bg-transparent">
                    <ul className="navbar-nav mr-auto d-flex">
                        <div className="navbar-nav mr-auto d-flex">
                            {props.fname === "" ? 
                                //NOT Logged In
                                <div className="nav-item active" id="loginBtn">
                                    <NavLink to="/login">
                                        <button className="btn btn-secondary" type="button"><i className="bi bi-person-circle"/></button>
                                    </NavLink>
                                </div>
                                :
                                //Logged In                                
                                <div className="nav-item active" id="loginBtn">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person-circle"/> {props.fname}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li ><NavLink to="/myorders" className="dropdown-item" >My Orders</NavLink></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li ><a href="#" className="dropdown-item" onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                </div>
                            }
                                
                            <div className="nav-item active" id="cartBtn">
                                <NavLink to="/cart">
                                    <button className="btn btn-secondary" type="button"><i className="bi bi-cart-fill"/></button>
                                </NavLink>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
                               
        </nav>
    );
}
 
export default Header;