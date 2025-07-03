import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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
          Contacts
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.noText, { color: isDark ? "#bbb" : "#333" }]}>
          No contacts yet
        </Text>
        <TouchableOpacity style={styles.pillButton}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.pillText}>Add contacts</Text>
        </TouchableOpacity>
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
  pillButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  pillText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  noText: {
    fontSize: 21,
    fontWeight: "bold",
    padding: 10,
  },
});
