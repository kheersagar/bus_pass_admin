import { createSlice } from "@reduxjs/toolkit";
import deleteValue from "../hooks/deleteValue";
import getValue from "../hooks/getValue";

const initialValue = {
data: [],
approveLoading: false,
delcineLoading: false,
};

const studentSlice = createSlice({
name: "student",
initialState: initialValue,
reducers: {
  setData(state, action) {
    state.data =[...state.data, ...action.payload];
  },
  clearData(state,action){
    state.data = []
  },
  setQueryData(state,action){
    if(action.payload.page == 1){
      state.data = action.payload.data
    }else{
      state.data =[...state.data, ...action.payload.data];
    }
  },
  setApproveLoading(state,action){
    state.approveLoading = action.payload
  },
  setDeclineLoading(state,action){
    state.delcineLoading = action.payload
  }

},
});

export const studentActions = studentSlice.actions;

export default studentSlice;
