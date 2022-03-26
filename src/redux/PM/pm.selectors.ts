import { RootState } from "../store";

export const selectPMs = (state: RootState) => state?.PMs?.PMs;
