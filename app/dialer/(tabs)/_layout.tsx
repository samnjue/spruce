import { Tabs } from "expo-router";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PhoneLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? "#000" : "#fff",
          height: 57 + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="phone"
        options={{
          title: "Phone",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "keypad" : "keypad-outline"}
              color={color}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? isDark
                    ? "#007AFF"
                    : "#007AFF"
                  : isDark
                  ? "#bbb"
                  : "#888",
              }}
            >
              Phone
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="recents"
        options={{
          title: "Recents",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              color={color}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? isDark
                    ? "#007AFF"
                    : "#007AFF"
                  : isDark
                  ? "#bbb"
                  : "#888",
              }}
            >
              Recents
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Contacts",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              color={color}
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused
                  ? isDark
                    ? "#007AFF"
                    : "#007AFF"
                  : isDark
                  ? "#bbb"
                  : "#888",
              }}
            >
              Contacts
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
