import { RootState } from "../store";

export const selectSatistics = (state: RootState) => state.Statistics;
export const selectOMSatistics = (state: RootState) => state.Statistics.OM;
export const selectManagersatistics = (state: RootState) => state.Statistics.PM;
export const selectStatisticsLoading = (state: RootState) =>
  state.Statistics.loading;
