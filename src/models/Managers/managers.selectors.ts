import { RootState } from "../store";

export const selectManagers = (state: RootState) => state.Managers.managers;
export const selectPMOptions = (state: RootState) => {
  if (state.Managers.managers.length > 0) {
    let options = state.Managers.managers
      .filter((item) => item.role === "PM")
      .map((item) => {
        return {
          id: item._id,
          value: item._id,
          text: item.name,
        };
      });
    return options;
  } else {
    return [];
  }
};
export const selectPMs = (state: RootState) =>
  state.Managers.managers.filter((item) => item.role === "PM");

export const select_Id = (state: RootState) => state?.Managers?.current_ID;
export const selectPayload = (state: RootState) => state?.Managers?.Payload;
export const selectLoading = (state: RootState) => state?.Managers?.loading;
