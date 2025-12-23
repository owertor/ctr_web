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
} from '../Actions/ActionsTypes';

const initialState = {
  entities: [],
  searchTerm: '',
  loading: false,
  adding: false,
  updating: false,
  deletingIds: [],
  error: null
};

const entitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ===== FETCH =====
    case FETCH_ENTITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_ENTITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: action.payload,
        error: null
      };

    case FETCH_ENTITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // ===== ADD =====
    case ADD_ENTITY_REQUEST:
      return {
        ...state,
        adding: true,
        error: null
      };

    case ADD_ENTITY_SUCCESS:
      return {
        ...state,
        adding: false,
        entities: [...state.entities, action.payload],
        error: null
      };

    case ADD_ENTITY_FAILURE:
      return {
        ...state,
        adding: false,
        error: action.payload
      };

    // ===== UPDATE =====
    case UPDATE_ENTITY_REQUEST:
      return {
        ...state,
        updating: true,
        error: null
      };

    case UPDATE_ENTITY_SUCCESS:
      return {
        ...state,
        updating: false,
        entities: state.entities.map(entity =>
          entity.id === action.payload.id ? action.payload : entity
        ),
        error: null
      };

    case UPDATE_ENTITY_FAILURE:
      return {
        ...state,
        updating: false,
        error: action.payload
      };

    // ===== DELETE ONE =====
    case DELETE_ENTITY_REQUEST:
      return {
        ...state,
        deletingIds: [action.payload],
        error: null
      };

    case DELETE_ENTITY_SUCCESS:
      return {
        ...state,
        deletingIds: [],
        entities: state.entities.filter(entity => entity.id !== action.payload),
        error: null
      };

    case DELETE_ENTITY_FAILURE:
      return {
        ...state,
        deletingIds: [],
        error: action.payload
      };

    // ===== DELETE MANY =====
    case DELETE_MANY_ENTITIES_REQUEST:
      return {
        ...state,
        deletingIds: action.payload,
        error: null
      };

    case DELETE_MANY_ENTITIES_SUCCESS:
      return {
        ...state,
        deletingIds: [],
        entities: state.entities.filter(entity => !action.payload.includes(entity.id)),
        error: null
      };

    case DELETE_MANY_ENTITIES_FAILURE:
      return {
        ...state,
        deletingIds: [],
        error: action.payload
      };

    // ===== SEARCH =====
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };

    // ===== CLEAR ERROR =====
    case CLEAR_ENTITY_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default entitiesReducer;