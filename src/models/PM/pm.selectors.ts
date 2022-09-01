import { RootState } from "../store";

export const selectPMs = (state: RootState) => state?.PMs?.PMs?.filter((item) => item?.role !== "OM");
export const selectPMOptions = (state: RootState) => {
    if (state.PMs.PMs.length > 0) {
        let options = state.PMs.PMs.map((item) => {
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
export const select_Id = (state: RootState) => state?.PMs?.current_ID;
export const selectPayload = (state: RootState) => state?.PMs?.Payload;
export const selectLoading = (state: RootState) => state?.PMs?.loading;
