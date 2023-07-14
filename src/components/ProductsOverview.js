import React from 'react';
import { ALLproducts } from '../../src/data/products'
import ProductBox from './ProductBox'

const ProductsOverview = () => {
    let products = ALLproducts.map((product) => {
        return <ProductBox 
                    title={product.title}
                    brand={product.brand}
                    price={product.price}
                    desc={product.description}
                    img={product.img_src}
                    key={product.id}
        />
    }) 

    return (
        <div className="main-content">
            <h2>Product Overview</h2>
            <h4>SEARCH BAR TO ADD</h4>

            <ul class="container">
                {products}
            </ul>

            <p>PAGE NAV BAR TO ADD</p>
        </div>
    );
}
 
export default ProductsOverview;