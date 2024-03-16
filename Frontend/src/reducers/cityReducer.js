// cityReducer.js
import {
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAIL,
} from "../constants/userConstants";

const initialState = {
  cities: [],
  loading: false,
  error: null,
};

export const cityReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: payload,
        error: null,
      };
    case FETCH_CITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        cities: [],
      };
    default:
      return state;
  }
};
