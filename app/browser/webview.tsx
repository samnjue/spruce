import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

export default function WebViewScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { url } = useLocalSearchParams();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState(url || "https://example.com");

  useEffect(() => {
    if (url) {
      setCurrentUrl(url.startsWith("http") ? url : `https://${url}`);
    }
  }, [url]);

  const handleGoBack = () => router.back();
  const handleGoForward = () => {}; // Implement forward navigation if needed
  const handleRefresh = () => {}; // Implement refresh logic if needed

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1c2526" : "#f0f0f0" },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? "#2c3e50" : "#e0e0e0",
            paddingTop: insets.top,
          },
        ]}
      >
        <TouchableOpacity style={styles.navButton} onPress={handleGoBack}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons
            name="arrow-forward"
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="refresh" size={24} color={isDark ? "#fff" : "#000"} />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.urlInput,
            {
              backgroundColor: isDark ? "#333" : "#fff",
              color: isDark ? "#fff" : "#000",
            },
          ]}
          value={currentUrl}
          onChangeText={setCurrentUrl}
          placeholder="Enter URL"
          placeholderTextColor={isDark ? "#888" : "#666"}
        />
        {/* <TouchableOpacity
          style={styles.goButton}
          onPress={() =>
            router.push({
              pathname: "/browser/webview",
              params: {
                url: currentUrl.startsWith("http")
                  ? currentUrl
                  : `https://${currentUrl}`,
              },
            })
          }
        >
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity> */}
      </View>
      <WebView
        style={styles.webview}
        source={{ uri: currentUrl }}
        onNavigationStateChange={(navState) => setCurrentUrl(navState.url)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  navButton: {
    marginRight: 10,
  },
  urlInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
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
  webview: {
    flex: 1,
  },
});
