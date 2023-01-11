import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import * as Progress from "react-native-progress";
import { createNewValidator, getValidator, removeValidator } from "../API/API";
import { TrashIcon } from "react-native-heroicons/outline";
import { StatusBar as ExpoBar } from "expo-status-bar";

const AddValidator = () => {
  const dispatch = useDispatch();

  const { createUserLoading } = useSelector((state) => state.newUser);
  const { data,deleteLoading } = useSelector((state) => state.validator);
  const userSchema = yup.object().shape({
    username: yup.string().required("Username is Required"),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    email: yup.string().email().required("email is Required"),
    first_name: yup.string().required("First Name is Required"),
    last_name: yup.string().required("Last Name is Required"),
    phone_no: yup
      .string()
      .min(10, ({ min }) => `Phone No must be at least ${min} characters`)
      .max(10, ({ max }) => `Phone No must be ${max} characters`)
      .required("Phone No. is Required"),
  });
  const initialValues = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_no: "",
  };
  useEffect(() => {
    dispatch(getValidator());
  }, []);
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
    <ExpoBar style="dark" translucent={true} hidden={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-4 px-4">
          <View className="my-4 bg-blue-900 p-2 py-4 rounded-lg">
            <Text className="text-white font-extrabold text-3xl text-center">
              Validator List
            </Text>
          </View>
          {data.length ? (
            <View className="max-h-[150px]">
            <FlatList
              // showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={({ item }) => item?._id}
              nestedScrollEnabled
              renderItem={({ item }) => {
                return (
                  <View className="bg-yellow-400 mb-2 rounded-md p-2 flex-row justify-between">
                    <Text className="font-extrabold text-lg">{item.first_name + " " + item.last_name}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(removeValidator(item._id));
                      }}
                    >
                      <View>{deleteLoading ? <Progress.Circle size={20} color="black" />: <TrashIcon color="gray" />}</View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            </View>
          ) :
          null}
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={userSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(createNewValidator(values, resetForm));
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
            <View className="mt-4 px-4">
              <View className="my-4 bg-blue-900 p-2 py-4 rounded-lg">
                <Text className="text-white font-extrabold text-3xl text-center">
                  Add Validator
                </Text>
              </View>
              <View className="h-16 w-full mb-4">
                <TextInput
                  name="username"
                  value={values.username}
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={() => handleBlur("username")}
                  className={`border ${
                    touched.username && errors.username
                      ? "border-red-600"
                      : "border-slate-400"
                  } px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.username && errors.username && (
                  <Text className="text-red-600">*{errors.username}</Text>
                )}
              </View>

              <View className="h-16 w-full  mb-4">
                <TextInput
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={() => handleBlur("password")}
                  className={`border  ${
                    touched.password && errors.password
                      ? "border-red-600"
                      : "border-slate-400"
                  } px-2 rounded-lg flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.password && errors.password && (
                  <Text className="text-red-600">*{errors.password}</Text>
                )}
              </View>
              <View className="h-16 w-full  mb-4">
                <TextInput
                  name="first_name"
                  value={values.first_name}
                  placeholder="First Name"
                  onChangeText={handleChange("first_name")}
                  onBlur={() => handleBlur("first_name")}
                  className={`border ${
                    touched.first_name && errors.first_name
                      ? "border-red-600"
                      : "border-slate-400"
                  } px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.first_name && errors.first_name && (
                  <Text className="text-red-600">*{errors.first_name}</Text>
                )}
              </View>
              <View className="h-16 w-full mb-4">
                <TextInput
                  name="last_name"
                  value={values.last_name}
                  placeholder="Last Name"
                  onChangeText={handleChange("last_name")}
                  onBlur={() => handleBlur("last_name")}
                  className={`border ${
                    touched.last_name && errors.last_name
                      ? "border-red-600"
                      : "border-slate-400"
                  } px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.last_name && errors.last_name && (
                  <Text className="text-red-600">*{errors.last_name}</Text>
                )}
              </View>

              <View className="h-16 w-full mb-4">
                <TextInput
                keyboardType="email-address"
                  name="email"
                  value={values.email}
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={() => handleBlur("email")}
                  className={`border ${
                    touched.email && errors.email
                      ? "border-red-600"
                      : "border-slate-400"
                  } px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.email && errors.email && (
                  <Text className="text-red-600">*{errors.email}</Text>
                )}
              </View>
              <View className="h-16 w-full mb-4">
                <TextInput
                  name="phone_no"
                  placeholder="Phone No."
                  value={values.phone_no}
                  keyboardType="numeric"
                  onChangeText={handleChange("phone_no")}
                  onBlur={() => handleBlur("phone_no")}
                  className={`border ${
                    touched.phone_no && errors.phone_no
                      ? "border-red-600"
                      : "border-slate-400"
                  } px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.phone_no && errors.phone_no && (
                  <Text className="text-red-600">{errors.phone_no}</Text>
                )}
              </View>
              <View className="px-2 py-2">
                <TouchableOpacity
                  disabled={createUserLoading}
                  onPress={handleSubmit}
                  className="w-full mt-2 bg-blue-900 rounded-full h-12 items-center justify-center"
                >
                  {createUserLoading ? (
                    <Progress.Circle size={25} color="white" />
                  ) : (
                    <Text className="font-bold text-xl text-white">Submit</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddValidator;
