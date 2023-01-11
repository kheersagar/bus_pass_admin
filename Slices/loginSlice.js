import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoading : false,
  isOtp:false,
} 

const loginSlice = createSlice({
  name:'login',
  initialState : initialValue,
  reducers:{
    setLoading(state,action){
      state.isLoading = action.payload
    },
    setIsOtp(state,action){
      console.log("values",action)
      state.isOtp = action.payload
    }
  }
})

export const loginActions = loginSlice.actions

export default loginSlice;