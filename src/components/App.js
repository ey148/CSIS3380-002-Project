import '../css/App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

//App components
import Header from './Header'
import Home from './Home'
import ProductsOverview from './ProductsOverview'
import ProductDetails from './ProductDetails'
import ContactUs from './ContactUs'
import Footer from "./Footer"
import ShoppingCart from './ShoppingCart';
import LoginPage from './LoginPage'

function App() {
  
  const [fname, setFName] = useState("");
  const [userId, setUserId] = useState(0)

  //initialize when webpage loaded everytime
  useEffect(() => {
      var checkUserId = localStorage.getItem("userId"); //no userId var, or userId==0

      if (checkUserId===null || checkUserId===0) {
          // Initialize
          localStorage.setItem('userId', 0);
          localStorage.setItem('fname', "");

      } else {
          // extract from localStorage
          setFName(localStorage.getItem('fname'));
          setUserId(localStorage.getItem('userId'));
      }

  }, [])

  //added
  const updateUser = (resUserId, resFName) => {
      setUserId(resUserId);
      setFName(resFName);
  };
  
  return (
  
        <div>
            <Header
              userId={userId}
              fname={fname}
              updateUser={updateUser}         
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsOverview />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<ShoppingCart/>}/>
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<LoginPage updateUser={updateUser} />} />
            </Routes>

            <Footer />
        </div>
  
  );
}

export default App;
