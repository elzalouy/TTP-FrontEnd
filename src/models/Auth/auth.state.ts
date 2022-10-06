import { UserInterface } from "../../types/models/user";
const UserState: UserInterface = {
  loading: null,
  authed: false,
  User: {
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    trelloMemberId: "",
    image: "",
  },
};

export const initialState = {
  loading: false,
  authed: false,
  User: {
    _id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    trelloMemberId: "",
    image: "",
  },
};
export default UserState;
