import { RootState } from "../store";

export const selectPMs = (state: RootState) => state?.PMs?.PMs?.filter((item) => item?.role !== "OM");
export const select_Id = (state: RootState) => state?.PMs?.current_ID;
export const selectPayload = (state: RootState) => state?.PMs?.Payload;
