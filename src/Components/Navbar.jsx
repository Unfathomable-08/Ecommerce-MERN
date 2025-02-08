import React, { useState } from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>E-Commerce</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li className="dropdown">
          <button onClick={toggleDropdown} className="dropdown-btn">
            Products <i className="fas fa-chevron-down"></i>
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-content">
              <li><a href="/product1">Product 1</a></li>
              <li><a href="/product2">Product 2</a></li>
            </ul>
          )}
        </li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
