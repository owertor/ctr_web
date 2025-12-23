const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const EntityAPI = {
  entities: [
    { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      email: 'john.doe@example.com',
      age: 32,
      hireDate: '2020-03-15'
    },
    { 
      id: 2, 
      firstName: 'Jane', 
      lastName: 'Smith', 
      email: 'jane.smith@example.com',
      age: 28,
      hireDate: '2021-07-22'
    },
    { 
      id: 3, 
      firstName: 'Bob', 
      lastName: 'Johnson', 
      email: 'bob.johnson@example.com',
      age: 45,
      hireDate: '2019-01-10'
    },
    { 
      id: 4, 
      firstName: 'Alice', 
      lastName: 'Williams', 
      email: 'alice.williams@example.com',
      age: 35,
      hireDate: '2018-11-05'
    },
    { 
      id: 5, 
      firstName: 'Charlie', 
      lastName: 'Brown', 
      email: 'charlie.brown@example.com',
      age: 26,
      hireDate: '2022-02-28'
    },
    { 
      id: 6, 
      firstName: 'Diana', 
      lastName: 'Ross', 
      email: 'diana.ross@example.com',
      age: 41,
      hireDate: '2017-06-12'
    },
    { 
      id: 7, 
      firstName: 'Edward', 
      lastName: 'Norton', 
      email: 'edward.norton@example.com',
      age: 38,
      hireDate: '2020-09-01'
    },
    { 
      id: 8, 
      firstName: 'Fiona', 
      lastName: 'Apple', 
      email: 'fiona.apple@example.com',
      age: 29,
      hireDate: '2021-04-18'
    },
    { 
      id: 9, 
      firstName: 'George', 
      lastName: 'Miller', 
      email: 'george.miller@example.com',
      age: 52,
      hireDate: '2015-08-20'
    },
    { 
      id: 10, 
      firstName: 'Helen', 
      lastName: 'Troy', 
      email: 'helen.troy@example.com',
      age: 33,
      hireDate: '2019-12-03'
    }
  ],

  all: async function() {
    await delay(800);
    return [...this.entities];
  },

  get: async function(id) {
    await delay(500);
    const entity = this.entities.find(e => e.id === id);
    if (!entity) {
      throw new Error(`Entity with id ${id} not found`);
    }
    return { ...entity };
  },

  add: async function(entity) {
    await delay(600);
    
    if (!entity.firstName || !entity.email) {
      throw new Error('First name and email are required');
    }
    
    const existingEmail = this.entities.find(
      e => e.email.toLowerCase() === entity.email.toLowerCase()
    );
    if (existingEmail) {
      throw new Error('Entity with this email already exists');
    }
    
    const newId = this.entities.length > 0 
      ? Math.max(...this.entities.map(e => e.id)) + 1 
      : 1;
    
    const newEntity = { 
      ...entity, 
      id: newId,
      hireDate: entity.hireDate || new Date().toISOString().split('T')[0]
    };
    this.entities.push(newEntity);
    
    return { ...newEntity };
  },

  edit: async function(id, updatedEntity) {
    await delay(600);
    
    const index = this.entities.findIndex(e => e.id === id);
    
    if (index === -1) {
      throw new Error(`Entity with id ${id} not found`);
    }
    
    if (updatedEntity.email) {
      const existingEmail = this.entities.find(
        e => e.email.toLowerCase() === updatedEntity.email.toLowerCase() && e.id !== id
      );
      if (existingEmail) {
        throw new Error('Entity with this email already exists');
      }
    }
    
    this.entities[index] = { ...this.entities[index], ...updatedEntity };
    
    return { ...this.entities[index] };
  },

  delete: async function(id) {
    await delay(500);
    
    const index = this.entities.findIndex(e => e.id === id);
    
    if (index === -1) {
      throw new Error(`Entity with id ${id} not found`);
    }
    
    this.entities = this.entities.filter(e => e.id !== id);
    
    return { success: true, id };
  },

  deleteMany: async function(ids) {
    await delay(700);
    
    this.entities = this.entities.filter(e => !ids.includes(e.id));
    
    return { success: true, ids };
  }
};

export default EntityAPI;