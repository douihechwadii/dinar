import CustomHeader from "@/components/CustomHeader";
import { BalanceProvider } from "@/context/BalanceContext"; // Adjust path as needed
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
      <BalanceProvider>
        <StatusBar barStyle="dark-content"/>
        <Stack screenOptions={{
          header: () => <CustomHeader/>
        }}>
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen
            name="modals/TabBarModal"
            options={{
              presentation: 'modal',
              animation: 'fade_from_bottom',
              headerShown: false,
            }}
          />
        </Stack>
      </BalanceProvider>
    </SafeAreaProvider>
  );
}