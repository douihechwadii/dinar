import { useRouter } from 'expo-router';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

export default function AddModal() {
    
    const router = useRouter();
    
    return (
        <View style={styles.container}>
            <View style={styles.splitContainer}>
                <Pressable style={styles.incomeSide} onPress={() => router.push('/income')}>
                    <Text style={styles.sideText}>Add Income</Text>
                </Pressable>
            </View>

            <View style={styles.splitContainer}>
                <Pressable style={styles.expenseSide} onPress={() => router.push('/expense')}>
                    <Text style={styles.sideText}>Add Expense</Text>
                </Pressable>
            </View>

            <Pressable onPress={() => router.back()} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splitContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  incomeSide: {
    flex: 1,
    backgroundColor: '#10B981', // Green
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseSide: {
    flex: 1,
    backgroundColor: '#EF4444', // Red
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    zIndex: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});