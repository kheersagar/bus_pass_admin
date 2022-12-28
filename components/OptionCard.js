import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const OptionCard = ({title,imageSrc,route}) => {
  const navigate = useNavigation()
  return (
    <TouchableOpacity className="bg-[#4274AF] h-52 w-40 rounded-md justify-center items-center m-2 " onPress={() => navigate.navigate(route)}>
        <Image source={imageSrc} className="w-10 h-10"/>
        <Text className="font-semibold text-white mt-4">{title}</Text>
    </TouchableOpacity>
  )
}

export default OptionCard