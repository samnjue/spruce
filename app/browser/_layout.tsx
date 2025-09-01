import { Stack } from "expo-router";

export default function BrowserLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="webview" options={{ headerShown: false }} />
    </Stack>
  );
}
