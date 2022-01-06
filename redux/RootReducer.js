import { combineReducers } from "redux";
import TestReducer from './test/TestReducer';
import AuthReducer from './auth/AuthReducer';
import ConversationReducer from './conversation/ConversationReducer';


const RootReducers = combineReducers({
  TestReducer,
  AuthReducer,
  ConversationReducer,
});

export default RootReducers;