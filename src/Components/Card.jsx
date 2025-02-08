import { Link } from 'react-router-dom';
import '../Styles/Card.css'

const Card = ({ product }) => {
    return (
      <div className="card">
        <Link to='/details' state={product}>
          <img src={product?.image} alt={product?.title} />
        </Link>
        <div className="p-4">
          <h3>
            {product?.title?.split(" ").slice(0, 5).join(" ")}
            {product?.title?.split(" ")?.length > 5 && ' ...'}
          </h3>
          <p>PKR {product?.price}</p>
          <p>
            {product?.description?.split(" ").slice(0, 12).join(" ")}
            {product?.description?.split(" ")?.length > 12 && ' ...'}
          </p>
          <button className="add-to-cart">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;
  