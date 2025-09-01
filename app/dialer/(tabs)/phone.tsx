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
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";

export default function PhoneScreen() {
  const { width, height } = Dimensions.get("window");
  const [display, setDisplay] = useState("");
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const handlePress = (value: string) => {
    setDisplay((prev) => prev + value);
  };

  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (display) {
      router.push({
        pathname: "/dialer/caller",
        params: { number: display },
      });
    }
  };

  const handleAddNumber = () => {
    router.push("/dialer/newContact");
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
          Phone
        </Text>
      </View>
      <View style={styles.display}>
        <Text style={[styles.displayText, { color: isDark ? "#fff" : "#000" }]}>
          {display}
        </Text>
      </View>
      <View style={styles.addNumberContainer}>
        <TouchableOpacity onPress={handleAddNumber}>
          <Text
            style={[
              styles.addNumberText,
              { color: isDark ? "#007AFF" : "#007AFF" },
            ]}
          >
            Add Number
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keypad}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("1")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              1
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("2")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              2
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("3")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              3
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("4")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              4
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("5")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("6")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              6
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("7")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              7
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("8")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              8
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("9")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              9
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("*")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              *
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("0")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              0
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isDark ? "grey" : "#eee" },
            ]}
            onPress={() => handlePress("#")}
          >
            <Text
              style={[styles.buttonText, { color: isDark ? "#fff" : "#000" }]}
            >
              #
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Ionicons name="call" size={30} color="#fff" />
          </TouchableOpacity>
          {display.length > 0 && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <FontAwesome6 name="delete-left" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
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
    flex: 1,
    padding: 10,
    paddingLeft: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 5,
  },
  display: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    top: 50,
  },
  displayText: {
    fontSize: 36,
  },
  addNumberContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    top: -40,
  },
  addNumberText: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
  keypad: {
    flex: 5,
    paddingBottom: 20,
    paddingHorizontal: 20,
    top: -30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    marginTop: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
  },
  callButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 50,
  },
});
