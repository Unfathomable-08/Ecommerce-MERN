import React, { useState } from 'react';
import '../Styles/Checkout.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Checkout = () => {
    const location = useLocation();
    const product = location.state; 
    const [quantity, setQuantity] = useState(1);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0); // Percentage %

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleCouponChange = (e) => {
        setCouponCode(e.target.value);
    };

    const applyCoupon = () => {
        if (couponCode === 'DISCOUNT10') {
            setDiscount(10);
        } else {
            setDiscount(0);
        }
    };

    const getTotalAmount = () => {
        const total = product.price * quantity;
        return total - (total * discount) / 100;
    };

    return (
        <>
            <Navbar/>
            <div className="checkout-page" style={{marginTop: '100px'}}>
                <div className="product-details">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                    />
                    <div className="product-info">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <b>Price: ${product.price}</b>
                    </div>
                </div>

                <div className="product-controls">
                    <h4 style={{paddingBottom: '5px'}}>Quantity: </h4>
                    <div className="quantity-controls">
                        <button onClick={handleDecrease}>-</button>
                        <span>{quantity}</span>
                        <button onClick={handleIncrease}>+</button>
                    </div>

                    <div className="rating">
                        <h4 style={{paddingBottom: '5px'}}>Rating: </h4>
                        <div className="rating-icons">
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>
                    </div>

                    <h4 style={{paddingBottom: '10px'}}>Coupon Code: </h4>
                    <div className="coupon">
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={handleCouponChange}
                            />
                        <button onClick={applyCoupon}>Apply Coupon</button>
                    </div>

                    {discount > 0 && <p className="discount-text">Discount: -{discount}%</p>}

                    <div className="total">
                        <h3>Total: ${getTotalAmount().toFixed(2)}</h3>
                    </div>

                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
