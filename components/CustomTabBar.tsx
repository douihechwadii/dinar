import { Octicons } from '@expo/vector-icons';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Route } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TabProps = {
    route: Route<string>;
    isFocused: boolean;
    onPress: () => void;
    options: BottomTabNavigationOptions;
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const router = useRouter();
    const tabRoutes = state.routes.filter(
        (r) => !r.name.startsWith('_') && !r.name.startsWith('modals/')
    );

    const tabOrder = ['index', 'income', 'expense', 'profile'];
    const orderedTabs = tabOrder.map(name => 
        tabRoutes.find(route => route.name === name)
    ).filter((route): route is Route<string> => route !== undefined);

    return (
    <View style={styles.container}>
      {/* Left side tabs: Home and Income */}
      {orderedTabs.slice(0, 2).map((route, index) => {
        const routeIndex = tabRoutes.findIndex(r => r.name === route.name);
        const isFocused = state.index === routeIndex;
        const { options } = descriptors[route.key];
        
        return (
          <Tab
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={() => navigation.navigate(route.name)}
            options={options}
          />
        );function Tab({ route, isFocused, onPress, options }: TabProps) {
  const iconName = {
    index: 'home',
    income: 'arrow-down',
    expense: 'arrow-up',
    profile: 'person',
  }[route.name as string];

  return (
    <TouchableOpacity onPress={onPress} style={styles.tab}>
      <Octicons name={iconName as any} size={24} color={isFocused ? '#007aff' : '#888'} />
      <Text style={{ color: isFocused ? '#007aff' : '#888', fontSize: 12 }}>
        {options.title || route.name}
      </Text>
    </TouchableOpacity>
  );
}
      })}

      {/* Center Add Button */}
      <TouchableOpacity
        onPress={() => router.push('/modals/add')}
        style={styles.addButton}
      >
        <Octicons name="plus-circle" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Right side tabs: Expense and Settings */}
      {orderedTabs.slice(2, 4).map((route, index) => {
        const routeIndex = tabRoutes.findIndex(r => r.name === route.name);
        const isFocused = state.index === routeIndex;
        const { options } = descriptors[route.key];
        
        return (
          <Tab
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={() => navigation.navigate(route.name)}
            options={options}
          />
        );
      })}
    </View>
  );
}

function Tab({ route, isFocused, onPress, options }: TabProps) {
  const iconName = {
    index: 'home',
    income: 'arrow-down',
    expense: 'arrow-up',
    profile: 'person',
  }[route.name as string];

  return (
    <TouchableOpacity onPress={onPress} style={styles.tab}>
      <Octicons name={iconName as any} size={24} color={isFocused ? '#007aff' : '#888'} />
      <Text style={{ color: isFocused ? '#007aff' : '#888', fontSize: 12 }}>
        {options.title || route.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
  flexDirection: 'row',
  height: 60,
  backgroundColor: '#fff',
  borderRadius: 24,
  marginHorizontal: 16, // Adds space on the left and right
  marginBottom: 16,     // Adds space from bottom
  paddingHorizontal: 8,
  borderTopWidth: 0,    // Remove default top border
  elevation: 5,         // Adds Android shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  alignItems: 'center',
  justifyContent: 'space-evenly',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007aff',
    marginHorizontal: 8,
    borderRadius: 24,
    paddingVertical: 12,
  },
});