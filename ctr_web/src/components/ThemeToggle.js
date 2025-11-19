import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/Actions/ThemeActions';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <button 
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <span className="theme-icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span className="theme-text">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;