import { useBalance } from '@/context/BalanceContext'; // Adjust path as needed
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CustomHeader() {
  const { balanceData, loading } = useBalance();

  // Function to format currency
  const formatCurrency = (amount: number): string => {
    return `${amount.toFixed(2)} $`;
  };

  return (
    <View style={styles.container}>
      {/* Income Display */}
      <View style={[styles.balance, { borderColor: 'green' }]}>
        <Ionicons 
          name='arrow-up-outline' 
          size={24} 
          style={{ paddingRight: 12 }} 
          color="green"
        />
        <Text style={[styles.title, { color: 'green' }]}>
          {loading ? '...' : formatCurrency(balanceData.total_income)}
        </Text>
      </View>

      {/* Expense Display */}
      <View style={[styles.balance, { borderColor: 'red' }]}>
        <Ionicons 
          name='arrow-down-outline' 
          size={24} 
          style={{ paddingRight: 12 }} 
          color="red"
        />
        <Text style={[styles.title, { color: 'red' }]}>
          {loading ? '...' : formatCurrency(balanceData.total_expense)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 40,
    borderBottomWidth: 0,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    shadowOffset: { width: 0, height: 4 },
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balance: {
    backgroundColor: "#f8f8f8",
    height: 40,
    borderRadius: 16,
    margin: 8,
    paddingHorizontal: 12,
    borderWidth: 4,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row",
    flex: 1,
    maxWidth: 180,

  }
});