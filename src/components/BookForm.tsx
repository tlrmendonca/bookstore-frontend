import React, { useState } from 'react';
import type { Book } from '../api/Books';
import './BookForm.css';

interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  condition: string;
  price: number;
}

interface BookFormProps {
  onSubmit: (formData: Omit<Book, '_id'>) => Promise<void>;
  loading?: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    condition: 'New',
    price: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ title: '', author: '', isbn: '', genre: '', condition: 'New', price: 0 });
    } catch (error) {
      // Don't reset form on error - let parent handle error display
    }
  };

  const handleChange = (field: keyof BookFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bookform">
      <h2 className="bookform-title">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="bookform-field">
          <label className="bookform-label">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bookform-input"
            required
          />
        </div>
        
        <div className="bookform-field">
          <label className="bookform-label">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="bookform-input"
            required
          />
        </div>
        
        <div className="bookform-field">
          <label className="bookform-label">ISBN</label>
          <input
            type="text"
            value={formData.isbn}
            onChange={(e) => handleChange('isbn', e.target.value)}
            className="bookform-input"
            required
          />
        </div>
        
        <div className="bookform-field">
          <label className="bookform-label">Genre</label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => handleChange('genre', e.target.value)}
            className="bookform-input"
          />
        </div>
        
        <div className="bookform-field">
          <label className="bookform-label">Condition</label>
          <select
            value={formData.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
            className="bookform-select"
          >
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Poor">Poor</option>
            <option value="Very Poor">Very Poor</option>
          </select>
        </div>
        
        <div className="bookform-field">
          <label className="bookform-label">Price</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            className="bookform-input"
          />
        </div>

        <div style={{ height: '1rem' }}></div>
        
        <button
          type="submit"
          className="bookform-submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;