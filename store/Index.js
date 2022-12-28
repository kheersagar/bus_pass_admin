import { combineReducers, configureStore} from "@reduxjs/toolkit";



import loginSlice from "../Slices/loginSlice";
import newUser from "../Slices/newUserSlice";
import studentSlice from "../Slices/studentSlice";
import userSlice from "../Slices/userSlice";


const rootReducer = combineReducers({
  login: loginSlice.reducer,
  user: userSlice.reducer,
  student: studentSlice.reducer,
  newUser: newUser.reducer
})


export const store = configureStore({
  reducer : rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export default store