export type MemberType = "admin" | "normal" | "observer";

export interface ProjectManager {
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
export interface ProjectManagersInterface {
  loading: boolean | null;
  PMs: ProjectManager[];
  current_ID: string,
  Payload: Res;
}
const PMState: ProjectManagersInterface = {
  loading: null,
  PMs: [],
  current_ID: "",
  Payload: {
    msg: "", status: ""
  }
};
export default PMState;
