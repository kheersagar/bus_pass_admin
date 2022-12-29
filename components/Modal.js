import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Alert,
  Modal,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");

const CustomModal = ({ children, modalVisible ,top,handleClose }) => {
  const display = useSharedValue(modalVisible ? "flex" : "none");
  const translateY = useSharedValue(0);
  const context = useSharedValue({ Y: 0 });

  const updateShowBtn = () =>{
    console.log("closed")
    handleClose()
  }
  const gesture = Gesture.Pan()
    .onBegin((e) => {
      context.value = { Y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.Y;
    })
    .onEnd(() => {
      if (translateY.value > -height / 3) {
        translateY.value = withSpring(50, { damping: 50 });
        runOnJS(updateShowBtn)();
      } else if (translateY.value < -height / 2) {
        console.log(translateY.value ,-height / 2)
        translateY.value = withSpring(-height/2, { damping: 50 });
      }
    });


  useEffect(() => {
    translateY.value = withSpring(-height / 2);
  }, []);
  useEffect(() => {
    display.value = modalVisible ? "flex" : "none";
  }, [modalVisible]);

  const rStyle = useAnimatedStyle(() => {
    // const bRadius = interpolate(
    //   translateY.value,
    //   [-height + 50, height],
    //   [25, 5],
    //   Extrapolate.CLAMP
    // );
    return {
      display: display.value,
      transform: [{ translateY: translateY.value }],
    };
  }, [modalVisible]);

  const styles = StyleSheet.create({
    BottomSheet: {
      height: height,
      width: width,
      position: "absolute",
      top: top,
      borderRadius: 25,
      zIndex: 10,
    },
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.BottomSheet, rStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default CustomModal;
