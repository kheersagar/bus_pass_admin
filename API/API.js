import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import getValue from "../hooks/getValue";
import storeValue from "../hooks/storeValue";
import { loginActions } from "../Slices/loginSlice";
import newUser, { newUserActions } from "../Slices/newUserSlice";
import { studentActions } from "../Slices/studentSlice";
import { userActions } from "../Slices/userSlice";
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const API = axios.create({
  // baseURL : 'http://192.168.1.38:5000'
  baseURL : 'https://bus-pass-server.onrender.com/'
})

API.interceptors.request.use( async (req)=>{
  const token = await getValue('isAuth')
    console.log(token)
    if(token){
      console.log()
      req.headers['x-access-token'] = token
    }
    return req
})

export const LoginUser = (data,navigate)=>{
  return async (dispatch) =>{
    dispatch(loginActions.setLoading(true))
    try{
      const res = await API.post("/auth/admin/login",data)
      storeValue('isAuth',res.data.token)
        dispatch(userActions.setAuth(res.data.token))
        dispatch(userActions.setUserData(res.data.data))
        navigate.navigate("Home")
      }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Invalid username or password',
        button: 'close',
      })
    }finally{
      dispatch(loginActions.setLoading(false))
    }
  }
}
export const getUserData = () =>{
  return async (dispatch) =>{
    try{
      const res = await API.get("/user");
      dispatch(userActions.setUserData(res.data))
    }catch(err){
      console.log(err)
    }
  }
}

export const updateProfileImage = (profileImage) =>{
  return async (dispatch) =>{
    try{
      dispatch(userActions.setProfileLoading(true))
      const refs = ref(storage, `/profileImg/${(Math.random() + 1).toString(36).substring(2)}`);
          //convert array of bytes
          const img = await fetch(profileImage);
          const bytes = await img.blob();
      
          // console.log(bytes);
      
          await uploadBytes(refs, bytes);
          const imageUrl  = await getDownloadURL(refs);
          if(imageUrl){
            const res = await API.post("/user/update-profile",{
              profile_img : imageUrl
            })
            dispatch(userActions.setUserData(res.data))
            Toast.show({
              type:ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: "Updated Successfully",
              button: 'close',
            })
          }
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(userActions.setProfileLoading(false))
    }
  }
}

export const appliedList = (page,limit)=>{
  return async (dispatch) =>{
    try{
      dispatch(studentActions.setDataIsLoading(true))
      const res = await API.get(`/bus-pass/applied-list?page=${page}&limit=10`)
      dispatch(studentActions.setData(res.data))
    }catch(err){
      console.log(err)
    }finally{
      dispatch(studentActions.setDataIsLoading(false))
    }
  }
}
export const updatePass = (data) =>{
  return async (dispatch)=>{
    try{
      dispatch(studentActions.setApproveLoading(true))
      const res = await API.post("/bus-pass/update-pass",data)
      console.log(res)
      data.navigate.goBack()
    }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(studentActions.setApproveLoading(false))
    }
  }
}

export const searchQuery = (data,page) =>{
  return async (dispatch) =>{
    try{
      dispatch(studentActions.setDataIsLoading(true))
      const res = await API.get(`/bus-pass/applied-list?page=${page}&limit=10&search=${data}`)
      dispatch(studentActions.setQueryData({data:res.data,page}))
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(studentActions.setDataIsLoading(false))
    }
  }
}

export const createNewUser = (data) =>{
  return async (dispatch) =>{
    try{
      dispatch(newUserActions.setCreateUserLoading(true))
      const res = await API.post("/user/create-new-student",data)
      Toast.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: res.data,
        button: 'close',
      })
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(newUserActions.setCreateUserLoading(false))
    }
  }
}
export const uploadCSV = (file) =>{
  return async (dispatch) =>{
    try{
      dispatch(newUserActions.setUploadCSVLoading(true))
      const formData = new FormData()
      formData.append("studentCSV",{
        ...file,
        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
        type: 'text/comma-separated-values', // it may be necessary in Android. 
      })
      console.log(file)
      const res = await API.post("/user/create-new-student-csv",formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      Toast.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: res.data,
        button: 'close',
      })
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.message,
        button: 'close',
      })
    }finally{
      dispatch(newUserActions.setUploadCSVLoading(false))
    }
  }
}