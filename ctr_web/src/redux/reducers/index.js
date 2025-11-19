import { combineReducers } from 'redux';
import userReducer from './userReducer';
import entitiesReducer from './entitiesReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  entities: entitiesReducer,
  theme: themeReducer
});

export default rootReducer;