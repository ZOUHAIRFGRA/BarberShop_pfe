import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
// Login User Action
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_USER_REQUEST" });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Send cookies along with the request
    };

    const { data } = await axios.post(`${API_URL}/auth/login`, { email, password }, config);
    // Set expiration time for localStorage
    const expirationTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    // Set isAuthenticated in localStorage
    localStorage.setItem("isUserAuthenticated", true);
    localStorage.setItem("authExpiration", expirationTime.getTime());
    dispatch({
      type: "LOGIN_USER_SUCCESS",
      payload: data.user
    });
    console.log(data.user)
  } catch (error) {
    dispatch({
      type: "LOGIN_USER_FAIL",
      payload: error.response.data.message
    });
  }
};

// Logout User Action
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${API_URL}/auth/logout`);
    localStorage.removeItem("isUserAuthenticated");
    localStorage.removeItem("authExpiration");
    dispatch({ type: "LOGOUT_USER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_USER_FAIL", payload: error.response.data.message });
  }
};

// Action to fetch cities
export const fetchCities = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/cities`);
    const data = response.data;
    dispatch({ type: "FETCH_CITIES_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_CITIES_FAIL", payload: error.message });
  }
};
export const fetchBarbers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/barbers`);
    // console.log('barbers',response)
    const data = response.data;
    // console.log(data)
    dispatch({ type: "FETCH_ALL_BARBERS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_ALL_BARBERS_FAIL", payload: error.message });
    console.log(error.message)
  }
};
export const getBarberById = (barberId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/barbers/${barberId}`);
    const data = response.data;
    dispatch({ type: 'GET_BARBER_BY_ID_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_BARBER_BY_ID_FAIL', payload: error.message });
  }
};

export const getBarberByNeighborhood = (city, neighborhood) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/barbers/${city}/${neighborhood}`);
    const data =  response.data;
    dispatch({ type: 'GET_BARBER_BY_NEIGHBORHOOD_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_BARBER_BY_NEIGHBORHOOD_FAIL', payload: error.message });
  }
};

export const fetchSlots = (barberId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/barber/${barberId}/slots`);
    dispatch({ type: 'FETCH_SLOTS_SUCCESS', payload: response.data.availableSlots });
  } catch (error) {
    dispatch({ type: 'FETCH_SLOTS_FAIL', payload: error.message });
  }
};
export const fetchAppointments = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/appointements`, { withCredentials: true });
    dispatch({ type: 'FETCH_APPOINTEMENTS_SUCCESS', payload:response.data.appointments });
  } catch (error) {
    dispatch({ type: 'FETCH_APPOINTEMENTS_FAIL', payload: error.message });
  }
};
export const fetchUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, { withCredentials: true });
    // console.log(response)
    dispatch({ type: 'FETCH_USER_SUCCESS', payload:response.data.user });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_FAIL', payload: error.message });
  }
};


export const updateUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/user/updateProfile`, userData, { withCredentials: true });
    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: response.data.message });
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAIL', payload: error.message });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, { withCredentials: true });
    // console.log(response)
    dispatch({ type: 'LOAD_USER_SUCCESS', payload:response.data.user });
  } catch (error) {
    dispatch({ type: 'LOAD_USER_FAIL', payload: error.message });
  }
};
export const fetchReviews = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_REVIEWS_REQUEST' });

    const response = await axios.get(`${API_URL}/user/barbers-reviews`);
    dispatch({
      type: 'FETCH_REVIEWS_SUCCESS',
      payload: response.data.reviews
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_REVIEWS_FAILURE',
      payload: error.message
    });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_USER_REQUEST' });

    const response = await axios.post(
      `${API_URL}/auth/register/user`,
      formData
    );

    dispatch({
      type: 'REGISTER_USER_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'REGISTER_USER_FAIL',
      payload: error.message,
    });
  }
};