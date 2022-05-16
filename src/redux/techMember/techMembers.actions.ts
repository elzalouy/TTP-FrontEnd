import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/techMembers";
import { toast } from "react-toastify";
import { fireNewTeamHook } from "../Ui";

export const getTechMembersByDeptId = createAsyncThunk<any, any, any>(
  "techMembers/getByDeptId",
  async (args, { rejectWithValue }) => {
    try {
      let members = await api.getHttpTechMembers(args);
      if (members.ok && members.data) return members.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getAllMembers = createAsyncThunk<any, any, any>(
  "techMembers/getAll",
  async (args, { rejectWithValue }) => {
    try {
      let members = await api.getHttpTechMembers({});
      if (members.ok && members.data) return members.data;
      else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const createTeam = createAsyncThunk<any, any, any>(
  "techMembers/createTeam",
  async (args: any, { rejectWithValue }) => {
    try {
      let team = await api.createTechMember(args.data);
      if (team.ok && team.data) {
        args.dispatch(fireNewTeamHook(""));
        toast("team created successfully");
        return args.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
