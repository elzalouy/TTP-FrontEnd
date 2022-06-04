import { createSlice, Slice } from "@reduxjs/toolkit";
import { deflate } from "zlib";
import {
  getAllMembers,
  getTechMembersByDeptId,
  createTeam,
  deleteTeam,
} from "./techMembers.actions";
import { TechMembersInterface, techMembersState } from "./techMembers.state";

const techMembersSlice: Slice<TechMembersInterface> = createSlice({
  name: "techMembers",
  reducers: {},
  initialState: techMembersState,
  extraReducers: (builder) => {
    builder.addCase(getTechMembersByDeptId.rejected, (state) => {
      state.loading = false;
      state.deptTechMembers = [];
    });
    builder.addCase(getTechMembersByDeptId.pending, (state) => {
      state.loading = true;
      state.deptTechMembers = [];
    });
    builder.addCase(getTechMembersByDeptId.fulfilled, (state, action) => {
      state.loading = false;
      state.deptTechMembers = action.payload;
    });
    builder.addCase(getAllMembers.rejected, (state) => {
      state.loading = false;
      state.techMembers = [];
    });
    builder.addCase(getAllMembers.pending, (state) => {
      state.loading = true;
      state.techMembers = [];
    });
    builder.addCase(getAllMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.techMembers = action.payload;
      state.deptTechMembers = action.payload;
    });
    builder.addCase(createTeam.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createTeam.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.techMembers = [...state.techMembers, action.payload];
    });
    builder.addCase(deleteTeam.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTeam.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.techMembers = [...state.techMembers].filter((team) => {
        return team._id !== action.payload._id
      });
      state.deptTechMembers = [...state.deptTechMembers].filter((team) => {
        return team._id !== action.payload._id
      });
    });
  },
});
export default techMembersSlice.reducer;
export const techMembersActions = techMembersSlice.actions;
