import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProjects = createAsyncThunk<any, any, any>(
  "prjects/get",
  () => {}
);
