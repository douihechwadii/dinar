import React from 'react';
import { Text, TextInput, View } from 'react-native';

const AddExpense = () => (
  <View>
    <Text>Add Expense</Text>
    <TextInput placeholder="Amount" />
    {/* Add more fields */}
  </View>
);

export default AddExpense;
