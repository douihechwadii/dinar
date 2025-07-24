import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content"/>
      <Stack>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen
          name="modals/add"
          options={{
            presentation: 'modal',
            animation: 'fade_from_bottom',
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
