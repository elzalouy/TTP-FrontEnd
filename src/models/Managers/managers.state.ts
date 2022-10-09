export type MemberType = "admin" | "normal" | "observer";

export interface Manager {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  trelloBoardId: string;
  trelloMemberId: string;
  image: string;
  type: MemberType;
  userTeams?: string[];
}

interface Res {
  msg: string;
  status: number | string;
}
export interface ManagersInterface {
  loading: boolean | null;
  managers: Manager[];
  current_ID: string;
  Payload: Res;
}
const PMState: ManagersInterface = {
  loading: null,
  managers: [],
  current_ID: "",
  Payload: {
    msg: "",
    status: "",
  },
};
export default PMState;
