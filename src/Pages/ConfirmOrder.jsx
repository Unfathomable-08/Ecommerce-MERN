import { useEffect, useState } from "react";
import "../Styles/ConfirmOrder.css";
import Navbar from "../Components/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'

const ConfirmOrder = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const email = localStorage.getItem('email');
        if (!email){
        navigate('/login')
        }
    },[]);

    const location = useLocation();
    const state = location.state.product;
    const qty = location.state.qty;
    console.log(qty)

    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0); // Percentage %

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
        const total = state.price * qty;
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
            <Navbar />
            <div className="container">
                <div className="checkout-container" style={{ marginTop: '110px' }}>
                    <div>
                        <h1>Checkout</h1>
                        <h3>Payment Methods</h3>
                        <p className="session-expiry">The session expires in 30 seconds.</p>
                        <div className="payment-methods">
                            <label className="checkbox-label">
                                <div className="cash-on">
                                    {/* <input type="checkbox" checked /> */}
                                    <span>Cash On Delivery</span><br />
                                    <p style={{ color: '#aaa' }}>Available in your area</p>
                                </div>
                            </label>
                        </div>

                        <div className="payment-details">
                            <label className="radio-label">
                                {/* <input type="checkbox" checked /> */}
                                <span>Credit or Debit Card</span>
                            </label>
                            <div className="card-inputs">
                                <input type="text" placeholder="8800 3425 6546 3253" />
                                <div className="card-secondary">
                                    <input type="text" placeholder="880" />
                                    <input type="text" placeholder="12/23" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-summary">
                        <div className="product-dts">
                            <img src={state?.image} alt="Black Casual T-Shirt" />
                            <div className="product-info">
                                <span className="product-name">{state?.title}</span>
                                <span className="product-size">{state?.category}</span>
                            </div>
                        </div>
                        <div className="coupon-section">
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={handleCouponChange}
                            />
                            <button className="apply-btn" onClick={applyCoupon}>Apply Coupon</button>
                        </div>
                        <div className="pricing">
                            <div className="price-item">
                                <span>Price ({qty} item)</span> <span>PKR {state?.price}</span>
                            </div>
                            <div className="price-item">
                                <span>Delivery Charges</span> <span className="free">{state?.fee || 'Free'}</span>
                            </div>
                            <div className="price-item">
                                <span>Discount</span> <span className="discount">PKR -{(state.price * discount * qty)/100}</span>
                            </div>
                            <div className="total-amount">
                                <span>Total Amount</span> <span>PKR {getTotalAmount().toFixed(2)}</span>
                            </div>
                        <button className="pay-now" onClick={handleOrderNow}>Pay Now</button>
                        </div>

                    </div>

                    <div className="checkout-actions">
                        <Link className="previous-btn" to='/details' state={state}>Previous</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmOrder;
