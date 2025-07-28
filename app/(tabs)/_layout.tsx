import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8f8'}}>
            <Tabs screenOptions={{}}>
                <Tabs.Screen name="index" options={{ 
                    title: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={color}
                        />
                    )
                    }}
                />
                <Tabs.Screen name="income" options={{ 
                    title: 'Income',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'arrow-down-circle' : 'arrow-down'}
                            size={size}
                            color={color}
                        />
                    )
                    }}
                />
                <Tabs.Screen name="expense" options={{ 
                    title: 'Expense',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'arrow-up-circle' : 'arrow-up'}
                            size={size}
                            color={color}
                        />
                    )
                    }}
                />
                <Tabs.Screen name="saving" options={{ 
                    title: 'Saving',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'card' : 'card-outline'}
                            size={size}
                            color={color}
                        />
                    )
                    }}
                />
            </Tabs>
        </View>
    );
}