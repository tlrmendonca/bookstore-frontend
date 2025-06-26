import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Frontpage from './routes/Frontpage';
import Books from './routes/BooksPage';
import Borrowings from './routes/BorrowingsPage';
import Clients from './routes/ClientsPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/borrowings" element={<Borrowings />} />
          <Route path="/clients" element={<Clients />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;