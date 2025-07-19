import React from "react";
import { Dimensions, View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get('window').width;

export default function BarChartKit() {
    return (
        <View>
            <BarChart
                data={{
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    datasets: [{ data: [12, 19, 14, 20, 25] }],
                }}
                width={screenWidth - 20}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                verticalLabelRotation={30} yAxisSuffix={""}
                style={{
                    marginVertical: 8,
                    borderRadius: 8,
                }}
            
            />
        </View>
    );
}