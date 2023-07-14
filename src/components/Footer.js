import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
    <footer>
        <div className="CompanyInfo">
            <h3>Unleash Your Adventure. Shop Camping Essentials</h3>
        </div>
        <div className="globalnav2">
            <NavLink to="/about">About Us | </NavLink>
            <NavLink to="/teachers">Shopping Cart | </NavLink>
            <NavLink to="/courses">Contact Us</NavLink>
        </div>
    </footer>
);

export default Footer;