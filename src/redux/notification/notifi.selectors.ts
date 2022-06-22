import { RootState } from "../store";
import _ from "lodash";
export const notifiDataSelector = (state: RootState) =>
  state?.notifi?.notifi;

  export const counterNotif = (state: RootState) =>
  state?.notifi?.counter;

  export const selectHideLoading = (state:RootState) => state?.notifi?.hideLoading;

  export const loadingNotification = (state : RootState) => state?.notifi?.loading