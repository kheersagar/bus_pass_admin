import { View, Text } from 'react-native'
import React from 'react'
import CustomModal from './Modal'
import * as Progress from 'react-native-progress';
const FullScreenLoading = ({isLoading}) => {
  console.log(isLoading)
  return (
    <CustomModal modalVisible={isLoading}>
      <View className='flex-1 justify-center items-center h-full w-full bg-black opacity-60' >
        <Progress.Circle size={100} indeterminate={true} />
      </View>
    </CustomModal>
  )
}

export default FullScreenLoading