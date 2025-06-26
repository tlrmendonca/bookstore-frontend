import React from 'react';
import './Frontpage.css';

const Frontpage: React.FC = () => {
  return (
    <div className="frontpage">
        <div className="frontpage-content">
        <div className="frontpage-center">
          <h1 className="frontpage-title">
            Bookstore
          </h1>
          <p className="frontpage-slogan">
            A demo app for a simple bookstore
          </p>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;