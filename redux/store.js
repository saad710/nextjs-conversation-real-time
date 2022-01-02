import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducers from "./RootReducer";

export function configureStore(InitialState) {
  const Store = createStore(
    RootReducers,
    InitialState,
   applyMiddleware(thunk)
  );
  return Store;
}