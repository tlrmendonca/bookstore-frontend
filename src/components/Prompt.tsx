import React from 'react';
import './Prompt.css';

interface PromptProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Prompt: React.FC<PromptProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="prompt-overlay" onClick={handleOverlayClick}>
      <div className="prompt-container">
        <button className="prompt-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Prompt;