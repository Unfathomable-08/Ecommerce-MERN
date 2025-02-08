import React from "react";
import "../Styles/ConfirmOrder.css";
import Navbar from "../Components/Navbar";

const ConfirmOrder = () => {
  return (
    <>
    <Navbar/>
    <div className="container">
    <div className="checkout-container" style={{marginTop: '120px'}}>
      <h1>Checkout</h1>
      <p className="session-expiry">The session expires in 30 seconds.</p>

      <div className="payment-methods">
        <label className="checkbox-label">
          <input type="checkbox" checked readOnly />
          <span>Use Super Coins</span>
          <span className="coin-balance">Available balance <b>300 Coins</b></span>
        </label>
      </div>

      <div className="payment-details">
        <label className="radio-label">
          <input type="radio" checked readOnly />
          <span>Credit or Debit Card</span>
        </label>
        <div className="card-inputs">
          <input type="text" placeholder="8800 3425 6546 3253" />
          <div className="card-secondary">
            <input type="text" placeholder="880" />
            <input type="text" placeholder="12/23" />
          </div>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" checked readOnly />
          <span>Securely save card details</span>
        </label>
      </div>

      <div className="order-summary">
        <div className="product">
          <img src="tshirt.jpg" alt="Black Casual T-Shirt" />
          <div className="product-info">
            <span className="product-name">Black Casual T-Shirt</span>
            <span className="product-size">Size M</span>
          </div>
        </div>
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" />
          <button className="apply-btn">Apply</button>
        </div>
        <div className="pricing">
          <div className="price-item">
            <span>Price (1 item)</span> <span>340</span>
          </div>
          <div className="price-item">
            <span>Delivery Charges</span> <span className="free">Free</span>
          </div>
          <div className="price-item">
            <span>Supercoin Credits</span> <span className="discount">-300</span>
          </div>
          <div className="total-amount">
            <span>Total Amount</span> <span>40 USD</span>
          </div>
        </div>
      </div>

      <div className="checkout-actions">
        <button className="previous-btn">Previous</button>
        <button className="pay-btn">Pay $40 →</button>
      </div>

      <div className="designer-info">
        <span>Designed by</span> <b>Nimisha Das</b>
      </div>
    </div>
    </div>
    </>
  );
};

export default ConfirmOrder;
