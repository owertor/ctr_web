import React from "react";

const Form = ({ 
  formData, 
  onSubmit, 
  onInputChange, 
  loading = false, 
  error = '' 
}) => {
  return (
    <div className="form-section">
      <h2>Add New Entity</h2>
      
      {error && (
        <div className="form-error">
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={onInputChange}
          disabled={loading}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={onInputChange}
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onInputChange}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <span className="btn-spinner"></span>
              Adding...
            </>
          ) : (
            'Add'
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;