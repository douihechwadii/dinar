// app/_layout.tsx
import MyCustomHeader from '@/components/customHeader';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function RootLayout() {
  return (
    <SafeAreaProvider>      
        
        {/* Change this later to a string that changes based on light or dark mode */}
        <StatusBar barStyle="dark-content"/>
        <Stack screenOptions={{
            header: () => <MyCustomHeader/>
        }}>
            {/* Default stack screen (your Tabs layout is in `(tabs)/_layout.tsx`) */}
            <Stack.Screen name="(tabs)"/>
            {/* Modal screen customization */}
            <Stack.Screen
                name='modals/add'
                options={{
                    presentation: 'modal', // or 'transparentModal', 'fullScreenModal'
                    animation: 'slide_from_bottom',
                    headerShown: false,
                }}
            />
        </Stack>
    </SafeAreaProvider>
  );
}
