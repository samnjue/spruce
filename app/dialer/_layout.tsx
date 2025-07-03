import { Stack } from "expo-router";

export default function PhoneLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="caller"
        options={{
          presentation: "card",
          animation: "slide_from_right",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="newContact"
        options={{
          presentation: "modal",
          animation: "slide_from_right",
          gestureDirection: "horizontal",
        }}
      />
    </Stack>
  );
}
