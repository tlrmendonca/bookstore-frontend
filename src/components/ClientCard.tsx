import React from 'react';
import type { Client } from '../api/Clients';
import './ClientCard.css';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  const getStatusClass = (isActive: boolean) => {
    return isActive ? 'active' : 'inactive';
  };

  const formatStatus = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive';
  };

  return (
    <div className="clientcard">
      <h3 className="clientcard-title">{client.first_name} {client.last_name}</h3>
      <p className="clientcard-email">{client.email}</p>
      
      {client.address && (
        <div className="clientcard-detail">
          <span className="clientcard-label">Address</span>
          <span className="clientcard-value">{client.address}</span>
        </div>
      )}
      
      <div className="clientcard-detail">
        <span className="clientcard-label">Status</span>
        <span className={`clientcard-status ${getStatusClass(client.is_active)}`}>
          {formatStatus(client.is_active)}
        </span>
      </div>
    </div>
  );
};

export default ClientCard;