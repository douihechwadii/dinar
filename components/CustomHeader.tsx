import { Octicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function CustomHeader() {
    return (
        <View style={styles.container}>
            <View style={[ styles.balance, { borderColor: 'red' } ]}>
                <Octicons name='arrow-up' size={24} style={{ paddingRight: 12 }}/>
                <Text style={styles.title}>1000 $</Text>
            </View>
            <View style={[ styles.balance, { borderColor: 'green' } ]}>
                <Octicons name='arrow-down' size={24} style={{ paddingRight: 12 }}/>
                <Text style={styles.title}>2000 $</Text>
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
    paddingHorizontal: 24,
    borderWidth: 4,
    borderColor: 'green',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: "row",
  }
});