import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
// Action Types
export const FETCH_BARBER_PROFILE_SUCCESS = "FETCH_BARBER_PROFILE_SUCCESS";
export const FETCH_BARBER_PROFILE_FAILURE = "FETCH_BARBER_PROFILE_FAILURE";
export const UPDATE_BARBER_PROFILE_SUCCESS = "UPDATE_BARBER_PROFILE_SUCCESS";
export const UPDATE_BARBER_PROFILE_FAILURE = "UPDATE_BARBER_PROFILE_FAILURE";
export const ADD_SERVICE_SUCCESS = "ADD_SERVICE_SUCCESS";
export const ADD_SERVICE_FAILURE = "ADD_SERVICE_FAILURE";
export const FETCH_ALL_SERVICES_SUCCESS = "FETCH_ALL_SERVICES_SUCCESS";
export const FETCH_ALL_SERVICES_FAILURE = "FETCH_ALL_SERVICES_FAILURE";
export const DELETE_SERVICE_SUCCESS = "DELETE_SERVICE_SUCCESS";
export const DELETE_SERVICE_FAILURE = "DELETE_SERVICE_FAILURE";
export const CREATE_SLOTS_SUCCESS = "CREATE_SLOTS_SUCCESS";
export const CREATE_SLOTS_FAILURE = "CREATE_SLOTS_FAILURE";
export const DELETE_SLOT_SUCCESS = "DELETE_SLOT_SUCCESS";
export const DELETE_SLOT_FAILURE = "DELETE_SLOT_FAILURE";
export const UPDATE_SLOT_SUCCESS = "UPDATE_SLOT_SUCCESS";
export const UPDATE_SLOT_FAILURE = "UPDATE_SLOT_FAILURE";
export const FETCH_ALL_SLOTS_SUCCESS = "FETCH_ALL_SLOTS_SUCCESS";
export const FETCH_ALL_SLOTS_FAILURE = "FETCH_ALL_SLOTS_FAILURE";

// Action Creators
export const loginBarber = (email, password) => async (dispatch) => {
  try {
    //   dispatch({ type: "LOGIN_BARBER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Send cookies along with the request
    };

    const { data } = await axios.post(
      `${API_URL}/auth/loginBarber`,
      { email, password },
      config
    );
    // Set expiration time for localStorage
    const expirationTime = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    // Set isAuthenticated in localStorage
    localStorage.setItem("isBarberAuthenticated", true);
    localStorage.setItem("authExpiration", expirationTime.getTime());
    dispatch({
      type: "LOGIN_BARBER_SUCCESS",
      payload: data.user,
    });
    // console.log(data)
  } catch (error) {
    dispatch({
      type: "LOGIN_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const registerBarber = (formData) => async (dispatch) => {
  try {

    const config = {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  };
    dispatch({ type: "REGISTER_BARBER_REQUEST" });

    const response = await axios.post(
      `${API_URL}/auth/register/barber`,
      formData,config
    );

    dispatch({
      type: "REGISTER_BARBER_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REGISTER_BARBER_FAIL",
      payload: error.message,
    });
  }
};
// Logout User Action
export const logoutBarber = () => async (dispatch) => {
  try {
    await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    localStorage.removeItem("isBarberAuthenticated");
    localStorage.removeItem("authExpiration");
    dispatch({ type: "LOGOUT_BARBER_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "LOGOUT_BARBER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const loadBarber = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/barber/getprofile`, {
      withCredentials: true,
    });
    // console.log(response)
    dispatch({ type: "LOAD_BARBER_SUCCESS", payload: response.data.barber });
  } catch (error) {
    dispatch({ type: "LOAD_BARBER_FAILURE", payload: error.message });
  }
};
export const fetchBarberProfile = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/barber/getprofile`, {
        withCredentials: true,
      });
      dispatch({ type: FETCH_BARBER_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_BARBER_PROFILE_FAILURE, payload: error.message });
    }
  };
};

export const updateBarberProfile = (updatedProfile) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }
      const response = await axios.put(
        `${API_URL}/barber/Updateprofile`,
        updatedProfile,
        { withCredentials: true },
        config
      );
      dispatch({ type: UPDATE_BARBER_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_BARBER_PROFILE_FAILURE, payload: error.message });
    }
  };
};

// Service Actions
export const addServiceToBarber = (serviceData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/barber/add-service`,
        serviceData,
        { withCredentials: true }
      );
      dispatch({ type: ADD_SERVICE_SUCCESS, payload: response.data.service });
    } catch (error) {
      dispatch({ type: ADD_SERVICE_FAILURE, payload: error.message });
    }
  };
};
export const updateServiceForBarber = (serviceId, serviceData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/barber/updateService/${serviceId}`,
        serviceData,
        { withCredentials: true }
      );
      // console.log(response)
      dispatch({ type: "UPDATE_SERVICE_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "UPDATE_SERVICE_FAILURE", payload: error.message });
    }
  };
};

export const fetchAllServicesForBarber = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/barber/getServices`, {
        withCredentials: true,
      });
      dispatch({ type: FETCH_ALL_SERVICES_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_SERVICES_FAILURE, payload: error.message });
    }
  };
};

export const deleteServiceForBarber = (serviceId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/barber/deleteService/${serviceId}`, {
        withCredentials: true,
      });
      dispatch({ type: DELETE_SERVICE_SUCCESS, payload: serviceId });
    } catch (error) {
      dispatch({ type: DELETE_SERVICE_FAILURE, payload: error.message });
    }
  };
};

