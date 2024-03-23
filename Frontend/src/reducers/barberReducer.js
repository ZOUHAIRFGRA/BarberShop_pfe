import {
  FETCH_BARBER_PROFILE_SUCCESS,
  FETCH_BARBER_PROFILE_FAILURE,
  UPDATE_BARBER_PROFILE_SUCCESS,
  UPDATE_BARBER_PROFILE_FAILURE,
  ADD_SERVICE_SUCCESS,
  ADD_SERVICE_FAILURE,
  FETCH_ALL_SERVICES_SUCCESS,
  FETCH_ALL_SERVICES_FAILURE,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE,
  CREATE_SLOTS_SUCCESS,
  CREATE_SLOTS_FAILURE,
  DELETE_SLOT_SUCCESS,
  DELETE_SLOT_FAILURE,
  UPDATE_SLOT_SUCCESS,
  UPDATE_SLOT_FAILURE,
  FETCH_ALL_SLOTS_SUCCESS,
  FETCH_ALL_SLOTS_FAILURE,
} from "../actions/barberActions";

const initialState = {
  profile: null,
  services: [],
  slots: [],
  error: null,
};

const barberReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_BARBER_SUCCESS":
    case "LOAD_BARBER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        error: null,
      };
    case "REGISTER_BARBER_FAILURE":
    case "LOGIN_BARBER_FAILURE":
    case "LOGOUT_BARBER_FAILURE":
    case "LOAD_BARBER_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_BARBER_SUCCESS":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case FETCH_BARBER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null,
      };
    case FETCH_BARBER_PROFILE_FAILURE:
    case UPDATE_BARBER_PROFILE_FAILURE:
    case ADD_SERVICE_FAILURE:
    case FETCH_ALL_SERVICES_FAILURE:
    case DELETE_SERVICE_FAILURE:
    case CREATE_SLOTS_FAILURE:
    case DELETE_SLOT_FAILURE:
    case UPDATE_SLOT_FAILURE:
    case FETCH_ALL_SLOTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_BARBER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null,
      };
    case ADD_SERVICE_SUCCESS:
      return {
        ...state,
        services: [...state.services, action.payload],
        error: null,
      };
    case FETCH_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
        error: null,
      };
    case DELETE_SERVICE_SUCCESS:
      return {
        ...state,
        services: state.services.filter(
          (service) => service._id !== action.payload
        ),
        error: null,
      };
    case CREATE_SLOTS_SUCCESS:
      return {
        ...state,
        slots: [...state.slots, ...action.payload],
        error: null,
      };
    case DELETE_SLOT_SUCCESS:
      return {
        ...state,
        slots: state.slots.filter((slot) => slot._id !== action.payload),
        error: null,
      };
    case UPDATE_SLOT_SUCCESS:
      return {
        ...state,
        slots: state.slots.map((slot) =>
          slot._id === action.payload._id ? action.payload : slot
        ),
        error: null,
      };
    case FETCH_ALL_SLOTS_SUCCESS:
      return {
        ...state,
        slots: action.payload,
        error: null,
      };
    case "UPDATE_SERVICE_FOR_BARBER_SUCCESS":
      return {
        ...state,
        // Update the services array with the updated service
        services: state.services.map((service) =>
          service._id === action.payload._id ? action.payload : service
        ),
        error: null,
      };
    case "UPDATE_SERVICE_FOR_BARBER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default barberReducer;
