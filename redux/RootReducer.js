import { combineReducers } from "redux";
import TestReducer from './test/TestReducer';
import AuthReducer from './auth/AuthReducer';




const RootReducers = combineReducers({
 
  TestReducer,
  AuthReducer,
 
});

export default RootReducers;