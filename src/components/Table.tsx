import React from 'react';
import './Table.css';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

export interface TableAction {
  label: string;
  onClick: (row: any) => void;
  className?: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  actions?: TableAction[];
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({ columns, data, actions, loading }) => {
  if (loading) {
    return (
      <div className="table-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead className="table-header">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="table-header-cell"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="table-header-cell">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length + (actions?.length ? 1 : 0)} 
                style={{ padding: '2rem', textAlign: 'center', color: 'black' }}
              >
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="table-row">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {row[column.key]}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="table-cell">
                    <div className="table-actions">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={`table-action-button ${action.className || ''}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;