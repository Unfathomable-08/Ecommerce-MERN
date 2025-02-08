import React, { useState } from 'react';
import '../Styles/Checkout.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';

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

    const handleOrderNow = () => {
        toast.success('Order placed successfully!', {
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            progress: undefined,
        });
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
                        <b>Price: PKR {product.price}</b>
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
                        <h4 style={{paddingBottom: '5px'}}>Average Rating: </h4>
                        <div className="rating-icons">
                            {Math.round(product.rating.rate) > 0 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i> }
                            {Math.round(product.rating.rate) > 1 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i> }
                            {Math.round(product.rating.rate) > 2 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i> }
                            {Math.round(product.rating.rate) > 3 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i> }
                            {Math.round(product.rating.rate) > 4 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i> }
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
                        <h3>Total: PKR {getTotalAmount().toFixed(2)}</h3>
                    </div>

                    <button className="checkout-btn" onClick={handleOrderNow}>Order Now</button>
                </div>
            </div>
        </>
    );
};

export default Checkout;
