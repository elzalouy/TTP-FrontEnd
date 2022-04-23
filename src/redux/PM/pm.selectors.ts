import { RootState } from "../store";

export const selectPMs = (state: RootState) => state?.PMs?.PMs;
export const select_Id = (state: RootState) => state?.PMs?.current_ID;

