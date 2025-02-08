import '../Styles/Products.css'
import { useState } from 'react';
import Card from './Card';

const Products = ({ products }) => {
  const visibleProducts = products?.slice(0, 8);

  return (
    <div className="container">
      <div className="products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {visibleProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        <div className="product">
          <button
            style={{marginTop: '50px', padding: '12px 30px'}}
            className="add-to-cart"
          >
            See More
          </button>
        </div>
      </div>    
    </div>
  );
};

export default Products;
