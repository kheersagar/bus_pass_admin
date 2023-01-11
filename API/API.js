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
import { validatorActions } from "../Slices/validatorSlice";
import { navigate } from "../RootNavigation";
import store from "../store/Index"
import deleteValue from "../hooks/deleteValue";
const API = axios.create({
  // baseURL : 'http://192.168.1.35:5000'
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
API.interceptors.response.use(async (res) => {
  if(res.headers['x-access-token']){
    storeValue('isAuth', res.headers['x-access-token'])
  }
  return res
},async (err)=>{
  if(err.response.headers.logout){
    Toast.show({
      type:ALERT_TYPE.DANGER,
      title: 'Error',
      textBody: 'Session expired please login again',
      button: 'close',
    })
    store.dispatch(userActions.setAuth(false))
    deleteValue('isAuth')
    navigate('Login')
  }
  return Promise.reject(err)
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
export const Logout = () =>{
  return async (dispatch) =>{
    try{
      dispatch(userActions.setLogout(true))
      const res = await API.get("/auth/logout");
      deleteValue("isAuth");
      dispatch(userActions.setAuth(false))
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: "Error",
        button: 'close',
      })
    }finally{
      dispatch(userActions.setLogout(false))
    }
  }
}

export const forgotPassowrd = (data,navigate) =>{
  return async (dispatch) =>{
    dispatch(loginActions.setLoading(true))
    try{
      const res = await API.get(`/auth/forgot-password?email=${data.email}`)
      dispatch(loginActions.setIsOtp(true)  )
      Toast.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: res.data,
        button: 'close',
      })
    }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(loginActions.setLoading(false))
    }
  }
}
export const confirmPassowrd = (data,navigate) =>{
  return async (dispatch) =>{
    dispatch(loginActions.setLoading(true))
    try{
      const res = await API.post('/auth/confirm-password',data)
      Toast.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: "Updated Successfully",
        button: 'close',
      })
      dispatch(loginActions.setIsOtp(false))
      navigate.navigate("Login") 
    }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
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
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(userActions.setProfileLoading(false))
    }
  }
}

export const appliedList = (page,type)=>{
  return async (dispatch) =>{
    try{
      if(type === 'PULL_REFRESH')  dispatch(studentActions.setRefreshing(true))
      else dispatch(studentActions.setDataIsLoading(true))
      const res = await API.get(`/bus-pass/applied-list?page=${page}&limit=10`)
      dispatch(studentActions.setData(res.data))
    }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      if(type === 'PULL_REFRESH')  dispatch(studentActions.setRefreshing(false))
      dispatch(studentActions.setDataIsLoading(false))
    }
  }
}
export const updatePass = (data) =>{
  return async (dispatch)=>{
    try{
      if(data.status !== 3 && !data.valid_till || data.bus_no == 0){
        Toast.show({
          type:ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: "All Fields are required",
          button: 'close',
        })
        return
      }
      if(data.status === 3 && !data.decline_reason ){
        Toast.show({
          type:ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: "All Fields are required",
          button: 'close',
        })
        return
      }
      dispatch(studentActions.setApproveLoading(true))
      dispatch(studentActions.setDeclineLoading(true))
      const res = await API.post("/bus-pass/update-pass",data)
      console.log(res)
      Toast.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: "Updated Successfully",
        button: 'close',
      })
      dispatch(studentActions.clearData());
      dispatch(appliedList(1));
      data.navigate.goBack()
    }catch(err){
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(studentActions.setDeclineLoading(false))
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
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(studentActions.setDataIsLoading(false))
    }
  }
}
export const getValidator = () =>{
  return async (dispatch) =>{
    try{
      const res = await API.get("/user/validator");
      dispatch(validatorActions.setData(res.data))
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
        button: 'close',
      })
    }
  }
}
export const removeValidator = (data) =>{
  return async (dispatch) =>{
    try{
      dispatch(validatorActions.setDeleteLoading(true))
      const res = await API.post("/user/delete-validator",{id:data})
      dispatch(getValidator())
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
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(validatorActions.setDeleteLoading(false))
    }
  }
}
export const createNewValidator = (data,resetForm) =>{
  return async (dispatch) =>{
    try{
      dispatch(newUserActions.setCreateUserLoading(true))
      const res = await API.post("/user/create-new-validator",data)
      resetForm({values:''})
      dispatch(getValidator())
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
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(newUserActions.setCreateUserLoading(false))
    }
  }
}
export const createNewUser = (data,resetForm) =>{
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
      resetForm({values:''})
    }catch(err){
      console.log(err)
      Toast.show({
        type:ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: err.response.data,
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
        textBody: err.response.data,
        button: 'close',
      })
    }finally{
      dispatch(newUserActions.setUploadCSVLoading(false))
    }
  }
}