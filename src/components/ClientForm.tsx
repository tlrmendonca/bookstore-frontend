import React, { useState } from 'react';
import type { Client } from '../api/Clients';
import './ClientForm.css';

interface ClientFormData {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  is_active: boolean;
}

interface ClientFormProps {
  onSubmit: (formData: Omit<Client, '_id'>) => Promise<void>;
  loading?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<ClientFormData>({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    is_active: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData: Omit<Client, '_id'> = {
        ...formData,
        address: formData.address || undefined
      };
      await onSubmit(submitData);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        is_active: true
      });
    } catch (error) {
      // Don't reset form on error - let parent handle error display
    }
  };

  const handleChange = (field: keyof ClientFormData, value: string) => {
    if (field === 'is_active') {
      setFormData(prev => ({ ...prev, [field]: value === 'true' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="clientform">
      <h2 className="clientform-title">Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="clientform-field">
          <label className="clientform-label">First Name</label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            className="clientform-input"
            required
          />
        </div>
        
        <div className="clientform-field">
          <label className="clientform-label">Last Name</label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            className="clientform-input"
            required
          />
        </div>
        
        <div className="clientform-field">
          <label className="clientform-label">Email</label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="clientform-input"
            required
          />
        </div>
        
        <div className="clientform-field">
          <label className="clientform-label">Address (Optional)</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="clientform-textarea"
            rows={3}
          />
        </div>
        
        <div className="clientform-field">
          <label className="clientform-label">Status</label>
          <select
            value={formData.is_active.toString()}
            onChange={(e) => handleChange('is_active', e.target.value)}
            className="clientform-select"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div style={{ height: '1rem' }}></div>
        
        <button
          type="submit"
          className="clientform-submit"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;