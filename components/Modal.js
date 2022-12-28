import React, { useState, useEffect } from "react";
import { Alert, Modal, TouchableOpacity, View, Text } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
const CustomModal = ({ children, modalVisible, handleClose }) => {
  return (
    <GestureRecognizer
      onSwipeDown={() => handleClose()}
      style={{ display: modalVisible ? "flex" : "none" }}
      config={{
        directionalOffsetThreshold: 10000,
        velocityThreshold: 1,
        gestureIsClickThreshold: 1,
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          handleClose();
        }}
      >
        {children}
      </Modal>
    </GestureRecognizer>
  );
};

export default CustomModal;
