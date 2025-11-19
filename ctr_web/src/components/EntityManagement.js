import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from './Table';
import Form from './Form';
import EditModal from './EditModal';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import EntityAPI from '../api/service';
import { 
  fetchEntities, 
  addEntity, 
  updateEntity, 
  deleteEntity, 
  setSearchTerm 
} from '../redux/Actions/EntityActions'; 

const EntityManagement = ({ currentUser, onLogout }) => {
  const dispatch = useDispatch();
  const { entities, filteredEntities, searchTerm } = useSelector(state => state.entities);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [editingEntity, setEditingEntity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const allEntities = EntityAPI.all();
    dispatch(fetchEntities(allEntities));
  }, [dispatch]);

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

    const newEntity = EntityAPI.add(formData);
    dispatch(addEntity(newEntity));
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const handleDelete = (id) => {
    EntityAPI.delete(id);
    dispatch(deleteEntity(id));
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
    dispatch(updateEntity(editingEntity.id, updatedEntity));
    setIsModalOpen(false);
    setEditingEntity(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEntity(null);
  };

  const handleSearch = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <div className="app-content">
      <div className="header-with-user">
        <h1><span>Entity</span> Management</h1>
        <div className="header-controls">
          <ThemeToggle />
          <div className="user-info">
            <span>Welcome, {currentUser.firstName}!</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
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