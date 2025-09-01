import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function BrowserScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleGo = () => {
    if (url) {
      router.push({
        pathname: "/browser/webview",
        params: { url: url.startsWith("http") ? url : `https://${url}` },
      });
    }
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
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/icons/hustl.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={30}
          color={isDark ? "#888" : "#666"}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: isDark ? "#1c2526" : "#e0e0e0",
              color: isDark ? "#fff" : "#000",
            },
          ]}
          value={url}
          onChangeText={setUrl}
          placeholder="Search or type a URL"
          placeholderTextColor={isDark ? "#888" : "#666"}
          onSubmitEditing={handleGo}
          autoCapitalize="none"
        />
        {/* <TouchableOpacity style={styles.goButton} onPress={handleGo}>
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    bottom: 180,
  },
  logo: {
    width: "60%",
    height: undefined,
    aspectRatio: 1008 / 243,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    bottom: 500,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 10,
    fontSize: 18,
    paddingLeft: 25,
  },
  goButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    marginLeft: 10,
  },
  goButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
