import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';
import EntityAPI from './api/service';
import './App.css';

function App() {
  const [entities, setEntities] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    setEntities(EntityAPI.all());
  }, []);

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
    setEntities(EntityAPI.all());
    
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  const handleDelete = (id) => {
    EntityAPI.delete(id);
    setEntities(EntityAPI.all());
  };

  return (
    <div className="App">
      <h1>Entity Management</h1>
      
      <Form 
        formData={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      <div className="table-section">
        <h2>Entities List</h2>
        {entities.length === 0 ? (
          <p>No entities found</p>
        ) : (
          <Table entities={entities} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default App;