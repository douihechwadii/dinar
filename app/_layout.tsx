import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modals/add" options={{
        presentation: "modal",
        animation: "fade_from_bottom",
        headerShown: false
      }}/>
    </Stack>
  );
}
