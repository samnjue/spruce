import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

export default function RecentsScreen() {
  const { width, height } = Dimensions.get("window");
  const [display, setDisplay] = useState("");
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handlePress = (value: string) => {
    setDisplay((prev) => prev + value);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#000" : "#fff" },
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          Recents
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.noCallsText, { color: isDark ? "#bbb" : "#444" }]}>
          No recent calls
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 10,
    paddingLeft: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCallsText: {
    fontSize: 21,
    fontWeight: "bold",
    padding: 10,
  },
});
