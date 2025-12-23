import { SET_THEME } from './ActionsTypes';

// Синхронный action creator (внутренний)
const setThemeAction = (theme) => ({
  type: SET_THEME,
  payload: theme
});

// Thunk action creator с side effect
export const setTheme = (theme) => {
  return (dispatch) => {
    // Side effect ЗДЕСЬ, не в reducer
    localStorage.setItem('theme', theme);
    
    // Затем dispatch чистого action
    dispatch(setThemeAction(theme));
  };
};

// Thunk для инициализации темы при загрузке
export const initializeTheme = () => {
  return (dispatch) => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      dispatch(setThemeAction(savedTheme));
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(setThemeAction('dark'));
    } else {
      dispatch(setThemeAction('light'));
    }
  };
};