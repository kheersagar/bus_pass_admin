import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { confirmPassowrd, forgotPassowrd } from "../API/API";
import { Formik } from "formik";
import * as yup from "yup";
import * as Progress from "react-native-progress";
import { loginActions } from "../Slices/loginSlice";
import { StatusBar as ExpoBar } from "expo-status-bar";

const ForgotPassword = () => {
  const { isLoading,isOtp } = useSelector((state) => state.login);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const emailInitialValues = {
    email:""
  }
  const otpInitialValues = {
    password:'',
    otp: ""
  }
  const emailValidationSchema = yup.object().shape({
    email: yup.string().required("*Email is Required"),
  });
  const otpValidationSchema = yup.object().shape({
    password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("*Password is required"),
    otp: yup.string().length(6).required("*OTP is Required"),
  });

  useEffect(()=>{
    return() =>{
     dispatch( loginActions.setIsOtp(false))
    }
  },[])
  return (
    <View className="relative flex-1 justify-center items-center bg-[#FFFFFF]">
    <ExpoBar style="dark" translucent={true} hidden={false} />
      <Image
        source={require("../assets/Image/loginBackground-1.png")}
        className="absolute top-0 h-64 w-full"
      />
      <Image
        source={require("../assets/Image/loginBackground-2.png")}
        className="absolute bottom-0 h-52 w-full"
      />

      <View>
        <Image source={require("../assets/icon.png")} className="w-36 h-36" />
      </View>
      <Formik
        initialValues={isOtp ? otpInitialValues : emailInitialValues}
        enableReinitialize
        validationSchema={isOtp ? otpValidationSchema :  emailValidationSchema}
        onSubmit={(values) => {
          console.log(values)
          isOtp ? 
          dispatch(confirmPassowrd(values,navigate))
          :dispatch(forgotPassowrd(values, navigate));
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <View className="w-full px-6 mt-2">

           { !isOtp ?
           <>
            <TextInput
              name="email"
              onChangeText={handleChange("email")}
              value={values.email}
              placeholder="Email"
              className=" h-16 w-full border-2 rounded-xl pl-4  placeholder:font-bold placeholder:text-xl"
            />
            {touched.email && errors.email && (
              <Text className="text-red-600 font-medium text-lg mt-2">
                {errors.email}
              </Text>
            )}
           </>
           
           :
           <>
           <TextInput
              name="password"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
              placeholder="New Password"
              className=" h-16 w-full border-2 rounded-xl pl-4 mt-4 placeholder:font-bold placeholder:text-xl"
            />
            {touched.password && errors.password && (
              <Text className="text-red-600 font-medium text-lg mt-2">
                {errors.password}
              </Text>
            )}
            <TextInput
              name="otp"
              onChangeText={handleChange("otp")}
              value={values.otp}
              placeholder="OTP"
              keyboardType="numeric"
              className=" h-16 w-full border-2 rounded-xl pl-4 mt-4 placeholder:font-bold placeholder:text-xl"
            />
            {touched.otp && errors.otp && (
              <Text className="text-red-600 font-medium text-lg mt-2">
                {errors.otp}
              </Text>
            )}
           </>
           }
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#060F2F] mt-10 h-16 rounded-full justify-center items-center"
            >
              {!isLoading ? (
                <Text className="text-white text-xl">{isOtp ?"Submit" :"Get code"}</Text>
              ) : (
                <Progress.Circle size={30} indeterminate={true} />
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
