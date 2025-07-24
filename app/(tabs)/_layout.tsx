import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name="index" options={{ title: 'Home' }}/>
                <Tabs.Screen name="income" options={{ title: 'Income' }}/>
                <Tabs.Screen name="expense" options={{ title: 'Expense' }}/>
                <Tabs.Screen name="profile" options={{ title: 'Profile' }}/>
            </Tabs>
        </View>
    );
}