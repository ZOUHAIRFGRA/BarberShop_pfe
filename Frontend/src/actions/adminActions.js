import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
// Login User Action

export const loadAdmin = () => async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/admin/profile`, { withCredentials: true });
      // console.log(response)
      dispatch({ type: 'LOAD_ADMIN_SUCCESS', payload:response.data.user });
    } catch (error) {
      dispatch({ type: 'LOAD_ADMIN_FAIL', payload: error.message });
    }
  };
export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_ADMIN_REQUEST" });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Send cookies along with the request
    };

    const { data } = await axios.post(`${API_URL}/auth/loginAdmin`, { email, password }, config);
    // Set expiration time for localStorage
    const expirationTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    // Set isAuthenticated in localStorage
    localStorage.setItem("isAdminAuthenticated", true);
    localStorage.setItem("authExpiration", expirationTime.getTime());
    dispatch({
      type: "LOGIN_ADMIN_SUCCESS",
      payload: data.user
    });
    console.log(data.user)
  } catch (error) {
    dispatch({
      type: "LOGIN_ADMIN_FAIL",
      payload: error.response.data.message
    });
  }
};

// Logout User Action
export const logoutAdmin = () => async (dispatch) => {
  try {
    await axios.get(`${API_URL}/auth/logout`);
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("authExpiration");
    dispatch({ type: "LOGOUT_ADMIN_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_ADMIN_FAIL", payload: error.response.data.message });
  }
};

export const createCity = (cityData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${API_URL}/admin/cities`, cityData, { withCredentials: true });
        dispatch({ type: "CREATE_CITY_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "CREATE_CITY_FAILURE", payload: error.message });
      }
    };
  };
  
  export const updateCity = (cityName, cityData) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`${API_URL}/admin/cities/${cityName}`, cityData, { withCredentials: true });
        dispatch({ type: "UPDATE_CITY_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "UPDATE_CITY_FAILURE", payload: error.message });
      }
    };
  };
  
  export const getAllCities = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/admin/cities`, { withCredentials: true });
        dispatch({ type: "GET_ALL_CITIES_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "GET_ALL_CITIES_FAILURE", payload: error.message });
      }
    };
  };
  export const getAllBarbers = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/admin/barbers`, { withCredentials: true });
        dispatch({ type: "GET_ALL_BARBERS_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "GET_ALL_BARBERS_FAILURE", payload: error.message });
      }
    };
  };

  export const deleteBarber = (barberId) => {
    return async (dispatch) => {
      try {
        // Send DELETE request to the server to delete the barber
        await axios.delete(`${API_URL}/admin/barbers/${barberId}`,{ withCredentials: true });
        // Dispatch success action if deletion is successful
        dispatch({ type: 'DELETE_BARBER_SUCCESS', payload: barberId });
      } catch (error) {
        // Dispatch failure action if an error occurs
        dispatch({ type: 'DELETE_BARBER_FAILURE', payload: error.message });
      }
    };
  };
  
  export const getAllReviews = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/admin/reviews`,{ withCredentials: true });
        dispatch({ type: 'GET_ALL_REVIEWS_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'GET_ALL_REVIEWS_FAILURE', payload: error.message });
      }
    };
  };
  
  export const deleteReview = (reviewId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`${API_URL}/admin/reviews/${reviewId}`,{ withCredentials: true });
        dispatch({ type: 'DELETE_REVIEW_SUCCESS', payload: reviewId });
      } catch (error) {
        dispatch({ type: 'DELETE_REVIEW_FAILURE', payload: error.message });
      }
    };
  };
  export const getAllUsers = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/admin/users`,{ withCredentials: true });
        dispatch({ type: 'GET_ALL_USERS_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'GET_ALL_USERS_FAILURE', payload: error.message });
      }
    };
  };
  
  export const deleteUser = (userId) => {
    return async (dispatch) => {
      try {
        await axios.delete(`${API_URL}/admin/users/${userId}`,{ withCredentials: true });
        dispatch({ type: 'DELETE_USER_SUCCESS', payload: userId });
      } catch (error) {
        dispatch({ type: 'DELETE_USER_FAILURE', payload: error.message });
      }
    };
  };

 // actionCreators.js
export const addNeighborhood = (cityName, neighborhood) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${API_URL}/admin/city/add-neighborhood`, { cityName, neighborhood },{ withCredentials: true });
        dispatch({ type: "ADD_NEIGHBORHOOD_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "ADD_NEIGHBORHOOD_FAILURE", payload: error.message });
      }
    };
  };
  
  
  export const deleteCity = (cityName) => {
    return async (dispatch) => {
      try {
        await axios.delete(`${API_URL}/admin/cities/${cityName}`, { withCredentials: true });
        dispatch({ type: "DELETE_CITY_SUCCESS", payload: cityName });
      } catch (error) {
        dispatch({ type: "DELETE_CITY_FAILURE", payload: error.message });
      }
    };
  };