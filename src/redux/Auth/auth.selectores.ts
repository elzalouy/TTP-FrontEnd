import { RootState } from "../store";

export const selectAuth = (state: RootState) => state?.Auth;
export const selectLoading = (state: RootState) => state?.Auth.loading;
export const selectUser = (state: RootState) => state?.Auth?.User;
export const selectResponse = (state: RootState) => state?.Auth?.Payload;
export const selectIsAuth = (state: RootState) => state?.Auth?.authState;
export const selectPassword = (state: RootState) =>
  state?.Auth?.User?.user?.password !== undefined
    ? state?.Auth?.User?.user?.password
    : state?.Auth?.User?.password;
export const selectRole = (state: RootState) =>
  state?.Auth?.User?.user?.role !== undefined
    ? state?.Auth?.User?.user?.role
    : state?.Auth?.User?.role;
export const selectImage = (state: RootState) =>
  state?.Auth?.User?.user?.image !== undefined
    ? state?.Auth?.User?.user?.image
    : state?.Auth?.User?.image;
