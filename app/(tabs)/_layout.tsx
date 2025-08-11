import CustomTabBar from "@/components/CustomTabBar";
import { BalanceProvider } from "@/context/BalanceContext";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <BalanceProvider>
            <Tabs
                tabBar={(props) => <CustomTabBar {...props}/>}
            >
                <Tabs.Screen name="index" options={{title : "Home"}}/>
                <Tabs.Screen name="income" options={{title : "Income"}}/>
                <Tabs.Screen name="expense" options={{title : "Expense"}}/>
                <Tabs.Screen name="profile" options={{title : "Profile"}}/>
            </Tabs>
        </BalanceProvider>
    );
}