import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { appliedList, searchQuery } from "../API/API";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { studentActions } from "../Slices/studentSlice";
import FullScreenLoading from "../components/FullScreenLoading";
import { StatusBar as ExpoBar } from "expo-status-bar";

const PassList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState(""); //search query string
  const [isSearch, setSearch] = useState(false); //check if search query is empty or not
  const [isQuerySearch, setIsQuerySearch] = useState(false); //check if search query data is rendered in flatlist or not
  const { data, dataIsLoading ,refreshing} = useSelector((state) => state.student);

  useEffect(() => {
    // cleanup code
    return () => {
      dispatch(studentActions.clearData()); // clear the data of student list
      setPage(1);
    };
  }, []);

  useEffect(() => {
    // check if search query is empty then fetch data
    if (searchData == "") {
      setPage(1);
      dispatch(studentActions.clearData());
      dispatch(appliedList(1));
      setIsQuerySearch(false);
    }
    setSearch(searchData); //for cancel button
  }, [searchData]);

  const ListItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate.navigate("user-info", { data: item.bus_pass_id })
        }
        className="bg-[#FFD652] h-24 rounded-xl mb-2 flex-row items-center p-4"
      >
        <Image
          source={{
            uri: item.profile_img,
          }}
          className="w-20 h-20 rounded-full mr-4"
        />
        <View>
          <Text className="font-bold text-xl">
            {item.bus_pass_id?.user_details.first_name +
              " " +
              item.bus_pass_id?.user_details.last_name}
          </Text>
          <Text className="font-normal text-lg">
            {item.bus_pass_id?.user_details.branch +
              " " +
              item.bus_pass_id?.user_details.semester}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
    <ExpoBar style="dark" translucent={true} hidden={false} />
      <View className="px-4 mt-2 flex-1">
        <View className="relative">
          <TextInput
            placeholder="Search name"
            value={searchData}
            onSubmitEditing={(data) => {
              setPage(1);
              setIsQuerySearch(true);
              dispatch(searchQuery(searchData, 1));
            }}
            onChangeText={(data) => {
              setSearchData(data);
            }}
            className="h-16 w-full border-2 border-slate-300 rounded-full pl-8 mb-4 placeholder:font-semibold placeholder:text-xl"
          />
          {isSearch && (
            <TouchableOpacity
              onPress={() => {
                setSearchData("");
              }}
              className="bg-gray-300 w-20 h-10 justify-center items-center rounded-lg absolute right-6 top-2 "
            >
              <Text className="text-lg text-gray-600">cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        {data.length ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing}  onRefresh={() => dispatch( appliedList(page,'PULL_REFRESH'))} />}
            onEndReachedThreshold={0.2}
            onEndReached={(e) => {
              setPage((prev) => prev + 1);
              if (isQuerySearch) {
                dispatch(searchQuery(searchData, page + 1));
              } else {
                dispatch(appliedList(page + 1));
              }
            }}
            renderItem={({ item }) => {
              return <ListItem item={item} />;
            }}
          />
        ) : dataIsLoading ? (
          <FullScreenLoading isLoading={true} />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="font-bold text-3xl text-black">No Data</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PassList;
