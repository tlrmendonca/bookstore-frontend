import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GLOBALS } from './globals';
import Frontpage from './routes/Frontpage';
import Books from './routes/BooksPage';
import Borrowings from './routes/BorrowingsPage';
import Clients from './routes/ClientsPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const login = async () => {
      try {
        // Auto-login with hardcoded password
        const response = await fetch(`${GLOBALS.API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'password' })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
          // Store token for other API calls
          sessionStorage.setItem('access_token', data.access_token);
        } else {
          const errorText = await response.text();
          console.error('Login failed:', response.status, errorText);
          // Store empty token to avoid further login attempts
          sessionStorage.setItem('access_token', '');
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setLoading(false);
      }
    };

    login();
  }, []);

  // Show loading screen while authenticating
  if (loading) {
    return <div>Authenticating...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/borrowings" element={<Borrowings />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;