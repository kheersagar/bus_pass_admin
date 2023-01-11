import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../Slices/userSlice";
import { applyBussPass, getUserData, updatePass } from "../API/API";
import CustomModal from "../components/Modal";
import ImageZoom from "react-native-image-pan-zoom";
import FullScreenLoading from "../components/FullScreenLoading";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Progress from "react-native-progress";
const { width, height } = Dimensions.get("window");
import { StatusBar as ExpoBar } from "expo-status-bar";

const UserInfo = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigate = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [busNo, setBusNo] = useState("");
  const [decline_reason, setDeclineReason] = useState("");
  const [isFocused, setIsFocussed] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsFocussed(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsFocussed(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const {
    data: {
      user_details,
      status,
      _id: bus_pass_id,
      user_id,
      user_details: {
        receipt_img,
        profile_img,
        first_name,
        last_name,
        email,
        branch,
        semester,
        phone_no,
        address,
      } = {},
    } = {},
  } = useRoute().params;
  const { approveLoading, declineLoading } = useSelector(
    (state) => state.student
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(currentDate);
    setShow(false);
    setDate(currentDate);
  };
  function formatDate(d) {
    const date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return (d = dd + "/" + mm + "/" + yyyy);
  }
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : null,
      }}
    >
      <ExpoBar style="dark" translucent={true} hidden={false} />
      {/* receipt image modal */}
      {modalVisible && (
        <CustomModal
          modalVisible={modalVisible}
          top={height / 1.5}
          handleClose={() => {
            console.log("modal closed");
            setModalVisible(false);
          }}
        >
          <View
            className="flex-1 relative w-full h-80 rounded-xl "
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
          >
            <View className="w-full items-center justify-center">
              <View className="w-14 h-2 bg-white rounded-full items-center justify-center mt-2"></View>
            </View>
            <View className="w-full items-end z-10">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className=" mt-2 mr-2 w-24 h-12 rounded-full justify-center items-center px-4 bg-white"
              >
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
                {receipt_img && (
                  <Image
                    source={{ uri: receipt_img }}
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </ImageZoom>
            </View>
          </View>
        </CustomModal>
      )}

      {/* approve modal */}
      {approveModal && (
        <CustomModal
          modalVisible={approveModal}
          top={isFocused ? height / 13 : height / 2}
          handleClose={() => setApproveModal(false)}
        >
          <View className="h-72 absolute bottom-0 w-full  rounded-xl bg-white ">
            <View className="w-full items-center justify-center">
              <View className="w-28 h-2 bg-black rounded-full items-center justify-center mt-2"></View>
            </View>
            <View className="w-full items-end z-10">
              <TouchableOpacity
                onPress={() => setApproveModal(false)}
                className=" mt-2 mr-2 w-24 h-12 rounded-full justify-center items-center px-4 bg-black"
              >
                <Text className="text-white text-xl font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 justify-center items-center px-4">
              <Text>Valid Till</Text>
              <TouchableOpacity
                onPress={() => setShow(true)}
                className="w-1/2 justify-center items-center"
              >
                <Text className="h-10 w-full border-b text-center text-lg font-bold">
                  {date ? `${formatDate(date)}` : "Valid till DD/MM/YYY"}{" "}
                </Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
              <Text className="mt-2">Bus No.</Text>
              <TextInput
                keyboardType="numeric"
                className="h-10 w-1/2 border-b text-center text-lg font-bold"
                value={busNo}
                onChangeText={(data) => setBusNo(data)}
                onFocus={(e) => setIsFocussed(true)}
                onSubmitEditing={(e) => setIsFocussed(false)}
              />
              <TouchableOpacity
                className="items-center justify-center w-full h-14 rounded-full p-2 px-4 mt-4 bg-green-600"
                onPress={() =>
                  dispatch(
                    updatePass({
                      bus_pass_id,
                      user_id,
                      status: 2,
                      valid_till: date,
                      bus_no: busNo,
                      navigate,
                    })
                  )
                }
              >
                {approveLoading ? (
                  <Progress.Circle size={25} color="white" />
                ) : (
                  <Text
                    className={`text-white font-medium text-lg flex-1 w-86 text-center`}
                  >
                    Approve
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
      )}
      {/* Decline modal */}
      {declineModal && (
        <CustomModal
          modalVisible={declineModal}
          top={isFocused ? height / 13 : height / 2}
          handleClose={() => setDeclineModal(false)}
        >
          <View className="h-72 absolute bottom-0 w-full  rounded-xl bg-white pb-4">
            <View className="w-full items-center justify-center">
              <View className="w-28 h-2 bg-black rounded-full items-center justify-center mt-2"></View>
            </View>
            <View className="w-full items-end z-10">
              <TouchableOpacity
                onPress={() => setDeclineModal(false)}
                className=" my-2 mr-2 w-24 h-12 rounded-full justify-center items-center px-4 bg-black"
              >
                <Text className="text-white text-xl font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 justify-center items-center px-4">
              <TextInput
                placeholder="Add comments.."
                value={decline_reason}
                onChangeText={(data) => setDeclineReason(data)}
                className="w-full border-gray-300 border rounded-lg h-4/6 text-center font-black placeholder:font-bold placeholder:text-2xl "
              />
              <TouchableOpacity
                className="items-center justify-center w-full h-14 rounded-full p-2 px-4 mt-4  bg-red-600"
                onPress={() =>
                  dispatch(
                    updatePass({
                      bus_pass_id,
                      user_id,
                      status: 3,
                      decline_reason: decline_reason,
                      navigate,
                    })
                  )
                }
              >
                {declineLoading ? (
                  <Progress.Circle size={25} color="white" />
                ) : (
                  <Text className="text-white font-medium text-lg flex-1 w-86 text-center">
                    Decline
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
      )}
      {/* loading screen */}
      {/* <FullScreenLoading isLoading={applyLoading} /> */}
      <View className="flex-1 bg-[#FFD652]">
        <ScrollView>
          <Image
            resizeMode="contain"
            source={{
              uri: profile_img,
            }}
            className="w-full h-52 object-cover rounded-lg"
          />
          <View className="  min-h-full p-4 px-6">
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {first_name + " " + last_name}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {branch}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {semester} semester
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {phone_no}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
              {address}
            </Text>
            <Text className="font-extrabold text-xl mb-2 bg-yellow-500 rounded-lg px-2 py-2">
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
            {/* button */}
            <View className="justify-center items-center flex-row space-x-4">
              <TouchableOpacity
                className="flex-row  items-center w-1/2 h-14 rounded-full p-2 px-4 mt-4 bg-green-600"
                onPress={() => setApproveModal(true)}
              >
                <Text
                  className={`text-white font-extrabold text-xl flex-1 w-86 text-center`}
                >
                  Approve
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-row  items-center w-1/2 h-14 rounded-full p-2 px-4 mt-4 bg-red-600"
                onPress={() => setDeclineModal(true)}
              >
                <Text
                  className={`text-white font-extrabold text-xl flex-1 w-86 text-center`}
                >
                  Decline
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserInfo;
