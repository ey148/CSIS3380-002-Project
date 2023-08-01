import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ALLproducts } from '../../src/data/products';
import ProductBox from './ProductBox';

const ProductsOverview = () => {

    let navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Filter products based on search query and selected category
    const filteredProducts = ALLproducts.filter((product) => {
        const titleMatches = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatches = selectedCategory ? product.category === selectedCategory : true;
        return titleMatches && categoryMatches;
    });

    // check productId when clickings
    const handleProductClick = (productId) => {
        console.log(productId);
        navigate(`/product/${productId}`, { state: { productId: productId } });
    }

    const products = filteredProducts.map((product) => (
        <ProductBox
            productData={product}
            title={product.title}
            brand={product.brand}
            price={product.price}
            desc={product.description}
            img={product.img_src}
            productId={product.id}
            selectedProduct={handleProductClick}
            key={product.id.toString()}
        />
    ));

    const handleSearch = () => {
        const inputName = document.getElementById('inputName');
        setSearchQuery(inputName.value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };


    return (
        <div className="main-content">
            <h2>Product Overview</h2>
            <div className="searchbar-container">
                <h4 className="searchbar">
                    <input type='text' id='inputName' placeholder='Input product name' />
                    <input type='button' value='Search' id='searchBtn' onClick={handleSearch} />
                </h4>
                <ul className="product-nav">
                    <li onClick={() => handleCategoryClick('Tent')}>Tents</li>
                    <li onClick={() => handleCategoryClick('Cooking Utensils')}>Cooking Utensils</li>
                    <li onClick={() => handleCategoryClick('Sleeping bags')}>Sleeping bags</li>
                </ul>
            </div>

            <ul className="container">
                {products}
            </ul>

            <p>PAGE NAV BAR TO ADD</p>

        </div>
    );
}

export default ProductsOverview;
