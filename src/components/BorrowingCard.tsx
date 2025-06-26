import React from 'react';
import type { Borrowing } from '../api/Borrowings';
import './BorrowingCard.css';

interface BorrowingCardProps {
  borrowing: Borrowing;
}

const BorrowingCard: React.FC<BorrowingCardProps> = ({ borrowing }) => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'active';
      case 'returned': return 'returned';
      case 'overdue': return 'overdue';
      case 'returned_overdue': return 'returned-overdue';
      default: return 'active';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="borrowingcard">
      <h3 className="borrowingcard-title">Borrowing Details</h3>
      
      <div className="borrowingcard-details">
        <div className="borrowingcard-detail">
          <span className="borrowingcard-label">Borrower ID</span>
          <span className="borrowingcard-value">{borrowing.borrower_id}</span>
        </div>
        <div className="borrowingcard-detail">
          <span className="borrowingcard-label">Book ID</span>
          <span className="borrowingcard-value">{borrowing.book_id}</span>
        </div>
        <div className="borrowingcard-detail">
          <span className="borrowingcard-label">Source Type</span>
          <span className="borrowingcard-value">{borrowing.source_type}</span>
        </div>
        <div className="borrowingcard-detail">
          <span className="borrowingcard-label">Source ID</span>
          <span className="borrowingcard-value">{borrowing.source_id}</span>
        </div>
        <div className="borrowingcard-detail">
          <span className="borrowingcard-label">Borrow Date</span>
          <span className="borrowingcard-value">{formatDate(borrowing.borrow_date)}</span>
        </div>
        <div className="borrowingcard-detail">
          <span className="borrowingcard-label">Due Date</span>
          <span className="borrowingcard-value">{formatDate(borrowing.due_date)}</span>
        </div>
        {borrowing.return_date && (
          <div className="borrowingcard-detail">
            <span className="borrowingcard-label">Return Date</span>
            <span className="borrowingcard-value">{formatDate(borrowing.return_date)}</span>
          </div>
        )}
      </div>
      
      <div className="borrowingcard-detail">
        <span className="borrowingcard-label">Status</span>
        <span className={`borrowingcard-status ${getStatusClass(borrowing.status)}`}>
          {formatStatus(borrowing.status)}
        </span>
      </div>
    </div>
  );
};

export default BorrowingCard;