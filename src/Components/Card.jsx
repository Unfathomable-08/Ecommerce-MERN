import { Link } from 'react-router-dom';
import '../Styles/Card.css'

const Card = ({ product }) => {
    return (
      <div className="card">
        <Link to='/checkout' state={product}>
          <img src={product?.image} alt={product?.title} />
        </Link>
        <div className="p-4">
          <h3>{product?.title}</h3>
          <p>${product?.price}</p>
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
  