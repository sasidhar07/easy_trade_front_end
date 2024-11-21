import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import "./index.css"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate(); 


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
    console.log("User logged out");
    setShowLogoutPopup(false);
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className='header-cont'>
      <div className="container-header">
        <div className="header-content">
          <div className="logo">EasyTrade</div>

          <nav className="desktop-nav">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            
          </nav>

          {/* Desktop Icons */}
          <div className="desktop-icons">
            <a href="/cart" className="icon-link2">
              <ShoppingCart size={24} />
            </a>
            
            <button onClick={handleLogout} className="icon-link">
              <LogOut size={24} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-button" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            <a href="/">Home</a>
            <a href="/products">Products</a>
            
            <a href="/cart">Cart</a>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        )}
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="popup-buttons">
              <button onClick={confirmLogout} className="confirm-button">Yes, Logout</button>
              <button onClick={cancelLogout} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Header;