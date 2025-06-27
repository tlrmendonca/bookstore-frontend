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
    let allBooks: Book[] = [];
    let cursor: string | null = null;

    while(true) {
        const response = await fetch(
            `${GLOBALS.API_BASE_URL}/books/?${cursor ? `cursor=${cursor}&` : ''}limit=20`
        )
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch books: ${response.status}\n${errorText}`);
        }

        const data = await response.json();
        allBooks = [...allBooks, ...data.books];

        if (!data.has_more) break;
        cursor = data.next_cursor;
    }

    console.log('Final result:', allBooks);
    return allBooks;
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