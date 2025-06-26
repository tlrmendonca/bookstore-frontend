const API_BASE = 'http://localhost:8000';

export interface Client {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  address?: string;
  is_active: boolean;
}

export const clientAPI = {
  async getClients(): Promise<Client[]> {
    const response = await fetch(`${API_BASE}/clients`);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('GET error:', response.status, errorText);
      throw new Error(`Failed to fetch clients: ${response.status}`);
    }
    return response.json();
  },

  async createClient(client: Omit<Client, '_id'>): Promise<Client> {
    const response = await fetch(`${API_BASE}/clients/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.log('POST error:', response.status, errorText);
        throw new Error(`Failed to create client: ${response.status} - ${errorText}`);
    }
    return response.json();
  },

  async deleteClient(clientId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/clients/${clientId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete client');
  }
};