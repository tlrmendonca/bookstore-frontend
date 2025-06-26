import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (item: string) => {
    switch (item) {
      case 'Home':
        navigate('/');
        break;
      case 'Books':
        navigate('/books');
        break;
      case 'Sales':
        navigate('/sales');
        break;
      case 'Borrowings':
        navigate('/borrowings');
        break;
      case 'Bookstores':
        navigate('/bookstores');
        break;
      case 'Clients':
        navigate('/clients');
        break;
      default:
        navigate('/');
    }
  };

  const navItems = ['Home', 'Books', 'Sales', 'Borrowings', 'Bookstores', 'Clients'];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-buttons">
          {navItems.map((item) => (
            <Button 
              key={item}
              onClick={() => handleNavigation(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;