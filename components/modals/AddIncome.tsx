import { useBalance } from '@/context/BalanceContext'; // Adjust path as needed
import { dbOperations } from '@/database/database'; // Adjust path as needed
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
  type: string;
};

type Props = {
  onRegister?: (success: boolean) => void;
};

const AddIncome = ({ onRegister }: Props) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);

  // Use the balance context to refresh header data
  const { refreshBalance } = useBalance();

  // Load expense categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const incomeCategories = dbOperations.getCategories('income') as Category[];
      setCategories(incomeCategories);
      
      // Auto-select first category if available
      if (incomeCategories.length > 0) {
        setSelectedCategory(incomeCategories[0]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Failed to load categories');
    }
  };

  const validateInput = (): boolean => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      return false;
    }

    if (!selectedCategory) {
      Alert.alert('Missing Category', 'Please select a category');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInput()) return;

    setLoading(true);
    try {
      const parsedAmount = parseFloat(amount);
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format

      // Create the expense transaction
      const result = dbOperations.createTransaction(
        parsedAmount,
        'income',
        selectedCategory!.id,
        description.trim() || undefined,
        formattedDate
      );

      if (result.changes > 0) {
        // Refresh the balance data in the header
        await refreshBalance();
        
        Alert.alert(
          'Success', 
          'Income added successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Reset form
                resetForm();
                if (onRegister) {
                  onRegister(true);
                }
              }
            }
          ]
        );
      } else {
        throw new Error('Failed to create transaction');
      }
    } catch (error) {
      console.error('Error creating income:', error);
      Alert.alert('Error', 'Failed to add income. Please try again.');
      if (onRegister) {
        onRegister(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setDate(new Date());
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Add Income</Text>
      
      {/* Amount and Date Row */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          editable={!loading}
        />
        <Pressable 
          onPress={() => setShowPicker(true)} 
          style={styles.dateButton}
          disabled={loading}
        >
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </Pressable>
      </View>

      {/* Description Input */}
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={2}
        editable={!loading}
      />

      {/* Category Selection */}
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { backgroundColor: category.color + '20' }, // Add transparency
              selectedCategory?.id === category.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category)}
            disabled={loading}
          >
            <Text style={[
              styles.categoryText,
              { color: category.color },
              selectedCategory?.id === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Register Button */}
      <View style={styles.buttonContainer}>
        <Button 
          title={loading ? "Adding..." : "Add Income"} 
          onPress={handleRegister} 
          color='#007aff'
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

export default AddIncome;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  descriptionInput: {
    flex: undefined,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  dateButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    color: '#333',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCategory: {
    borderColor: '#007aff',
    borderWidth: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 24,
    alignSelf: 'center',
    width: '100%',
    marginBottom: 20,
  },
});