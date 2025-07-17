import { Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="income"
        options={{
          title: 'Income',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="arrow-down" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: 'Expense',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="arrow-up" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Octicons name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}