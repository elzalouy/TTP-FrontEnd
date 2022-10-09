import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import categoriesSlice from "./Categories/categories.slice";
import clientsSlice from "./Clients/clients.slice";
import departmentsSlice from "./Departments/departments.slice";
import pmSlice from "./Managers/managers.slice";
import projectsSlice from "./Projects/projects.slice";
import techMembersSlice from "./TechMember/techMembers.slice";
import UISlice from "./Ui/UI.slice";
import NotifiSlice from "./Notifications/notifications.slice";
import authSlice from "./Auth/auth.slice";
import statisticsSlice from "./Statistics/statistics.slice";

const reducers = combineReducers({
  projects: projectsSlice,
  clients: clientsSlice,
  Managers: pmSlice,
  departments: departmentsSlice,
  categories: categoriesSlice,
  techMembers: techMembersSlice,
  Ui: UISlice,
  notifi: NotifiSlice,
  Auth: authSlice,
  Statistics: statisticsSlice,
});

const store = configureStore({
  reducer: reducers,
  middleware: [reduxThunk],
  devTools: process.env.NODE_ENV === "development" ? true : false,
});
export const myReducer = store.getState();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
