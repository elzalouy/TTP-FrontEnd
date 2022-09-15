import { NotificationsState } from "../../../src/types/models/Notifications";

const NotifiState: NotificationsState = {
  loading: false,
  buttonLoading:false,
  notifications: [],
  pages: 0,
  current: 0,
  limit: 10,
  error: null,
  unNotified: 0,
};
export default NotifiState;
