import { GLOBALS } from '../globals';

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
    const token = sessionStorage.getItem('access_token');
    
    const response = await fetch(`${GLOBALS.API_BASE_URL}/clients`, {
      headers: token ? {
          'Authorization': `Bearer ${token}`
      } : {}
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('GET error:', response.status, errorText);
      throw new Error(`Failed to fetch clients: ${response.status}`);
    }
    return response.json();
  },

  async createClient(client: Omit<Client, '_id'>): Promise<Client> {
    const response = await fetch(`${GLOBALS.API_BASE_URL}/clients/`, {
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
    const response = await fetch(`${GLOBALS.API_BASE_URL}/clients/${clientId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete client');
  }
};