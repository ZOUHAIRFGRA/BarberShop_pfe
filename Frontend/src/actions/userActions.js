import axios from 'axios';
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAIL,
  FETCH_ALL_BARBERS_SUCCESS,
  FETCH_ALL_BARBERS_FAIL
  
} from '../constants/userConstants';

// Login User Action
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Send cookies along with the request
    };

    const { data } = await axios.post('http://localhost:4000/auth/login', { email, password }, config);

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message
    });
  }
};

// Logout User Action
export const logoutUser = () => async (dispatch) => {
  try {
    // Clear the token cookie by setting it to null and expiring it immediately
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    await axios.post('http://localhost:4000/auth/logout');
    dispatch({ type: LOGOUT_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message
    });
  }
};

// Action to fetch cities
export const fetchCities = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/user/cities');
    const data = response.data;
    dispatch({ type: FETCH_CITIES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_CITIES_FAIL, payload: error.message });
  }
};
export const fetchBarbers = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:4000/user/barbers');
    const data = response.data;
    dispatch({ type: FETCH_ALL_BARBERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ALL_BARBERS_FAIL, payload: error.message });
  }
};
export const getBarberById = (barberId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4000/user/barbers/${barberId}`);
    const data = response.data;
    dispatch({ type: 'GET_BARBER_BY_ID_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_BARBER_BY_ID_FAIL', payload: error.message });
  }
};

export const getBarberByNeighborhood = (city, neighborhood) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4000/user/barbers/${city}/${neighborhood}`);
    const data =  response.data;
    dispatch({ type: 'GET_BARBER_BY_NEIGHBORHOOD_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'GET_BARBER_BY_NEIGHBORHOOD_FAIL', payload: error.message });
  }
};

export const fetchSlots = (barberId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4000/user/barber/${barberId}/slots`);
    dispatch({ type: 'FETCH_SLOTS_SUCCESS', payload: response.data.availableSlots });
  } catch (error) {
    dispatch({ type: 'FETCH_SLOTS_FAIL', payload: error.message });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'REGISTER_USER_REQUEST' });

    const response = await axios.post(
      "http://localhost:4000/auth/register/user",
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