import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// import { USER_LOGOUT } from "./auth/types";

export const appReducer = combineReducers({

});

export const rootReducer = (state : any , action : any) => {
  // if (action.type === USER_LOGOUT) {
      storage.removeItem('persist:root');
      return appReducer(undefined, action);
  // }
};

