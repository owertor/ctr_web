import { 
    FETCH_ENTITIES, 
    ADD_ENTITY, 
    UPDATE_ENTITY, 
    DELETE_ENTITY,
    SET_SEARCH_TERM 
  } from '../Actions/ActionsTypes';
  
  const initialState = {
    entities: [],
    searchTerm: '',
    filteredEntities: []
  };
  
  const entitiesReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ENTITIES:
        return {
          ...state,
          entities: action.payload,
          filteredEntities: action.payload
        };
      case ADD_ENTITY:
        const newEntities = [...state.entities, action.payload];
        return {
          ...state,
          entities: newEntities,
          filteredEntities: filterEntities(newEntities, state.searchTerm)
        };
      case UPDATE_ENTITY:
        const updatedEntities = state.entities.map(entity =>
          entity.id === action.payload.id 
            ? { ...entity, ...action.payload.entity } 
            : entity
        );
        return {
          ...state,
          entities: updatedEntities,
          filteredEntities: filterEntities(updatedEntities, state.searchTerm)
        };
      case DELETE_ENTITY:
        const filteredEntities = state.entities.filter(entity => entity.id !== action.payload);
        return {
          ...state,
          entities: filteredEntities,
          filteredEntities: filterEntities(filteredEntities, state.searchTerm)
        };
      case SET_SEARCH_TERM:
        return {
          ...state,
          searchTerm: action.payload,
          filteredEntities: filterEntities(state.entities, action.payload)
        };
      default:
        return state;
    }
  };
  
  const filterEntities = (entities, searchTerm) => {
    if (!searchTerm.trim()) return entities;
    
    return entities.filter(entity =>
      entity.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.id.toString().includes(searchTerm)
    );
  };
  
  export default entitiesReducer;