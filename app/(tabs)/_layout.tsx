import { Tabs } from 'expo-router';
import { Download, House, Search, User } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from "../../components/AppText";

const TabIcon = ({ icon: Icon, text, focused }: any) => {
    if (focused) {
        return (
            <View className="mt-3 h-16 w-32 flex gap-1 items-center justify-center bg-pink-400 py-2 px-4 rounded-full font-semibold">
                <Icon size={18} className="h-full" />
                <AppText>{text}</AppText>
            </View>
        );
    } else {
        return (
            <View className="mt-3 flex items-center justify-center py-2 px-4 rounded-full font-semibold">
                <Icon size={18} color="#c3c7cfff" />
            </View>
        );
    }
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0
        },
        tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#0F0D23',
            borderRadius: 50,
            paddingTop: 4,
            marginHorizontal: 20,
            marginBottom: 20,
            height: 58,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#0F0D23'
            
        }
      }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused}) => (
                    <TabIcon
                        icon={House}
                        text="Home"
                        focused={focused} />
                )
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
                title: "Search",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={Search}
                        text="Search"
                        focused={focused} />
                )
            }} />
        <Tabs.Screen
            name="saved"
            options={{
                title: "Saved",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={Download}
                        text="Saved"
                        focused={focused} />
                )
            }} />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        icon={User}
                        text="Profile"
                        focused={focused} />
                )
            }} />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})