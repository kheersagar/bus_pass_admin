import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
data: [],
deleteLoading:false

};

const validatorSlice = createSlice({
name: "validator",
initialState: initialValue,
reducers: {
  setData(state, action) {
    state.data = action.payload;
  },
  setDeleteLoading(state,action){
    state.deleteLoading = action.payload
  }
},
});

export const validatorActions = validatorSlice.actions;

export default validatorSlice;
