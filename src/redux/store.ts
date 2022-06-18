import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import categoriesSlice from "./Categories/categories.slice";
import clientsSlice from "./Clients/clients.slice";
import departmentsSlice from "./Departments/departments.slice";
import pmSlice from "./PM/pm.slice";
import projectsSlice from "./Projects/projects.slice";
import techMembersSlice from "./techMember/techMembers.slice";
import UISlice from "./Ui/UI.slice";
import NotifiSlice from "./Notification/notifi.slice";
import authSlice from "./Auth/auth.slice";
import statisticsSlice from "./Statistics/statistics.slice";

const reducers = combineReducers({
  projects: projectsSlice,
  clients: clientsSlice,
  PMs: pmSlice,
  departments: departmentsSlice,
  categories: categoriesSlice,
  techMembers: techMembersSlice,
  Ui: UISlice,
  notifi: NotifiSlice,
  Auth: authSlice,
  Statistics: statisticsSlice,
});
const store = configureStore({ reducer: reducers, middleware: [reduxThunk] });
export const myReducer = store.getState()
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
