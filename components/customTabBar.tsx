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
    (r) => !r.name.startsWith('_') && !r.name.startsWith('modal/')
  );

  // Define the desired tab order: Home, Income, [Add Button], Expense, Settings
  const tabOrder = ['index', 'income', 'expense', 'settings'];
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
        );
      })}

      {/* Center Add Button */}
      <TouchableOpacity
        onPress={() => router.push('/modals/add')}
        style={styles.addButton}
      >
        <Octicons name="diff-added" size={24} color="#fff" />
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
    settings: 'gear',
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
    borderTopWidth: 1,
    borderTopColor: '#ddd',
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
    borderRadius: 10,
    paddingVertical: 8,
  },
});