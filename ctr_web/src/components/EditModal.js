import React, { useState, useEffect } from 'react';

const EditModal = ({ entity, onUpdate, onClose, loading = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (entity) {
      setFormData({
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email
      });
    }
  }, [entity]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    onUpdate(formData);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Entity</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-firstName">First Name:</label>
            <input
              type="text"
              id="edit-firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-lastName">Last Name:</label>
            <input
              type="text"
              id="edit-lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-email">Email:</label>
            <input
              type="email"
              id="edit-email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
          <div className="modal-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="update-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;