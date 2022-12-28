import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../Slices/userSlice'
import { PencilSquareIcon } from "react-native-heroicons/outline";
import * as ImagePicker from "expo-image-picker";
import { updateProfileImage } from '../API/API';
import FullScreenLoading from '../components/FullScreenLoading';
const Profile = () => {
  const dispatch = useDispatch()
  const { profileLoading,userData: { profile_img,first_name, last_name,email,branch,semester,phone_no,address }} = useSelector(state => state.user)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });



    if (!result.canceled) {
      dispatch(updateProfileImage(result.assets[0].uri))
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
    {/* loadinf screen */}
    <FullScreenLoading isLoading={profileLoading}/>
    <ScrollView showsVerticalScrollIndicator={false} className='mb-4'>
      <View className="relative items-center my-2 mb-4">
        <Image source={{
          uri: profile_img
        }} className="w-40 h-40 rounded-full" />
        <TouchableOpacity className="absolute bottom-[-20px] " onPress={pickImage}>
        <PencilSquareIcon size={42}  color="white" fill="gray"/>
        </TouchableOpacity>
      </View>
      <View className="my-2 bg-[#D3E9EB] py-2 px-4 rounded-xl">
        <View className="">
          <Text className="text-xl font-semibold text-[#0A4BC5]">Name</Text>
          <Text className="text-xl mb-2">{first_name + " " + last_name}</Text>
        </View>
        <View></View>
      </View>
      <View className="my-2 bg-[#D3E9EB] py-2 px-4 rounded-xl">
        <View className="">
          <Text className="text-xl font-semibold text-[#0A4BC5]">Branch</Text>
          <Text className="text-xl mb-2">{branch}</Text>
        </View>
        <View></View>
      </View>
      <View className="my-2 bg-[#D3E9EB] py-2 px-4 rounded-xl">
        <View className="">
          <Text className="text-xl font-semibold text-[#0A4BC5]">Semester</Text>
          <Text className="text-xl mb-2">{semester}</Text>
        </View>
        <View></View>
      </View>
      <View className="my-2 bg-[#D3E9EB] py-2 px-4 rounded-xl">
        <View className="">
          <Text className="text-xl font-semibold text-[#0A4BC5]">Phone no.</Text>
          <Text className="text-xl mb-2">{phone_no}</Text>
        </View>
        <View></View>
      </View>
      <View className="my-2 bg-[#D3E9EB] py-2 px-4 rounded-xl">
        <View className="">
          <Text className="text-xl font-semibold text-[#0A4BC5]">Address</Text>
          <Text className="text-xl mb-2">{address}</Text>
        </View>
        <View></View>
      </View>
      <View className="my-2 bg-[#D3E9EB] py-2 px-4 rounded-xl">
        <View className="">
          <Text className="text-xl font-semibold text-[#0A4BC5]">Email ID</Text>
          <Text className="text-xl mb-2">{email}</Text>
        </View>
        <View></View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(userActions.handleLogout())}
        className="lex-row  items-center w-full h-14 rounded-full p-2 px-4 mt-4 bg-[#102243]">
        <Text className="text-white font-medium text-lg flex-1 w-86 text-center">Log out</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Profile