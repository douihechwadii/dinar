import { StyleSheet, Text, View } from "react-native";

export default function IncomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Income Screen</Text>
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