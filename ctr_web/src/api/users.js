export let users = [
  {
    id: 1,
    username: 'alex',
    password: 'alex123',
    email: 'alex@company.com',
    firstName: 'Alex',
    lastName: 'Johnson'
  },
  {
    id: 2,
    username: 'sarah',
    password: 'sarah123',
    email: 'sarah@company.com',
    firstName: 'Sarah',
    lastName: 'Miller'
  },
  {
    id: 3,
    username: 'mike',
    password: 'mike123',
    email: 'mike@company.com',
    firstName: 'Mike',
    lastName: 'Davis'
  }
];

export const authAPI = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid username or password'));
        }
      }, 1000);
    });
  },

  register: (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find(u => 
          u.username === userData.username || u.email === userData.email
        );
        
        if (existingUser) {
          reject(new Error('User with this username or email already exists'));
          return;
        }

        const newUser = {
          id: Math.max(...users.map(u => u.id)) + 1,
          username: userData.username,
          password: userData.password,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName || ''
        };

        users.push(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword);
      }, 1000);
    });
  },

  logout: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
};