import { NotificationsState } from "../../types/models/Notificationss";

const NotifiState: NotificationsState = {
  loading: false,
  notifications: [],
  pages: 0,
  current: 0,
  limit: 10,
  error: null,
  unNotified: 0,
};
export default NotifiState;
