import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  FETCH_ALL_BARBERS_SUCCESS,
  FETCH_ALL_BARBERS_FAIL,
} from "../constants/userConstants";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  selectedBarber: null,
  dataFetched: false,
  error: null,
  barberByNeighborhood: [],
  barbers: [],
  slots: [],
  success: false// Add an initial state for barbers
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_ALL_BARBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        barbers: action.payload,
        error: null,
      };
    case FETCH_ALL_BARBERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        barbers: [],
      };
    case "GET_BARBER_BY_ID_SUCCESS":
      return {
        ...state,
        selectedBarber: action.payload,
        dataFetched: true,
      };
    case "GET_BARBER_BY_ID_FAIL":
      return {
        ...state,
        selectedBarber: null,
        dataFetched: true, // Ensure dataFetched is set to true even in case of failure
        error: action.payload,
      };
    case "GET_BARBER_BY_NEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        barberByNeighborhood: action.payload,
        dataFetched: true,
      };
    case "GET_BARBER_BY_NEIGHBORHOOD_FAIL":
      return {
        ...state,
        barberByNeighborhood: [],
        dataFetched: true, // Ensure dataFetched is set to true even in case of failure
        error: action.payload,
      };
    case "FETCH_SLOTS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SLOTS_SUCCESS":
      return { ...state, loading: false, slots: action.payload, error: null };
    case "FETCH_SLOTS_FAIL":
      return { ...state, loading: false, error: action.payload };
      case 'REGISTER_USER_REQUEST':
        return { ...state, loading: true };
      case 'REGISTER_USER_SUCCESS':
        return { ...state, loading: false, error: null,success: true };
      case 'REGISTER_USER_FAIL':
        return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export default userReducer;
