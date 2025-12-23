import React from "react";

const Table = ({ entities, onDelete, onEdit, deletingId }) => {
  if (entities.length === 0) {
    return null;
  }

  return (
    <div className="table-container">
      <table className="entities-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entities.map((entity) => {
            const isDeleting = deletingId === entity.id;
            
            return (
              <tr key={entity.id} className={isDeleting ? 'deleting' : ''}>
                <td>{entity.id}</td>
                <td>{entity.firstName}</td>
                <td>{entity.lastName}</td>
                <td>{entity.email}</td>
                <td>
                  <button
                    onClick={() => onEdit(entity)}
                    className="edit-btn"
                    disabled={isDeleting}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(entity.id)}
                    className="delete-btn"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <span className="btn-spinner"></span>
                        Deleting...
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;