// Fetch all appointments for barber
export const fetchAllAppointmentsForBarber = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/barber/getApp`, {
        withCredentials: true,
      });
      dispatch({
        type: "FETCH_ALL_APPOINTMENTS_SUCCESS",
        payload: response.data.appointments,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_ALL_APPOINTMENTS_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const fetchAvailableSlots = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_SLOTS_REQUEST" });

    try {
      const response = await axios.get(`${API_URL}/barber/getSlots`, {
        withCredentials: true,
      });
      dispatch({
        type: "FETCH_SLOTS_SUCCESS",
        payload: response.data.availableSlots,
      });
    } catch (error) {
      dispatch({ type: "FETCH_SLOTS_FAILURE", payload: error.message });
    }
  };
};
export const deleteAvailableSlot = (slotId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/barber/deleteSlots/${slotId}`, {
        withCredentials: true,
      });
      dispatch({ type: "DELETE_SLOT_SUCCESS", payload: slotId });
    } catch (error) {
      dispatch({ type: "DELETE_SLOT_FAILURE", payload: error.message });
    }
  };
};

export const updateAvailableSlot = (updatedSlots) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/barber/updateSlots`,
        { updatedSlots },
        { withCredentials: true }
      );
      dispatch({
        type: "UPDATE_SLOT_SUCCESS",
        payload: response.data.updatedSlots,
      });
    } catch (error) {
      dispatch({ type: "UPDATE_SLOT_FAILURE", payload: error.message });
    }
  };
};
export const createAvailableSlots = (slots) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/barber/createSlots`,
        { slots },
        { withCredentials: true }
      );
      dispatch({
        type: "CREATE_SLOTS_SUCCESS",
        payload: response.data.createdSlots,
      });
    } catch (error) {
      dispatch({ type: "CREATE_SLOTS_FAILURE", payload: error.message });
    }
  };
};
// Approve appointment
export const approveAppointment = (appointmentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${API_URL}/barber/appointments/approve/${appointmentId}`,
        null,
        { withCredentials: true }
      );
      dispatch({
        type: "APPROVE_APPOINTMENT_SUCCESS",
        payload: response.data.appointment,
      });
    } catch (error) {
      dispatch({ type: "APPROVE_APPOINTMENT_FAILURE", payload: error.message });
    }
  };
};

// Reject appointment
export const rejectAppointment = (appointmentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${API_URL}/barber/appointments/reject/${appointmentId}`,
        null,
        { withCredentials: true }
      );
      dispatch({
        type: "REJECT_APPOINTMENT_SUCCESS",
        payload: response.data.appointment,
      });
    } catch (error) {
      dispatch({ type: "REJECT_APPOINTMENT_FAILURE", payload: error.message });
    }
  };
};
// DONE appointment
export const flagAppointementAsDone = (appointmentId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${API_URL}/barber/appointments/done/${appointmentId}`,
        null,
        { withCredentials: true }
      );
      dispatch({
        type: "DONE_APPOINTMENT_SUCCESS",
        payload: response.data.appointment,
      });
    } catch (error) {
      dispatch({ type: "DONE_APPOINTMENT_FAILURE", payload: error.message });
    }
  };
};

export const reportReview = (reviewId) => {
  return async (dispatch) => {
    try {
      const response = await axios.patch(
        `${API_URL}/barber/report/${reviewId}`,
        null,
        { withCredentials: true }
      );
      dispatch({
        type: "REPORT_REVIEW_SUCCESS",
        payload: response.data.review,
      });
    } catch (error) {
      dispatch({ type: "REPORT_REVIEW_FAIL", payload: error.message });
    }
  };
};

// Slot Actions
export const createSlotsForBarber = (slotsData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API_URL}/barber/createSlots`,
        slotsData,
        { withCredentials: true }
      );
      dispatch({ type: CREATE_SLOTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: CREATE_SLOTS_FAILURE, payload: error.message });
    }
  };
};

export const deleteSlotForBarber = (slotId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/barber/deleteSlots/${slotId}`, {
        withCredentials: true,
      });
      dispatch({ type: DELETE_SLOT_SUCCESS, payload: slotId });
    } catch (error) {
      dispatch({ type: DELETE_SLOT_FAILURE, payload: error.message });
    }
  };
};

export const updateSlotForBarber = (slotId, updatedSlot) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/barber/updateSlots/${slotId}`,
        updatedSlot,
        { withCredentials: true }
      );
      dispatch({ type: UPDATE_SLOT_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: UPDATE_SLOT_FAILURE, payload: error.message });
    }
  };
};

export const fetchAllSlotsForBarber = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/barber/getSlots`, {
        withCredentials: true,
      });
      dispatch({ type: FETCH_ALL_SLOTS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FETCH_ALL_SLOTS_FAILURE, payload: error.message });
    }
  };
};

export const fetchReviews = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_REVIEWS_REQUEST" });
    try {
      const response = await axios.get(`${API_URL}/barber/getReviews`, {
        withCredentials: true,
      });
      // console.log("response from action",response)
      dispatch({
        type: "FETCH_REVIEWS_SUCCESS",
        payload: response.data.reviews,
      });
    } catch (error) {
      dispatch({ type: "FETCH_REVIEWS_FAILURE", payload: error.message });
    }
  };
};
