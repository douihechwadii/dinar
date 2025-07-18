// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Default stack screen (your Tabs layout is in `(tabs)/_layout.tsx`) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Modal screen customization */}
      <Stack.Screen
        name="modals/add"
        options={{
          presentation: 'modal', // or 'transparentModal', 'fullScreenModal'
          animation: 'slide_from_bottom',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
