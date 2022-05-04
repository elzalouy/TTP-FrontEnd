export interface NotifiData {
  _id?: string;
  description?: string;
  projectManagerID?: string;
  viewed?: boolean;
  title?: string;
  projectID?: string;
  clientName?: string;
  adminUserID?: string;
  adminViewed?:boolean
  projectManagerViewed?:boolean
}
export interface Notifis {
  loading: boolean | null;
  notifi:NotifiData[],
  counter:number
}
const NotifiState: Notifis = {
loading:false,
notifi:[],
counter:2
};
export default NotifiState;
