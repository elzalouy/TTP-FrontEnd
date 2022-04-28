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

interface Res{
  msg:string;
  status:number | string;
}
export interface UserInterface {
  loading: boolean | null;
  User: User;
  authState:boolean;
  Payload:Res;
}
const UserState: UserInterface = {
  loading: null,
  User: {_id:"",name:"",email:"",password:"",role:"",trelloMemberId:"",image:""},
  authState:false,
  Payload:{
    msg:"",status:""
  }
};
export default UserState;