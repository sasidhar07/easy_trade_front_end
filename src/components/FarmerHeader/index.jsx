import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import "./index.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const FarmerHeader = () => {
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
    setShowLogoutPopup(false);
    console.log("User logged out");
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <header className="farmer-header">
      <div className="container1">
        <div className="header-content">
          <div className="logo">Farmer's Portal</div>

          <nav className="desktop-nav">
            <a href="/farmersHome">Dashboard</a>
            <a href="/farmer/QualityPridictionPage">Create Listing</a>
          </nav>

          <div className="desktop-icons">
            <button onClick={handleLogout} className="icon-link" aria-label="Logout">
              <LogOut size={24} />
            </button>
          </div>

          <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            <a href="/farmersHome" onClick={toggleMenu}>Dashboard</a>
            <a href="/farmer/QualityPridictionPage" onClick={toggleMenu}>Create Listing</a>
            <button onClick={handleLogout}>Logout</button>
          </nav>
        )}
      </div>

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
    </header>
  );
};

export default FarmerHeader;
