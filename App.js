//test
import '../css/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//App components
import Header from './Header'
import Home from './Home'
import ProductsOverview from './ProductsOverview'
// import ProductDetails from './ProductDetails'
import Footer from "./Footer"

function App() {

  return (
    <div>
      <Header />SS

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsOverview />} />
        {/* <Route path="/products/details-:productid" element={<ProductDetails />} /> */}
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
