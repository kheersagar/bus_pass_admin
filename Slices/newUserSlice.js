import { createSlice } from "@reduxjs/toolkit";
import deleteValue from "../hooks/deleteValue";
import getValue from "../hooks/getValue";

const initialValue = {
  uploadCSVLoading : false,
  createUserLoading : false,
};

const newUser = createSlice({
  name: "newUser",
  initialState: initialValue,
  reducers: {
    setUploadCSVLoading(state,action){
      state.uploadCSVLoading = action.payload
    },
    setCreateUserLoading(state,action){
      state.createUserLoading = action.payload
    }

  },
});

export const newUserActions = newUser.actions;

export default newUser;
