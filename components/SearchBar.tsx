import { Search } from 'lucide-react-native';
import React from 'react';
import { TextInput, View } from 'react-native';

interface Props{
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className='w-100% flex-row items-center bg-dark-200 rounded-full px-4 py-2 mx-2'>
        <Search color="#A8B5DB" />
        <TextInput
            style={{ fontFamily: "Roboto-Regular" }}
            onPress={onPress}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor='#A8B5DB'
            className='flex-1 ml-2 text-white'
        />
    </View>
  )
}

export default SearchBar