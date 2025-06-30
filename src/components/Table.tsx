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
  actionCount?: number; // Number of action buttons expected, default 1
}

const Table: React.FC<TableProps> = ({ columns, data, actions, loading, actionCount = 1 }) => {
  const actionsWidth = `${actionCount * 8}%`;
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
              <th className="table-header-cell" style={{ width: actionsWidth }}>Actions</th>
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
                      {actions.map((action, actionIndex) => {
                        const isReturnButton = action.className?.includes('return');
                        const isDisabled = isReturnButton && !row.canReturn;
                        const buttonClass = isDisabled 
                          ? `table-action-button ${action.className} disabled`
                          : `table-action-button ${action.className || ''}`;
                        const buttonText = isReturnButton && isDisabled ? 'Returned' : action.label;
                        
                        return (
                          <button
                            key={actionIndex}
                            onClick={() => !isDisabled && action.onClick(row)}
                            className={buttonClass}
                          >
                            {buttonText}
                          </button>
                        );
                      })}
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