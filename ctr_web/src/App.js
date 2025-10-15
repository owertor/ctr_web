import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EntityManagement from './components/EntityManagement';
import Login from './components/Login';
import { authAPI } from './api/users';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username, password) => {
    const user = await authAPI.login(username, password);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleRegister = async (userData) => {
    const user = await authAPI.register(userData);
    return user;
  };

  const handleLogout = async () => {
    await authAPI.logout();
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner large"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              currentUser ? (
                <Navigate to="/entities" replace />
              ) : (
                <Login onLogin={handleLogin} onRegister={handleRegister} />
              )
            } 
          />
          <Route 
            path="/entities" 
            element={
              currentUser ? (
                <EntityManagement 
                  currentUser={currentUser} 
                  onLogout={handleLogout} 
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={currentUser ? "/entities" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;