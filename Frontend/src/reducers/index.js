// reducers/index.js
import { combineReducers } from 'redux';


import userReducer from './userReducer';
import { cityReducer } from './cityReducer';
const rootReducer = combineReducers({
   auth: userReducer,
  city: cityReducer,
});

export default rootReducer;
