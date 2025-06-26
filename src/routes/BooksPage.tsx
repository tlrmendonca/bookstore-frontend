import React, { useState, useEffect } from 'react';
import type { TableColumn, TableAction } from '../components/Table';
import Table from '../components/Table';
import IconBox from '../components/IconBox';
import Prompt from '../components/Prompt';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookForm from '../components/BookForm';
import type { Book } from '../api/Books';
import { bookAPI } from '../api/Books';
import './BooksPage.css';

type ModalType = 'add' | 'search' | null;

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<ModalType>(null);
  
  // Add book form state
  const [formLoading, setFormLoading] = useState(false);
  
  // Search state
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>('');
  const [foundBook, setFoundBook] = useState<Book | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const fetchedBooks = await bookAPI.getBooks();
      const processedBooks = fetchedBooks.map(book => ({
        ...book,
        genre: book.genre || 'No genre'
      }));
      setBooks(processedBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (book: Book) => {
    try {
      await bookAPI.deleteBook(book._id);
      setBooks(books.filter(b => b._id !== book._id));
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  const handleAddBook = async (formData: Omit<Book, '_id'>) => {
    setFormLoading(true);
    try {
      console.log('Sending book data:', formData);
      const newBook = await bookAPI.createBook(formData);
      setBooks([...books, newBook]);
      setModalType(null);
    } catch (err) {
      console.error('Error creating book:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSearch = async (isbn: string) => {
    setSearchLoading(true);
    setSearchError('');
    setFoundBook(null);
    
    try {
      // Search in existing books by ISBN
      const book = books.find(b => b.isbn === isbn);
      if (book) {
        setFoundBook(book);
      } else {
        setSearchError('No book found with this ISBN');
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
    setFoundBook(null);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const columns: TableColumn[] = [
    { key: 'title', header: 'Title', width: '20%' },
    { key: 'author', header: 'Author', width: '20%' },
    { key: 'isbn', header: 'ISBN', width: '15%' },
    { key: 'genre', header: 'Genre', width: '15%' },
    { key: 'condition', header: 'Condition', width: '15%' },
    { key: 'price', header: 'Price', width: '15%' }
  ];

  const actions: TableAction[] = [
    {
      label: 'Delete',
      onClick: handleDeleteBook,
      className: 'delete'
    }
  ];

  return (
    <div className="books-page">
      <div className="books-container">
        <div className="books-header">
          <h1 className="books-title">Books</h1>
          <p className="books-subtitle">Manage your bookstore inventory</p>
        </div>

        <div className="books-actions">
          <IconBox icon="➕" onClick={() => setModalType('add')} />
          <IconBox icon="🔍" onClick={() => setModalType('search')} />
        </div>

        <div className="books-content">
          <Table
            columns={columns}
            data={books}
            actions={actions}
            loading={loading}
          />
        </div>

        {/* Add Book Modal */}
        <Prompt isOpen={modalType === 'add'} onClose={closeModal}>
          <BookForm onSubmit={handleAddBook} loading={formLoading} />
        </Prompt>

        {/* Search Modal */}
        <Prompt isOpen={modalType === 'search'} onClose={closeModal}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Search Book</h2>
          <SearchBar
            onSearch={handleSearch}
            loading={searchLoading}
            error={searchError}
            placeholder="Enter ISBN to search..."
          />
          {foundBook && <BookCard book={foundBook} />}
        </Prompt>
      </div>
    </div>
  );
};

export default Books;