import {
  FETCH_ENTITIES_REQUEST,
  FETCH_ENTITIES_SUCCESS,
  FETCH_ENTITIES_FAILURE,
  ADD_ENTITY_REQUEST,
  ADD_ENTITY_SUCCESS,
  ADD_ENTITY_FAILURE,
  UPDATE_ENTITY_REQUEST,
  UPDATE_ENTITY_SUCCESS,
  UPDATE_ENTITY_FAILURE,
  DELETE_ENTITY_REQUEST,
  DELETE_ENTITY_SUCCESS,
  DELETE_ENTITY_FAILURE,
  DELETE_MANY_ENTITIES_REQUEST,
  DELETE_MANY_ENTITIES_SUCCESS,
  DELETE_MANY_ENTITIES_FAILURE,
  SET_SEARCH_TERM,
  CLEAR_ENTITY_ERROR
} from './ActionsTypes';
import EntityAPI from '../../api/service';

// ===== FETCH ENTITIES =====
export const fetchEntities = () => async (dispatch) => {
  dispatch({ type: FETCH_ENTITIES_REQUEST });

  try {
    const entities = await EntityAPI.all();
    dispatch({
      type: FETCH_ENTITIES_SUCCESS,
      payload: entities
    });
  } catch (error) {
    dispatch({
      type: FETCH_ENTITIES_FAILURE,
      payload: error.message
    });
  }
};

// ===== ADD ENTITY =====
export const addEntity = (entityData) => async (dispatch) => {
  dispatch({ type: ADD_ENTITY_REQUEST });

  try {
    const newEntity = await EntityAPI.add(entityData);
    dispatch({
      type: ADD_ENTITY_SUCCESS,
      payload: newEntity
    });
    return { success: true, entity: newEntity };
  } catch (error) {
    dispatch({
      type: ADD_ENTITY_FAILURE,
      payload: error.message
    });
    return { success: false, error: error.message };
  }
};

// ===== UPDATE ENTITY =====
export const updateEntity = (id, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_ENTITY_REQUEST });

  try {
    const updatedEntity = await EntityAPI.edit(id, updatedData);
    dispatch({
      type: UPDATE_ENTITY_SUCCESS,
      payload: updatedEntity
    });
    return { success: true, entity: updatedEntity };
  } catch (error) {
    dispatch({
      type: UPDATE_ENTITY_FAILURE,
      payload: error.message
    });
    return { success: false, error: error.message };
  }
};

// ===== DELETE ENTITY =====
export const deleteEntity = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ENTITY_REQUEST, payload: id });

  try {
    await EntityAPI.delete(id);
    dispatch({
      type: DELETE_ENTITY_SUCCESS,
      payload: id
    });
    return { success: true };
  } catch (error) {
    dispatch({
      type: DELETE_ENTITY_FAILURE,
      payload: error.message
    });
    return { success: false, error: error.message };
  }
};

// ===== DELETE MANY ENTITIES =====
export const deleteManyEntities = (ids) => async (dispatch) => {
  dispatch({ type: DELETE_MANY_ENTITIES_REQUEST, payload: ids });

  try {
    await EntityAPI.deleteMany(ids);
    dispatch({
      type: DELETE_MANY_ENTITIES_SUCCESS,
      payload: ids
    });
    return { success: true };
  } catch (error) {
    dispatch({
      type: DELETE_MANY_ENTITIES_FAILURE,
      payload: error.message
    });
    return { success: false, error: error.message };
  }
};

// ===== SEARCH =====
export const setSearchTerm = (term) => ({
  type: SET_SEARCH_TERM,
  payload: term
});

// ===== CLEAR ERROR =====
export const clearEntityError = () => ({
  type: CLEAR_ENTITY_ERROR
});