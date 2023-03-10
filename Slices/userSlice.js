import { createSlice } from "@reduxjs/toolkit";
import deleteValue from "../hooks/deleteValue";
import getValue from "../hooks/getValue";

const initialValue = {
  isAuth:false,
  userData: "",
  receipt_img: "",
  notificationLoading: false,
  notifications: [],
  busPassLoading: false,
  busPassDetails: { },
  profileLoading:false,
  applyLoading:false,
  logoutLoading:false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setLogout(state, action) {
      state.logoutLoading = action.payload;
    },
    setRecieptImg(state, action) {
      state.receipt_img = action.payload;
    },
    setNotificationsLoading(state, action) {
      state.notificationLoading = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    setBusPassLoading(state, action) {
      state.busPassLoading = action.payload;
    },
    setBusPassDetails(state, action) {
      state.busPassDetails = action.payload;
    },
    setProfileLoading(state,action){
      state.profileLoading = action.payload
    },
    setApplyLoading(state,action){
      state.applyLoading = action.payload
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice;
