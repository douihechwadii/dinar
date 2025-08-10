import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title : "Home"}}/>
            <Tabs.Screen name="income" options={{title : "Income"}}/>
            <Tabs.Screen name="expense" options={{title : "Expense"}}/>
            <Tabs.Screen name="profile" options={{title : "Profile"}}/>
        </Tabs>
    );
}