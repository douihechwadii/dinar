import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  onRegister: () => void;
};

const AddIncome = ({ onRegister }: Props) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Income</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Pressable onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </Pressable>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={( event: DateTimePickerEvent, selectedDate?: Date) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={onRegister} color='#007aff' />
      </View>
    </View>
  );
};

export default AddIncome;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dateButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    color: '#333',
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    width: '100%',
  },
});
