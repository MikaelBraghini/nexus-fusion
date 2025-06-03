import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useGetAllSensores } from "../../hooks/useGetAllSensores";

export function DashBoard() {
  const { loading, dataSensores } = useGetAllSensores();
  const screenWidth = Dimensions.get("window").width - 40;

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Carregando sensores...</Text>
      </View>
    );
  }

  // 🧠 Dados tratados
  const labels = dataSensores.map((item) => {
    const date = new Date(item.data_registro);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  });

  const ozonio = dataSensores.map((item) => item.mq131_analog_value);
  const qualidadeAr = dataSensores.map((item) => item.mq135_analog_value);
  const co = dataSensores.map((item) => item.mq7_analog_value);
  const particulas = dataSensores.map((item) => item.dsm501a_pulses);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌍 Monitoramento da Qualidade do Ar</Text>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Níveis de Ozônio (MQ131)</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: ozonio, color: () => "#4CAF50" }],
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix=" ppm"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>Qualidade Geral do Ar (MQ135)</Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: qualidadeAr, color: () => "#FFC107" }],
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix=" ppm"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>
          Níveis de Monóxido de Carbono (MQ7)
        </Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: co, color: () => "#F44336" }],
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix=" ppm"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.chartTitle}>
          Partículas Suspensas (DSM501A)
        </Text>
        <LineChart
          data={{
            labels,
            datasets: [{ data: particulas, color: () => "#2196F3" }],
          }}
          width={screenWidth}
          height={220}
          yAxisSuffix=" u"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#ffffff",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f1f5f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#0f172a",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1e293b",
  },
  chart: {
    borderRadius: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
  loadingText: {
    fontSize: 18,
    color: "#334155",
  },
});
