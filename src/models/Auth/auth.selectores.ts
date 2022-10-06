import { RootState } from "../store";

export const selectUserState = (state: RootState) => state?.Auth;
export const selectLoading = (state: RootState) => state?.Auth.loading;
export const selectUser = (state: RootState) => state?.Auth?.User;
export const selectRole = (state: RootState) => state?.Auth?.User?.role;
export const selectImage = (state: RootState) => state?.Auth?.User?.image;
