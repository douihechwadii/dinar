// /modals/add.tsx
import AddExpense from '@/components/modals/AddExpense';
import AddIncome from '@/components/modals/AddIncome';
import AddSaving from '@/components/modals/AddSaving';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AddModalProps = {
  visible: boolean;
  onClose: () => void;
};

const router = useRouter();

const AddModal = ({ visible, onClose }: AddModalProps) => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income' | 'saving'>('expense');

  const renderContent = () => {
    const props = {onRegister: onClose}
    switch (activeTab) {
      case 'expense':
        return <AddExpense {...props}/>;
      case 'income':
        return <AddIncome {...props}/>;
      case 'saving':
        return <AddSaving {...props}/>;
    }
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabs}>
          {['expense', 'income', 'saving'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={activeTab === tab ? styles.activeText : styles.inactiveText}>
                {`Add ${tab.charAt(0).toUpperCase() + tab.slice(1)}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {renderContent()}
        </View>

        {/* Close Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20, backgroundColor: 'white' },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: '#007aff' },
  activeText: { color: '#007aff', fontWeight: 'bold' },
  inactiveText: { color: '#777' },
  content: { flex: 1, padding: 16 },
  closeButton: { alignItems: 'center', padding: 12, backgroundColor: '#eee' },
  closeText: { color: '#333' }
});
