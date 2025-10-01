import React from "react";

const Table = ({ entities, onDelete }) => {
  return (
    <table className="entities-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {entities.map((entity) => {
          return (
            <tr key={entity.id}>
              <td>{entity.id}</td>
              <td>{entity.firstName}</td>
              <td>{entity.lastName}</td>
              <td>{entity.email}</td>
              <td>
                <button 
                  onClick={() => onDelete(entity.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;