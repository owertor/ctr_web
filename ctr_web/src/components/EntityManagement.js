import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import EditModal from './EditModal';
import SearchBar from './SearchBar';
import EntityAPI from '../api/service';

const EntityManagement = ({ currentUser, onLogout }) => {
  const [entities, setEntities] = useState([]);
  const [filteredEntities, setFilteredEntities] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [editingEntity, setEditingEntity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const allEntities = EntityAPI.all();
    setEntities(allEntities);
    setFilteredEntities(allEntities);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEntities(entities);
    } else {
      const filtered = entities.filter(entity =>
        entity.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.id.toString().includes(searchTerm)
      );
      setFilteredEntities(filtered);
    }
  }, [searchTerm, entities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    EntityAPI.add(formData);
    const allEntities = EntityAPI.all();
    setEntities(allEntities);
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const handleDelete = (id) => {
    EntityAPI.delete(id);
    const allEntities = EntityAPI.all();
    setEntities(allEntities);
  };

  const handleEdit = (id) => {
    const entityToEdit = EntityAPI.get(id);
    if (entityToEdit) {
      setEditingEntity(entityToEdit);
      setIsModalOpen(true);
    }
  };

  const handleUpdate = (updatedEntity) => {
    EntityAPI.edit(editingEntity.id, updatedEntity);
    const allEntities = EntityAPI.all();
    setEntities(allEntities);
    setIsModalOpen(false);
    setEditingEntity(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntity(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="app-content">
      <div className="header-with-user">
        <h1><span>Entity</span> Management</h1>
        <div className="user-info">
          <span>Welcome, {currentUser.firstName}!</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
      
      <Form 
        formData={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      <div className="table-section">
        <div className="section-header">
          <h2>Entities List</h2>
          <SearchBar 
            searchTerm={searchTerm}
            onSearch={handleSearch}
            onClear={handleClearSearch}
            totalCount={entities.length}
            filteredCount={filteredEntities.length}
          />
        </div>
        
        {entities.length === 0 ? (
          <p>No entities found</p>
        ) : filteredEntities.length === 0 ? (
          <div className="no-results">
            <p>No entities found matching your search.</p>
            <button onClick={handleClearSearch} className="clear-search-btn">
              Clear search
            </button>
          </div>
        ) : (
          <Table 
            entities={filteredEntities} 
            onDelete={handleDelete} 
            onEdit={handleEdit}
          />
        )}
      </div>

      {isModalOpen && (
        <EditModal
          entity={editingEntity}
          onUpdate={handleUpdate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EntityManagement;