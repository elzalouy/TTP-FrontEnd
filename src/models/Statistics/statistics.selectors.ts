import { RootState } from "../store";

export const selectSatistics = (state: RootState) => state.Statistics;
export const selectOMSatistics = (state: RootState) => state.Statistics.OM;
export const selectPMSatistics = (state: RootState) => state.Statistics.PM;
