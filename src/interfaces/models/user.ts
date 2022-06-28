export type MemberType = "admin" | "normal" | "observer";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  trelloMemberId: string;
  image: string;
  type?: MemberType;
  userTeams?: string[];
  user?: User;
}

interface Res {
  msg: string;
  status: number | string;
  page?: string;
}
export interface UserInterface {
  loading: boolean | null;
  User: User | null;
  authState: boolean;
  logoutState: boolean;
  Payload: Res;
}
