import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;