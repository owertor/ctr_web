import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from './Registration';
import ThemeToggle from './ThemeToggle';

const Login = ({ onLogin, onRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await onLogin(formData.username, formData.password);
      navigate('/entities');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      await onRegister(userData);
      setShowRegistration(false);
      await onLogin(userData.username, userData.password);
      navigate('/entities');
    } catch (err) {
      throw err; 
    }
  };

  if (showRegistration) {
    return (
      <Registration 
        onRegister={handleRegister}
        onSwitchToLogin={() => setShowRegistration(false)}
      />
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>📁 Entity Management System</h1>
          <p>Please sign in to continue</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <ThemeToggle />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>First time here? </p>
          <button 
            onClick={() => setShowRegistration(true)}
            className="create-account-link"
            type="button"
          >
            Create your account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;