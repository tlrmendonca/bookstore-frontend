import React from 'react';
import type { Book } from '../api/Books';
import './BookCard.css';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const getConditionClass = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new': return 'new';
      case 'good': return 'good';
      case 'poor': return 'poor';
      case 'very poor': return 'very-poor';
      default: return 'good';
    }
  };

  return (
    <div className="bookcard">
      <h3 className="bookcard-title">{book.title}</h3>
      <p className="bookcard-author">by {book.author}</p>
      
      <div className="bookcard-details">
        <div className="bookcard-detail">
          <span className="bookcard-label">ISBN</span>
          <span className="bookcard-value">{book.isbn}</span>
        </div>
        <div className="bookcard-detail">
          <span className="bookcard-label">Genre</span>
          <span className="bookcard-value">{book.genre || 'No genre'}</span>
        </div>
      </div>
      
      <div className="bookcard-detail">
        <span className="bookcard-label">Condition</span>
        <span className={`bookcard-condition ${getConditionClass(book.condition)}`}>
          {book.condition}
        </span>
      </div>
    </div>
  );
};

export default BookCard;