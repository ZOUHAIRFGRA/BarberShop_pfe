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
  success: false,
  reviews: [],
  appointements: [],
  userData: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
    case "LOAD_USER_REQUEST":
    case "FETCH_SLOTS_REQUEST":
    case "FETCH_APPOINTEMENTS_REQUEST":
    case "FETCH_USER_REQUEST":
    case "REGISTER_USER_REQUEST":
      return { ...state, loading: true };

    case "LOGIN_USER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case "LOGIN_USER_FAIL":
    case "LOAD_USER_FAIL":
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOGOUT_USER_FAIL":
    case "FETCH_ALL_BARBERS_FAIL":
    case "GET_BARBER_BY_ID_FAIL":
    case "GET_BARBER_BY_NEIGHBORHOOD_FAIL":
    case "FETCH_SLOTS_FAIL":
    case "FETCH_APPOINTEMENTS_FAIL":
    case "FETCH_USER_FAIL":
    case "UPDATE_USER_FAIL":
    case "FETCH_REVIEWS_FAILURE":
    case "REGISTER_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "FETCH_ALL_BARBERS_SUCCESS":
      return {
        ...state,
        loading: false,
        barbers: action.payload,
        error: null,
      };

    case "GET_BARBER_BY_ID_SUCCESS":
      return {
        ...state,
        selectedBarber: action.payload,
        dataFetched: true,
      };

    case "GET_BARBER_BY_NEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        barberByNeighborhood: action.payload,
        dataFetched: true,
      };

    case "FETCH_SLOTS_SUCCESS":
      return {
        ...state,
        loading: false,
        slots: action.payload,
        error: null,
      };

    case "FETCH_APPOINTEMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        appointements: action.payload,
        error: null,
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userData: action.payload,
        error: null,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        userData: { ...state.userData, message: action.payload },
        error: null,
      };

    case "FETCH_REVIEWS_SUCCESS":
      return {
        ...state,
        loading: false,
        reviews: action.payload,
        error: null,
      };

    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        success: true,
      };

    default:
      return state;
  }
};

export default userReducer;
