import { GLOBALS } from '../globals';

export interface Borrowing {
  _id: string;
  borrower_id: string;
  source_type: 'bookstore' | 'client';
  source_id: string;
  book_id: string;
  borrow_date: string; // ISO string
  due_date: string; // ISO string
  return_date?: string; // ISO string, optional
  status: 'active' | 'returned' | 'overdue' | 'returned_overdue';
}

export const borrowingAPI = {
  async getBorrowings(): Promise<Borrowing[]> {
    const response = await fetch(`${GLOBALS.API_BASE_URL}/borrowings`);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('GET error:', response.status, errorText);
      throw new Error(`Failed to fetch borrowings: ${response.status}`);
    }
    return response.json();
  },

  async createBorrowing(borrowing: Omit<Borrowing, '_id'>): Promise<Borrowing> {
    const response = await fetch(`${GLOBALS.API_BASE_URL}/borrowings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(borrowing)
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.log('POST error:', response.status, errorText);
        throw new Error(`Failed to create borrowing: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  async deleteBorrowing(borrowingId: string): Promise<void> {
    const response = await fetch(`${GLOBALS.API_BASE_URL}/borrowings/${borrowingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete borrowing');
  }
};