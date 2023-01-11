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
import { FlatList } from "react-native-gesture-handler";
import { StatusBar as ExpoBar } from "expo-status-bar";

const Home = () => {
  const options = [
    {
      title: "Approve/Decline",
      imageSrc: require("../assets/Image/Icons/admin.png"),
      route: "update-pass",
    },
    {
      title: "Add Student",
      imageSrc: require("../assets/Image/Icons/add-user.png"),
      route: "create-user",
    },
    {
      title: "Add Validator",
      imageSrc: require("../assets/Image/Icons/add-user.png"),
      route: "add-validator",
    },
    {
      title: "Profile Setting",
      imageSrc: require("../assets/Image/Icons/setting.png"),
      route: "test",
    },
  ];
  useEffect(() => {}, []);
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
    <ExpoBar style="dark" translucent={true} hidden={false} />
      <View className="px-4 bg-[#FFB423] h-80 rounded-b-[40px] pt-2 relative">
        <Image source={require("../assets/icon.png")} className="w-16 h-16" />
        <View className="mt-16">
          <Text className="text-[40px] font-bold">Welcome</Text>
          <Text className="text-[20px] font-medium">to ShowBusPass First</Text>
        </View>
      </View>
      {/*  */}
      <FlatList
          showsVerticalScrollIndicator={false}
            data={options}
            numColumns={2}
            contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
            className="absolute top-64  w-full h-4/6"
            renderItem={({ item }) => {
              return <OptionCard {...item} />;
            }}
          />
    </SafeAreaView>
  );
};

export default Home;
