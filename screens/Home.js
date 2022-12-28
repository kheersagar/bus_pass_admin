import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import OptionCard from "../components/OptionCard";

const Home = () => {

  const options = [
    {
      title: "Approve/Decline",
      imageSrc: require("../assets/Image/Icons/admin.png"),
      route:'update-pass'
    },
    {
      title: "Create User",
      imageSrc: require("../assets/Image/Icons/list.png"),
      route:'create-user'
    },
    {
      title: "Profile Setting",
      imageSrc: require("../assets/Image/Icons/setting.png"),
      route:'test'
    },
  ];
  useEffect( ()=>{

  },[])
  return (
      <SafeAreaView className="flex-1"
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
        }}
      >
      <View className="px-4 bg-[#FFB423] h-80 rounded-b-[40px] pt-2 relative">
        <Image source={require("../assets/icon.png")} className="w-16 h-16" />
        <View className="mt-16">
          <Text className="text-[40px] font-bold">Welcome</Text>
          <Text className="text-[20px] font-medium">to ShowBusPass First</Text>
        </View>
      </View>
      {/*  */}
      <View className="absolute top-64 flex-row  flex-wrap items-center justify-center">
        {options.map((item, index) => {
          return <OptionCard {...item} key={index} />;
        })}
      </View>
      </SafeAreaView>
  );
};

export default Home;
