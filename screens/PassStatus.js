import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Slices/userSlice";
import { applyBussPass } from "../API/API";
import getValue from "../hooks/getValue";
import { useRoute } from "@react-navigation/native";
import CustomModal from "../components/Modal";
import ImageZoom from "react-native-image-pan-zoom";

const PassStatus = () => {
  const dispatch = useDispatch()
  const route = useRoute()
  const [modalVisible, setModalVisible] = useState(false)

  console.log(route)
  const { status, user_details: { profile_img, first_name, last_name, email, branch, semester, phone_no, address, receipt_img } } = route.params.data

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
      <Image
        source={{
          uri: profile_img
        }}
        className="w-full h-72 object-cover"
      />

      <CustomModal modalVisible={modalVisible} handleClose={() => setModalVisible(false)}>
        <View className="flex-1 mt-20  w-full h-80 rounded-xl " style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
          <View className="w-full items-end z-10">
            <TouchableOpacity onPress={() => setModalVisible(false)} className=" mt-2 mr-2 w-24 h-12 rounded-full justify-center items-center px-4 bg-white">
              <Text className="text-black text-xl font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1 justify-center items-center">
          <ImageZoom
            cropWidth={Dimensions.get("window").width}
            cropHeight={Dimensions.get("window").height}
            imageWidth={Dimensions.get("window").width}
            imageHeight={200}
            panToMove={true}
            pinchToZoom={true}
          >
            <Image
              source={{ uri: receipt_img}}
              style={{ width: "100%", height: "100%" }}
            />
          </ImageZoom>
        </View>
        </View>
      </CustomModal>
  

      <View className=" bg-[#FFD652] flex-1 p-4 px-6">
        <Text className="font-medium text-xl mb-2">{first_name + " " + last_name}</Text>
        <Text className="font-medium text-xl mb-2">{branch}</Text>
        <Text className="font-medium text-xl mb-2">{semester} semester</Text>
        <Text className="font-medium text-xl mb-2">{phone_no}</Text>
        <Text className="font-medium text-xl mb-2">
          {address}
        </Text>
        <Text className="font-medium text-xl mb-4">
          {email}
        </Text>
        {/* receipt */}
        {receipt_img && (
          <TouchableOpacity onPress={() => setModalVisible(true)}>

            <Image
              source={{
                uri: receipt_img,
              }}
              className="w-full h-40 mt-2 rounded-md object-contain"
            />
          </TouchableOpacity>
        )}
        <Text className={` mt-2 border rounded-full py-2 text-3xl text-center font-bold ${status === 2 ? 'text-[#2C9D10] border-[#2C9D10]' : status === 3 ? 'text-red-600 border-red-600' : 'text-black border-black'}`}>{status === 1 ? 'Applied' : status === 2 ? 'Approved' : 'Declined'}</Text>
      </View>
    </SafeAreaView>
  );
};

export default PassStatus;
