// reducers/index.js
import { combineReducers } from 'redux';


import userReducer from './userReducer';
import barberReducer from './barberReducer';
import adminReducer from './adminReducer';
import { cityReducer } from './cityReducer';

const rootReducer = combineReducers({
  user: userReducer,
  city: cityReducer,
  barber: barberReducer,
  admin: adminReducer
});

export default rootReducer;
