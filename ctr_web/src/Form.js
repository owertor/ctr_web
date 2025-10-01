import React from "react";

const Form = ({ formData, onSubmit, onInputChange }) => {
  return (
    <div className="form-section">
      <h2>Add New Entity</h2>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Form;