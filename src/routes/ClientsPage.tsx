import React, { useState, useEffect } from 'react';
import type { TableColumn, TableAction } from '../components/Table';
import Table from '../components/Table';
import IconBox from '../components/IconBox';
import Prompt from '../components/Prompt';
import SearchBar from '../components/SearchBar';
import ClientCard from '../components/ClientCard';
import ClientForm from '../components/ClientForm';
import type { Client } from '../api/Clients';
import { clientAPI } from '../api/Clients';
import './ClientsPage.css';

type ModalType = 'add' | 'search' | null;

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState<ModalType>(null);
  
  // Add client form state
  const [formLoading, setFormLoading] = useState(false);
  
  // Search state
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string>('');
  const [foundClient, setFoundClient] = useState<Client | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const fetchedClients = await clientAPI.getClients();
      setClients(fetchedClients);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClient = async (client: Client) => {
    try {
      await clientAPI.deleteClient(client._id);
      setClients(clients.filter(c => c._id !== client._id));
    } catch (err) {
      console.error('Error deleting client:', err);
    }
  };

  const handleAddClient = async (formData: Omit<Client, '_id'>) => {
    setFormLoading(true);
    try {
      console.log('Sending client data:', formData);
      const newClient = await clientAPI.createClient(formData);
      setClients([...clients, newClient]);
      setModalType(null);
    } catch (err) {
      console.error('Error creating client:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleSearch = async (email: string) => {
    setSearchLoading(true);
    setSearchError('');
    setFoundClient(null);
    
    try {
      // Search in existing clients by email
      const client = clients.find(c => c.email.toLowerCase() === email.toLowerCase());
      if (client) {
        setFoundClient(client);
      } else {
        setSearchError('No client found with this email');
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
    setFoundClient(null);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const columns: TableColumn[] = [
    { key: 'first_name', header: 'First Name', width: '20%' },
    { key: 'last_name', header: 'Last Name', width: '20%' },
    { key: 'email', header: 'Email', width: '35%' },
    { key: 'address', header: 'Address', width: '15%' },
    { key: 'is_active', header: 'Status', width: '10%' }
  ];

  const actions: TableAction[] = [
    {
      label: 'Delete',
      onClick: handleDeleteClient,
      className: 'delete'
    }
  ];

  // Format data for table display
  const tableData = clients.map(client => ({
    ...client,
    address: client.address || 'No address',
    is_active: client.is_active ? 'Active' : 'Inactive'
  }));

  return (
    <div className="clients-page">
      <div className="clients-container">
        <div className="clients-header">
          <h1 className="clients-title">Clients</h1>
          <p className="clients-subtitle">Manage your bookstore clients</p>
        </div>

        <div className="clients-actions">
          <IconBox icon="➕" onClick={() => setModalType('add')} />
          <IconBox icon="🔍" onClick={() => setModalType('search')} />
        </div>

        <div className="clients-content">
          <Table
            columns={columns}
            data={tableData}
            actions={actions}
            loading={loading}
          />
        </div>

        {/* Add Client Modal */}
        <Prompt isOpen={modalType === 'add'} onClose={closeModal}>
          <ClientForm onSubmit={handleAddClient} loading={formLoading} />
        </Prompt>

        {/* Search Modal */}
        <Prompt isOpen={modalType === 'search'} onClose={closeModal}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Search Client</h2>
          <SearchBar
            onSearch={handleSearch}
            loading={searchLoading}
            error={searchError}
            placeholder="Enter email to search..."
          />
          {foundClient && <ClientCard client={foundClient} />}
        </Prompt>
      </div>
    </div>
  );
};

export default Clients;