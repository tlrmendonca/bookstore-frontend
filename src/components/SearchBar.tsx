import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
  loading?: boolean;
  error?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  loading, 
  error, 
  placeholder = "Enter search term..." 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await onSearch(query.trim());
    }
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit} className="searchbar-wrapper">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`searchbar-input ${error ? 'error' : ''}`}
          disabled={loading}
        />
        <button
          type="submit"
          className="searchbar-button"
          disabled={loading || !query.trim()}
        >
          {loading ? '...' : '→'}
        </button>
      </form>
      {error && <div className="searchbar-error">{error}</div>}
    </div>
  );
};

export default SearchBar;