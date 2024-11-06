import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Color";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Colors.bgColor,
                    borderTopWidth: 0,
                    padding: 0,
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.primaryColor,
                tabBarInactiveTintColor: "#999",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={28} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name="relationship"
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="people" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="sos"
                options={{
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                backgroundColor: Colors.sosColor,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 50,
                                height: 50,
                                width: 50
                            }}
                        >
                            <MaterialIcons name="crisis-alert" size={24} color={Colors.white} />
                        </View>
                    )
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbox" size={28} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings" size={28} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}