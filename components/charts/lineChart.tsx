import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function ChartKit() {
    return (
        <View>
            <LineChart
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                    datasets: [{ data: [20, 45, 28, 80]}],
                }}
                width={screenWidth - 20}
                height={220}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#f0f0f0',
                    backgroundGradientTo: '#ffffff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
}