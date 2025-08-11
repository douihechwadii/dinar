import { useBalance } from "@/context/BalanceContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ExpenseScreen() {

    const {balanceData, loading} = useBalance();

    const formatCurrency = (amount: number): string => {
        return `${amount.toFixed(2)} $`;
    };

    return (
        <View style={styles.container}>
            <Text>{loading ? '...' : formatCurrency(balanceData.total_expense)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});