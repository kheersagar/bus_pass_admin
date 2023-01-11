import { combineReducers, configureStore} from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'



import loginSlice from "../Slices/loginSlice";
import newUser from "../Slices/newUserSlice";
import studentSlice from "../Slices/studentSlice";
import userSlice from "../Slices/userSlice";
import validatorSlice from "../Slices/validatorSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  login: loginSlice.reducer,
  user: userSlice.reducer,
  student: studentSlice.reducer,
  newUser: newUser.reducer,
  validator: validatorSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer : persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
export const persistor = persistStore(store)
export default store