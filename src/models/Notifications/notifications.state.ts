import { NotificationsState } from "../../../src/types/models/Notifications";

const NotifiState: NotificationsState = {
  loading: true,
  notifications: undefined,
  pages: 0,
  current: 0,
  limit: 10,
  error: null,
  unNotified: 0,
};
export default NotifiState;
