// reducers/index.js
import { combineReducers } from 'redux';


import userReducer from './userReducer';
import barberReducer from './barberReducer';
import { cityReducer } from './cityReducer';

const rootReducer = combineReducers({
  user: userReducer,
  city: cityReducer,
  barber: barberReducer
});

export default rootReducer;
