import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  isLoading : false,
} 

const loginSlice = createSlice({
  name:'login',
  initialState : initialValue,
  reducers:{
    setLoading(state,action){
      state.isLoading = action.payload
    }
  }
})

export const loginActions = loginSlice.actions

export default loginSlice;