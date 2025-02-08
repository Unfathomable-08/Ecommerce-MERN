import '../Styles/Products.css'
import Card from './Card';
import { Link } from 'react-router-dom';

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
            <Link to="/products">
              See More
            </Link>
          </button>
        </div>
      </div>    
    </div>
  );
};

export default Products;
