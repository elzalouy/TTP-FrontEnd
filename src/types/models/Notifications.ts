export interface NotificationInterface {
  _id?: string;
  title?: string;
  description?: string;
  isNotified?: [IsNotifiedInterface];
}
export type IsNotifiedInterface = {
  userId: string;
  isNotified: boolean;
};
export interface NotificationsState {
  loading: boolean | null;
  notifications?: NotificationInterface[] | null;
  pages: number;
  current: number;
  limit: number;
  error: any;
  unNotified: number;
}
