import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Index() {
  const { width, height } = Dimensions.get("window");
  const dockHeight = height * 0.145;
  const iconSize = dockHeight * 0.5;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/wallpapers/wallpaper_1.jpg")}
        style={styles.background}
      >
        <View style={styles.content}>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
            <TouchableOpacity style={styles.gridButton} />
          </View>
        </View>
        <BlurView
          intensity={80}
          experimentalBlurMethod="dimezisBlurView"
          style={[styles.dock, { height: dockHeight }]}
        >
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/dialer/(tabs)/phone")}
            >
              <Image
                source={require("../assets/app_icons/phone_icon.png")}
                style={{ width: iconSize, height: iconSize }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/browser")}
            >
              <Image
                source={require("../assets/app_icons/safari_icon.png")}
                style={{ width: iconSize, height: iconSize }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/messages")}
            >
              <Image
                source={require("../assets/app_icons/message_icon.png")}
                style={{ width: iconSize, height: iconSize }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Image
                source={require("../assets/app_icons/camera_icon.png")}
                style={{ width: iconSize, height: iconSize }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </BlurView>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  gridButton: {
    width: 70,
    height: 70,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 10,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dock: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingVertical: 5,
  },
  button: {
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
