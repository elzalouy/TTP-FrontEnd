import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/endpoints/techMembers";
import { toast } from "react-toastify";
import { fireDeleteTeamHook, fireNewTeamHook } from "../Ui";
import { removeAuthToken } from "../../services/api";
import { logout } from "../Auth";
import { ApiResponse } from "apisauce";

export const getTechMembersByDeptId = createAsyncThunk<any, any, any>(
  "techMembers/getByDeptId",
  async (args, { rejectWithValue, dispatch }) => {
    try {
      let members: ApiResponse<any> = await api.getHttpTechMembers({
        departmentId: args,
      });
      if (members?.status === 401 || members?.status === 403) {
        rejectWithValue("Un Authorized");
        dispatch(logout(true));
      }
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
      let team: ApiResponse<any> = await api.createTechMember(args.data);
      if (team.ok && team.data) {
        args.dispatch(fireNewTeamHook(""));
        toast.success("Team created successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return team.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteTeam = createAsyncThunk<any, any, any>(
  "techMembers/deleteTeam",
  async (args: any, { rejectWithValue }) => {
    try {
      let team = await api.updateTechMember(args.data);
      if (team.status === 200) {
        args.dispatch(fireDeleteTeamHook(""));
        toast.success("Team deleted successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return args.data;
      } else return [];
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
