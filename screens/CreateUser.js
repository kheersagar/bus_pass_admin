import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import * as Progress from "react-native-progress";
import { DocumentTextIcon } from "react-native-heroicons/outline";
import CustomModal from "../components/Modal";
import { createNewUser, uploadCSV } from "../API/API";
const { width, height } = Dimensions.get("window");

const CreateUser = () => {
  const dispatch = useDispatch();
  const { uploadCSVLoading,createUserLoading } = useSelector((state) => state.newUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [file, setFile] = useState("");
  const userSchema = yup.object().shape({
    username: yup.string().required("Username is Required"),
    password: yup
      .string()
      .min(5, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    email: yup.string().email().required("email is Required"),
    first_name: yup.string().required("First Name is Required"),
    last_name: yup.string().required("Last Name is Required"),
    branch: yup.string().required("Branch is Required"),
    semester: yup.string().required("Semester is Required"),
    phone_no: yup.string().length(10).required("Phone No. is Required"),
    address: yup.string().required("Address is Required"),
    pickup_point: yup.string().required("Pickup Point is Required"),
  });
  const initialValues = {
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    branch: "",
    semester: "",
    phone_no: "",
    address: "",
    pickup_point: "",
  };
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if(result.type !== 'cancel'){
      setModalVisible(true);
      console.log(result);
      setFile(result);
    }
  };
  return (
    <SafeAreaView
      className="flex-1 px-2"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
      {/* file upload modal */}
      <CustomModal
        modalVisible={modalVisible}
        top={height/2}
        handleClose={() => setModalVisible(false)}
      >
        <View className="h-80 absolute bottom-0 w-full  rounded-xl bg-slate-400 ">
          <View className="w-full items-end z-10">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className=" mt-2 mr-2 w-24 h-12 rounded-full justify-center items-center px-4 bg-black"
            >
              <Text className="text-white text-xl font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <DocumentTextIcon size={150} color="white" />
            <Text className="font-bold text-xl">{file.name}</Text>
          </View>
          <View className="px-2 py-2 items-end flex-1 justify-end">
            <TouchableOpacity
              onPress={() => dispatch(uploadCSV(file))}
              className="w-full bg-blue-900 rounded-full h-12 items-center justify-center"
            >
              {uploadCSVLoading ? (
                <Progress.Circle size={25} color="white" />
              ) : (
                <Text className="font-bold text-xl text-white">Upload</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      {/*  */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        onPress={pickDocument}
        className="h-20 w-full bg-slate-300 mt-2 rounded-full items-center justify-center"
      >
        <Text className="font-bold text-2xl text-gray-400">Upload CSV</Text>
      </TouchableOpacity>
      <Text className="text-center font-bold text-gray-500 text-xl mt-2">
        OR
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values) => {
          dispatch(createNewUser(values))
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
          <View className="mt-4">
            <View className="flex-row space-x-2">
              <View className="h-20 w-1/2 flex-1 mb-4">
                <TextInput                
                  name="username"
                  value={values.username}
                  placeholder="username"
                  onChangeText={handleChange("username")}
                  onBlur={() => handleBlur("username")}
                  className={`border ${touched.username&& errors.username ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.username&& errors.username && <Text className="text-red-600">*{errors.username}</Text>}
              </View>
              <View className="h-20 w-1/2 flex-1 mb-4">
                <TextInput
                  name="password"
                  value={values.password}
                  placeholder="password"
                  onChangeText={handleChange("password")}
                  onBlur={() => handleBlur("password")}
                  className={`border ${touched.password && errors.password ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
                />
                {touched.password && errors.password && <Text className="text-red-600">*{errors.password}</Text>}
              </View>
            </View>
            <View className="flex-row space-x-2">
            <View className="h-20 w-1/2 flex-1 mb-4">
              <TextInput
                name="first_name"
                value={values.first_name}
                placeholder="First Name"
                onChangeText={handleChange("first_name")}
                onBlur={() => handleBlur("first_name")}
                className={`border ${touched.first_name && errors.first_name ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
              {touched.first_name && errors.first_name && <Text className="text-red-600">*{errors.first_name}</Text>}
            </View>
            <View className="h-20 w-1/2 flex-1 mb-4">

              <TextInput
                name="last_name"
                value={values.last_name}
                placeholder="Last Name"
                onChangeText={handleChange("last_name")}
                onBlur={() => handleBlur("last_name")}
                className={`border ${touched.last_name && errors.last_name ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
              {touched.last_name && errors.last_name && <Text className="text-red-600">*{errors.last_name}</Text>}
            </View>
            </View>
            <View className="flex-row space-x-2">
            <View className="h-20 w-1/2 flex-1 mb-4">
              <TextInput
                name="email"
                value={values.email}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={() => handleBlur("email")}
                className={`border ${touched.email && errors.email ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
              {touched.email && errors.email && <Text className="text-red-600">*{errors.email}</Text>}
            </View>
            <View className="h-20 w-1/2 flex-1 mb-4">
              <TextInput
                name="branch"
                value={values.branch}
                placeholder="Branch"
                onChangeText={handleChange("branch")}
                onBlur={() => handleBlur("branch")}
                className={`border ${touched.branch && errors.branch ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
              {touched.branch && errors.branch && <Text className="text-red-600">*{errors.branch}</Text>}
            </View>
            </View>
            <View className="flex-row space-x-2">
            <View className="h-20 w-1/2 flex-1 mb-4">
              <TextInput
                name="semester"
                placeholder="Semester"
                value={values.semester}
                keyboardType="numeric"               
                onChangeText={handleChange("semester")}
                onBlur={() => handleBlur("semester")}
                className={`border ${touched.semester && errors.semester ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
              {touched.semester && errors.semester && <Text className="text-red-600">*{errors.semester}</Text>}
            </View>
            <View className="h-20 w-1/2 flex-1 mb-4">

              <TextInput
                name="phone_no"
                placeholder="Phone No."
                value={values.phone_no}
                keyboardType="numeric"
                onChangeText={handleChange("phone_no")}
                onBlur={() => handleBlur("phone_no")}
                className={`border ${touched.phone_no && errors.phone_no ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg  flex-1 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
               {touched.phone_no && errors.phone_no &&<Text className="text-red-600">{errors.phone_no}</Text> }
            </View>
            </View>
            <View className="w-full  mb-4">
              <TextInput
                name="address"
                value={values.address}
                placeholder="Address"
                onChangeText={handleChange("address")}
                onBlur={() => handleBlur("address")}
                className={`border ${touched.address && errors.address ? 'border-red-600' :  'border-slate-400'} px-2 rounded-lg h-24 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
              {touched.address && errors.address && <Text className="text-red-600">*{errors.address}</Text>}
            </View>
            <View className="w-full mb-4 ">

              <TextInput
                name="pickup_point"
                value={values.pickup_point}
                placeholder="Pickup Point"
                onChangeText={handleChange("pickup_point")}
                onBlur={() => handleBlur("pickup_point")}
                className={`border ${touched.pickup_point && errors.pickup_point ? 'border-red-600' : 'border-slate-400'} px-2 rounded-lg h-24 font-bold placeholder:text-gray-400 placeholder:opacity-70 placeholder:text-xl`}
              />
              {touched.pickup_point && errors.pickup_point && <Text className="text-red-600">*{errors.pickup_point}</Text>}
            </View>
            <View className="px-2 py-2 ">
              <TouchableOpacity
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

export default CreateUser;
