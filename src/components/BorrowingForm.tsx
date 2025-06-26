import React, { useState } from 'react';
import type { Borrowing } from '../api/Borrowings';
import './BorrowingForm.css';

interface BorrowingFormData {
  borrower_id: string;
  source_type: 'bookstore' | 'client';
  source_id: string;
  book_id: string;
  borrow_date: string;
  due_date: string;
  return_date?: string;
  status: 'active' | 'returned' | 'overdue' | 'returned_overdue';
}

interface BorrowingFormProps {
  onSubmit: (formData: Omit<Borrowing, '_id'>) => Promise<void>;
  loading?: boolean;
}

const BorrowingForm: React.FC<BorrowingFormProps> = ({ onSubmit, loading }) => {
  const today = new Date().toISOString().split('T')[0];
  const defaultDueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 2 weeks from today

  const [formData, setFormData] = useState<BorrowingFormData>({
    borrower_id: '',
    source_type: 'bookstore',
    source_id: '',
    book_id: '',
    borrow_date: today,
    due_date: defaultDueDate,
    status: 'active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData: Omit<Borrowing, '_id'> = {
        ...formData,
        borrow_date: new Date(formData.borrow_date).toISOString(),
        due_date: new Date(formData.due_date).toISOString(),
        return_date: formData.return_date ? new Date(formData.return_date).toISOString() : undefined
      };
      await onSubmit(submitData);
      setFormData({
        borrower_id: '',
        source_type: 'bookstore',
        source_id: '',
        book_id: '',
        borrow_date: today,
        due_date: defaultDueDate,
        status: 'active'
      });
    } catch (error) {
      // Don't reset form on error - let parent handle error display
    }
  };

  const handleChange = (field: keyof BorrowingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="borrowingform">
      <h2 className="borrowingform-title">Add New Borrowing</h2>
      <form onSubmit={handleSubmit}>
        <div className="borrowingform-field">
          <label className="borrowingform-label">Borrower ID</label>
          <input
            type="text"
            value={formData.borrower_id}
            onChange={(e) => handleChange('borrower_id', e.target.value)}
            className="borrowingform-input"
            required
          />
        </div>
        
        <div className="borrowingform-field">
          <label className="borrowingform-label">Source Type</label>
          <select
            value={formData.source_type}
            onChange={(e) => handleChange('source_type', e.target.value as 'bookstore' | 'client')}
            className="borrowingform-select"
          >
            <option value="bookstore">Bookstore</option>
            <option value="client">Client</option>
          </select>
        </div>
        
        <div className="borrowingform-field">
          <label className="borrowingform-label">Source ID</label>
          <input
            type="text"
            value={formData.source_id}
            onChange={(e) => handleChange('source_id', e.target.value)}
            className="borrowingform-input"
            required
          />
        </div>
        
        <div className="borrowingform-field">
          <label className="borrowingform-label">Book ID</label>
          <input
            type="text"
            value={formData.book_id}
            onChange={(e) => handleChange('book_id', e.target.value)}
            className="borrowingform-input"
            required
          />
        </div>
        
        <div className="borrowingform-field">
          <label className="borrowingform-label">Borrow Date</label>
          <input
            type="date"
            value={formData.borrow_date}
            onChange={(e) => handleChange('borrow_date', e.target.value)}
            className="borrowingform-input"
            required
          />
        </div>
        
        <div className="borrowingform-field">
          <label className="borrowingform-label">Due Date</label>
          <input
            type="date"
            value={formData.due_date}
            onChange={(e) => handleChange('due_date', e.target.value)}
            className="borrowingform-input"
            required
          />
        </div>
        
        <div className="borrowingform-field">
          <label className="borrowingform-label">Return Date (Optional)</label>
          <input
            type="date"
            value={formData.return_date || ''}
            onChange={(e) => handleChange('return_date', e.target.value)}
            className="borrowingform-input"
          />
        </div>
        
        <div className="borrowingform-field">
          <label className="borrowingform-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as any)}
            className="borrowingform-select"
          >
            <option value="active">Active</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
            <option value="returned_overdue">Returned Overdue</option>
          </select>
        </div>

        <div style={{ height: '1rem' }}></div>
        
        <button
          type="submit"
          className="borrowingform-submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default BorrowingForm;