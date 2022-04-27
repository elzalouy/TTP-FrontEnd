import { RootState } from "../store";

export const selectAuth = (state:RootState) => state?.Auth;
export const selectIsAuth = (state: RootState) => state?.Auth?.User;
export const selectResponse = (state: RootState) => state?.Auth?.Payload;
