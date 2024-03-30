// adminReducer.js
const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  cities: [],
  barbers: [],
  error: null,
  reviews: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ADMIN_REQUEST":
    case "LOAD_ADMIN_REQUEST":
      return { ...state, loading: true };

    case "LOGIN_ADMIN_SUCCESS":
    case "LOAD_ADMIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case "LOGIN_ADMIN_FAIL":
    case "LOAD_ADMIN_FAIL":
    case "LOGOUT_ADMIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_ADMIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CREATE_CITY_SUCCESS":
      return {
        ...state,
        cities: [...state.cities, action.payload.city],
        error: null,
      };
    case "CREATE_CITY_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPDATE_CITY_SUCCESS":
      // Update city success case
      return {
        ...state,
        cities: state.cities.map((city) => {
          if (city.name === action.payload.city.name) {
            return action.payload.city;
          } else {
            return city;
          }
        }),
        error: null,
      };
    case "UPDATE_CITY_FAILURE":
      // Update city failure case
      return {
        ...state,
        error: action.payload,
      };
    case "GET_ALL_CITIES_SUCCESS":
      // Get all cities success case
      return {
        ...state,
        cities: action.payload.cities,
        error: null,
      };
    case "GET_ALL_CITIES_FAILURE":
      // Get all cities failure case
      return {
        ...state,
        error: action.payload,
      };
    case "GET_ALL_BARBERS_SUCCESS":
      // Get all cities success case
      return {
        ...state,
        barbers: action.payload,
        error: null,
      };
    case "GET_ALL_BARBERS_FAILURE":
      // Get all cities failure case
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_BARBER_SUCCESS":
      return {
        ...state,
        // Filter out the deleted barber from the barbers array
        barbers: state.barbers.filter(
          (barber) => barber._id !== action.payload
        ),
        error: null,
      };
    case "DELETE_BARBER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_ALL_REVIEWS_SUCCESS":
      return {
        ...state,
        reviews: action.payload,
        error: null,
      };
    case "GET_ALL_REVIEWS_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_REVIEW_SUCCESS":
      return {
        ...state,
        reviews: state.reviews.filter(
          (review) => review._id !== action.payload
        ),
        error: null,
      };
    case "DELETE_REVIEW_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_ALL_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        error: null,
      };
    case "GET_ALL_USERS_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
        error: null,
      };
    case "DELETE_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    case "ADD_NEIGHBORHOOD_SUCCESS":
      // Add neighborhood success case
      return {
        ...state,
        cities: state.cities.map((city) => {
          if (city.name === action.payload.city.name) {
            return action.payload.city;
          } else {
            return city;
          }
        }),
        error: null,
      };
    case "ADD_NEIGHBORHOOD_FAILURE":
      // Add neighborhood failure case
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_CITY_SUCCESS":
      // Delete city success case
      return {
        ...state,
        cities: state.cities.filter((city) => city.name !== action.payload),
        error: null,
      };
    case "DELETE_CITY_FAILURE":
      // Delete city failure case
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
