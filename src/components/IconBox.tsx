import React from 'react';
import './IconBox.css';

interface IconBoxProps {
  icon: string;
  onClick?: () => void;
  className?: string;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`iconbox ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconBox;