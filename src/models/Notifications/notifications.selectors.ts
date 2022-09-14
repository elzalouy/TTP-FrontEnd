import { RootState } from "../store";
import _ from "lodash";
export const selectNotificationsLoading = (state: RootState) =>
  state.notifi.loading;
export const selectNotifications = (state: RootState) =>
  state.notifi.notifications;
  
export const selectNotificationPagination = (state: RootState) => {
  return {
    limit: state.notifi.limit,
    pages: state.notifi.pages,
    current: state.notifi.current,
  };
};
export const selectUnNotifiedNum = (state: RootState) =>
  state.notifi.unNotified;
