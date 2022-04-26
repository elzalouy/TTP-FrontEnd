export type MemberType = "admin" | "normal" | "observer";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  trelloMemberId: string;
  image: string;
  type: MemberType;
  userTeams?: string[];
}
export interface UserInterface {
  loading: boolean | null;
  User: User | boolean;
}
const UserState: UserInterface = {
  loading: null,
  User: false,

};
export default UserState;