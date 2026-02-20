import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DoctorTabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#2e86de",
                tabBarLabelStyle: { fontSize: 12 },
            }}
        >

            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="eegAnalysis"
                options={{
                    title: "EEG analysis",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pulse-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="treatment"
                options={{
                    title: "Treatment",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="medkit-outline" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
