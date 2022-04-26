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
export interface ProjectManagersInterface {
  loading: boolean | null;
  PMs: ProjectManager[];
  current_ID:string,
}
const PMState: ProjectManagersInterface = {
  loading: null,
  PMs: [],
  current_ID:""
};
export default PMState;
