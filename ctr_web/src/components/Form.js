import React from "react";

const Form = ({ formData, onSubmit, onInputChange, editingId, onCancelEdit }) => {
  return (
    <div className="form-section">
      <h2>{editingId ? 'Edit Entity' : 'Add New Entity'}</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={onInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onInputChange}
        />
        <button type="submit">
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button type="button" onClick={onCancelEdit} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;