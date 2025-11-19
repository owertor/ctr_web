import { 
    FETCH_ENTITIES, 
    ADD_ENTITY, 
    UPDATE_ENTITY, 
    DELETE_ENTITY,
    SET_SEARCH_TERM 
  } from './ActionsTypes';
  
  export const fetchEntities = (entities) => ({
    type: FETCH_ENTITIES,
    payload: entities
  });
  
  export const addEntity = (entity) => ({
    type: ADD_ENTITY,
    payload: entity
  });
  
  export const updateEntity = (id, entity) => ({
    type: UPDATE_ENTITY,
    payload: { id, entity }
  });
  
  export const deleteEntity = (id) => ({
    type: DELETE_ENTITY,
    payload: id
  });
  
  export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term
  });