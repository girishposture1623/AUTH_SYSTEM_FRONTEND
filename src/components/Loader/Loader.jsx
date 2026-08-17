import React from 'react';
import './Loader.css';
import logo from '../../assets/image.png';

const Loader = ({ logoSrc = logo }) => {
  return (
    <div 
      className="auth-loader" 
      aria-label="Loading"
      role="status"
    >
      <div className="auth-loader-content">
        {/* Rotating ring background */}
        <div className="auth-loader-ring"></div>

        {/* Logo container with pulse animation */}
        <div className="auth-loader-logo-container">
          <img
            src={logoSrc}
            alt=""
            className="auth-loader-logo"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;