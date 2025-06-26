import { GLOBALS } from '../globals';

export interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  condition: string;
  price: number;
}

export const bookAPI = {
  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${GLOBALS.API_BASE_URL}/books`);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('GET error:', response.status, errorText);
      throw new Error(`Failed to fetch books: ${response.status}`);
    }
    return response.json();
  },

  async createBook(book: Omit<Book, '_id'>): Promise<Book> {
    const response = await fetch(`${GLOBALS.API_BASE_URL}/books/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.log('POST error:', response.status, errorText);
        throw new Error(`Failed to create book: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  async deleteBook(bookId: string): Promise<void> {
    const response = await fetch(`${GLOBALS.API_BASE_URL}/books/${bookId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete book');
  }
};