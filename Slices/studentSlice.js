import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
data: [],
approveLoading: false,
declineLoading: false,
dataIsLoading : false,
refreshing:false,
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
  
    state.declineLoading = action.payload
  },
  setDataIsLoading(state,action){
    state.dataIsLoading = action.payload
  },
  setRefreshing(state,action){
    state.refreshing = action.payload
  }

},
});

export const studentActions = studentSlice.actions;

export default studentSlice;
