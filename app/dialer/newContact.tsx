import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";

export default function NewContactScreen() {
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
          New Contact
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? "#bbb" : "#333" }]}>
            Name
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#333" : "#f0f0f0",
                color: isDark ? "#fff" : "#000",
              },
            ]}
            placeholder="Enter name"
            placeholderTextColor={isDark ? "#888" : "#666"}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? "#bbb" : "#333" }]}>
            Phone
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#333" : "#f0f0f0",
                color: isDark ? "#fff" : "#000",
              },
            ]}
            placeholder="Enter phone number"
            placeholderTextColor={isDark ? "#888" : "#666"}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: isDark ? "#bbb" : "#333" }]}>
            Email
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#333" : "#f0f0f0",
                color: isDark ? "#fff" : "#000",
              },
            ]}
            placeholder="Enter email"
            placeholderTextColor={isDark ? "#888" : "#666"}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
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
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    flex: 4,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
