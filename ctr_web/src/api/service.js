const EntityAPI = {
  entities: [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com' }
  ],
  
  all: function() {
    return this.entities;
  },
  
  get: function(id) {
    const isEntity = (e) => e.id === id;
    return this.entities.find(isEntity);
  },
  
  delete: function(id) {
    const isNotDelEntity = (e) => e.id !== id;
    this.entities = this.entities.filter(isNotDelEntity);
    return;
  },
  
  add: function(entity) {
    const newId = this.entities.length > 0 ? Math.max(...this.entities.map(e => e.id)) + 1 : 1;
    const newEntity = { ...entity, id: newId };
    this.entities.push(newEntity);
    return newEntity;
  },
  
  edit: function(id, updatedEntity) {
    const index = this.entities.findIndex(e => e.id === id);
    if (index !== -1) {
      this.entities[index] = { ...this.entities[index], ...updatedEntity };
      return this.entities[index];
    }
    return null;
  }
};

export default EntityAPI;