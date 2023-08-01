import _ from "lodash";
import { RootState } from "../store";

export const selectAllDepartments = (state: RootState) =>
  state?.departments?.departments;
export const selectAllTeams = (state: RootState) =>
  _.flattenDeep(state.departments.departments.map((i) => i.teams));

export const selectDepartmentOptions = (state: RootState) => {
  if (state.departments.departments) {
    let options = state.departments.departments.map((item) => {
      return {
        id: item._id,
        value: item._id,
        text: item.name,
      };
    });
    return options;
  } else return [];
};

export const selectTeamsOptions = (state: RootState) => {
  const teams = state.departments.departments.map((item) => item.teams);
  let teamsOptions = _.flattenDeep(teams);
  return teamsOptions.map((team) => {
    return {
      id: team._id,
      value: team._id,
      text: team.name,
    };
  });
};

export const selectBoardsOptions = (state: RootState) => {
  if (state.departments.departments) {
    let options = state.departments.departments.map((item) => {
      return {
        id: item.boardId,
        value: item.boardId,
        text: item.name,
      };
    });
    return options;
  } else return [];
};

export const selectEditDepartment = (state: RootState) =>
  state?.departments.edit;
export const selectDeleteDepartment = (state: RootState) =>
  state?.departments.delete;
export const selectDepartmentLoading = (state: RootState) =>
  state?.departments?.loading;
