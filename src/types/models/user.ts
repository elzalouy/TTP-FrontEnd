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
}
export interface ITokenInfo {
  id: string;
  email: string;
  role: "OM" | "PM" | "SM";
}

export interface UserInterface {
  loading: boolean | null;
  authed: boolean;
  User: User | null;
}
