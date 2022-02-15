import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// import { USER_LOGOUT } from "./auth/types";

export const appReducer = combineReducers({});

export const rootReducer = (state: any, action: any) => {
  // there is error in import so I add true temporary

  // if (action.type === USER_LOGOUT ) {
  if (true) {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }
};
