import React, { useState, useEffect } from 'react';
import type { TableColumn, TableAction } from '../components/Table';
import Table from '../components/Table';
import IconBox from '../components/IconBox';
import Prompt from '../components/Prompt';
import SearchBar from '../components/SearchBar';
import BorrowingCard from '../components/BorrowingCard';
import BorrowingForm from '../components/BorrowingForm';
import type { Borrowing } from '../api/Borrowings';
import { borrowingAPI } from '../api/Borrowings';
import './BorrowingsPage.css';

type ModalType = 'add' | 'search' | null;

const Borrowings: React.FC = () => {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<ModalType>(null);
  
  // Add borrowing form state
  const [formLoading, setFormLoading] = useState(false);
  
  // Search state
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>('');
  const [foundBorrowing, setFoundBorrowing] = useState<Borrowing | null>(null);

  const fetchBorrowings = async () => {
    try {
      setLoading(true);
      const fetchedBorrowings = await borrowingAPI.getBorrowings();
      setBorrowings(fetchedBorrowings);
    } catch (err) {
      console.error('Error fetching borrowings:', err);
      setBorrowings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBorrowing = async (borrowing: Borrowing) => {
    try {
      await borrowingAPI.deleteBorrowing(borrowing._id);
      setBorrowings(borrowings.filter(b => b._id !== borrowing._id));
    } catch (err) {
      console.error('Error deleting borrowing:', err);
    }
  };

  const handleReturnBorrowing = async (borrowing: Borrowing) => {
    // Only allow return for active and overdue borrowings
    if (borrowing.status !== 'active' && borrowing.status !== 'overdue') {
      return;
    }
    
    try {
      const updatedBorrowing = await borrowingAPI.returnBorrowing(borrowing._id);
      setBorrowings(borrowings.map(b => 
        b._id === borrowing._id ? updatedBorrowing : b
      ));
    } catch (err) {
      console.error('Error returning borrowing:', err);
    }
  };

  const handleAddBorrowing = async (formData: Omit<Borrowing, '_id'>) => {
    setFormLoading(true);
    try {
      console.log('Sending borrowing data:', formData);
      const newBorrowing = await borrowingAPI.createBorrowing(formData);
      setBorrowings([...borrowings, newBorrowing]);
      setModalType(null);
    } catch (err) {
      console.error('Error creating borrowing:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSearch = async (borrowerId: string) => {
    setSearchLoading(true);
    setSearchError('');
    setFoundBorrowing(null);
    
    try {
      // Search in existing borrowings by borrower ID
      const borrowing = borrowings.find(b => b.borrower_id === borrowerId);
      if (borrowing) {
        setFoundBorrowing(borrowing);
      } else {
        setSearchError('No borrowing found for this borrower ID');
      }
    } catch (err) {
      setSearchError('Search failed. Please try again.');
    } finally {
      setSearchLoading(false);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSearchError('');
    setFoundBorrowing(null);
  };

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const columns: TableColumn[] = [
    { key: 'borrower_id', header: 'Borrower ID', width: '14%' },
    { key: 'source_type', header: 'Source Type', width: '10%' },
    { key: 'source_id', header: 'Source ID', width: '12%' },
    { key: 'book_id', header: 'Book ID', width: '12%' },
    { key: 'borrow_date', header: 'Borrow Date', width: '11%' },
    { key: 'due_date', header: 'Due Date', width: '11%' },
    { key: 'statusDisplay', header: 'Status', width: '14%' }
  ];

  const actions: TableAction[] = [
    {
      label: 'Return',
      onClick: handleReturnBorrowing,
      className: 'return'
    },
    {
      label: 'Delete',
      onClick: handleDeleteBorrowing,
      className: 'delete'
    }
  ];

  // Format data for table display
  const tableData = borrowings.map(borrowing => {
    const isReturned = borrowing.status === 'returned' || borrowing.status === 'returned_overdue';
    return {
      ...borrowing,
      borrow_date: formatDate(borrowing.borrow_date),
      due_date: formatDate(borrowing.due_date),
      statusDisplay: borrowing.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()), // Display version only
      canReturn: !isReturned
    };
  });

  return (
    <div className="borrowings-page">
      <div className="borrowings-container">
        <div className="borrowings-header">
          <h1 className="borrowings-title">Borrowings</h1>
          <p className="borrowings-subtitle">Manage your bookstore borrowings</p>
        </div>

        <div className="borrowings-actions">
          <IconBox icon="➕" onClick={() => setModalType('add')} />
          <IconBox icon="🔍" onClick={() => setModalType('search')} />
        </div>

        <div className="borrowings-content">
          <Table
            columns={columns}
            data={tableData}
            actions={actions}
            actionCount={2}
            loading={loading}
          />
        </div>

        {/* Add Borrowing Modal */}
        <Prompt isOpen={modalType === 'add'} onClose={closeModal}>
          <BorrowingForm onSubmit={handleAddBorrowing} loading={formLoading} />
        </Prompt>

        {/* Search Modal */}
        <Prompt isOpen={modalType === 'search'} onClose={closeModal}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Search Borrowing</h2>
          <SearchBar
            onSearch={handleSearch}
            loading={searchLoading}
            error={searchError}
            placeholder="Enter borrower ID to search..."
          />
          {foundBorrowing && <BorrowingCard borrowing={foundBorrowing} />}
        </Prompt>
      </div>
    </div>
  );
};

export default Borrowings;