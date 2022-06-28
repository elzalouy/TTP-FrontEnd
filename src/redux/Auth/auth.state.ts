import { UserInterface } from "../../interfaces/models/user";
const UserState: UserInterface = {
  loading: false,
  User: {
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    trelloMemberId: "",
    image: "",
  },
  authState: false,
  logoutState: false,
  Payload: { msg: "", status: "" },
};
export default UserState;
