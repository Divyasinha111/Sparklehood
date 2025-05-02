import React from 'react';
import './Footer.css'; // We'll create this CSS next!

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>Sparklehood</h2>
          <p>Building dreams into reality ✨</p>
        </div>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Sparklehood. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
