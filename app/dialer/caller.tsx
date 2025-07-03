import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";

export default function CallerScreen() {
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const { number } = useLocalSearchParams();
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        const [minutes, seconds] = prev.split(":").map(Number);
        const totalSeconds = minutes * 60 + seconds + 1;
        const newMinutes = Math.floor(totalSeconds / 60)
          .toString()
          .padStart(2, "0");
        const newSeconds = (totalSeconds % 60).toString().padStart(2, "0");
        return `${newMinutes}:${newSeconds}`;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEndCall = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require("../../assets/wallpapers/wallpaper_1.jpg")}
      style={styles.background}
    >
      <BlurView
        intensity={80}
        experimentalBlurMethod="dimezisBlurView"
        style={[
          styles.container,
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
        ]}
      >
        <View style={styles.displayArea}>
          <Text
            style={[styles.displayText, { color: isDark ? "#fff" : "#000" }]}
          >
            {number || "No number"}
          </Text>
          <Text style={[styles.timeText, { color: isDark ? "#fff" : "#666" }]}>
            {time}
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="mic-off" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="keypad" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="volume-high" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="videocam" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Ionicons name="person" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.endCallButtonContainer}>
          <TouchableOpacity
            style={styles.endCallButton}
            onPress={handleEndCall}
          >
            <Ionicons name="call" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </BlurView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  displayArea: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    fontSize: 48,
  },
  timeText: {
    fontSize: 18,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  endCallButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 80,
  },
  endCallButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff2d55",
    justifyContent: "center",
    alignItems: "center",
  },
});
