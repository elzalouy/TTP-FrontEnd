import { RootState } from "../store";

export const selectDepartmentMembers = (state: RootState) =>
  state?.techMembers?.deptTechMembers;

export const selectAllMembers = (state: RootState) => state?.techMembers;

export const selectAllTeamMembers = (state: RootState) =>
  state?.techMembers.techMembers;