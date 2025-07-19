import { StyleSheet, Text, View } from "react-native";

export default function Balance() {
    return (
        <View style={styles.container}>
            <Text style={styles.budgetText}>5000 $</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        borderRadius: 8,
        margin: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    budgetText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});