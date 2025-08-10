import { initializeDatabase } from "@/database/database";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content"/>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modals/add" options={{
          presentation: "modal",
          animation: "fade_from_bottom",
          headerShown: false
        }}/>
      </Stack>
    </SafeAreaProvider>
  );
}
