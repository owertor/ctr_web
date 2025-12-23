import React, { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import EntityManagement from './components/EntityManagement';
import Login from './components/Login';
import { authAPI } from './api/users';
import { loginUser, logoutUser } from './redux/Actions/UserActions';
import { initializeTheme } from './redux/Actions/ThemeActions';
import { getTheme } from './theme';
import store from './redux/store';
import './App.css';

function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated, currentUser } = useSelector(state => state.user);
  const { theme: themeMode } = useSelector(state => state.theme);

  // Создаём тему MUI на основе текущего режима
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  // Инициализация темы
  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  // Восстановление сессии пользователя
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      dispatch(loginUser(JSON.parse(savedUser)));
    }
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
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
      </Router>
    </ThemeProvider>
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