import BarChartKit from "@/components/charts/barChart";
import ChartKit from "@/components/charts/lineChart";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        alignItems: 'center'
      }}
    >
      <ChartKit/>
      <BarChartKit/>
    </View>
  );
}
