import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import EntityManagement from './components/EntityManagement';
import Login from './components/Login';
import { authAPI } from './api/users';
import { loginUser, logoutUser } from './redux/Actions/UserActions';
import { fetchEntities } from './redux/Actions/EntityActions';
import EntityAPI from './api/service';
import store from './redux/store';
import './App.css';

const ThemeApplier = ({ children }) => {
  const { theme } = useSelector(state => state.theme);
  
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return children;
};

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      dispatch(loginUser(JSON.parse(savedUser)));
    }
    
    const allEntities = EntityAPI.all();
    dispatch(fetchEntities(allEntities));
  }, [dispatch]);

  const handleLogin = async (username, password) => {
    const user = await authAPI.login(username, password);
    dispatch(loginUser(user));
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleRegister = async (userData) => {
    const user = await authAPI.register(userData);
    return user;
  };

  const handleLogout = async () => {
    await authAPI.logout();
    dispatch(logoutUser());
    localStorage.removeItem('currentUser');
  };

  return (
    <ThemeApplier>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/entities" replace />
                ) : (
                  <Login onLogin={handleLogin} onRegister={handleRegister} />
                )
              } 
            />
            <Route 
              path="/entities" 
              element={
                isAuthenticated ? (
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
              element={<Navigate to={isAuthenticated ? "/entities" : "/login"} replace />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeApplier>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;