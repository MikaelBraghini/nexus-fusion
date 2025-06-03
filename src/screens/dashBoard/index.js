import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LineChart } from "react-native-chart-kit";
import { useGetAllSensores } from "../../hooks/useGetAllSensores";
import { Card } from "react-native-paper";

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

  // Dados tratados
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

  // Normalização para IQAR
  const normalizar = (valor, min, max) => {
    const norm = (valor - min) / (max - min);
    return Math.min(Math.max(norm, 0), 1);
  };

  const iqar =
    (normalizar(ozonio.at(-1), 0, 500) +
      normalizar(qualidadeAr.at(-1), 0, 500) +
      normalizar(co.at(-1), 0, 500) +
      normalizar(particulas.at(-1), 0, 500)) /
    4;

  const percentual = Math.round(iqar * 100);

  const getIqarStatus = () => {
    if (iqar <= 0.3) return { status: "Bom", color: "#4CAF50" };
    if (iqar <= 0.6) return { status: "Moderado", color: "#FFC107" };
    return { status: "Ruim", color: "#F44336" };
  };

  const { status, color } = getIqarStatus();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard de Qualidade do Ar</Text>

      {/* Card IQAR */}
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text style={styles.cardTitle}>Índice de Qualidade do Ar (IQAR)</Text>
          <AnimatedCircularProgress
            size={160}
            width={15}
            fill={percentual}
            tintColor={color}
            backgroundColor="#e6e6e6"
            rotation={0}
            lineCap="round"
          >
            {(fill) => (
              <View style={styles.iqarCenter}>
                <Text style={[styles.iqarValue, { color }]}>{status}</Text>
                <Text style={styles.iqarPercent}>{percentual}%</Text>
              </View>
            )}
          </AnimatedCircularProgress>

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Ozônio</Text>
              <Text style={styles.metricValue}>{ozonio.at(-1)} ppm</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Partículas</Text>
              <Text style={styles.metricValue}>{particulas.at(-1)} u</Text>
            </View>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>CO</Text>
              <Text style={styles.metricValue}>{co.at(-1)} ppm</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Ar Geral</Text>
              <Text style={styles.metricValue}>{qualidadeAr.at(-1)} ppm</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Gráficos */}
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
        <Text style={styles.chartTitle}>Níveis de Monóxido de Carbono (MQ7)</Text>
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
        <Text style={styles.chartTitle}>Partículas Suspensas (DSM501A)</Text>
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
    padding: 16,
    backgroundColor: "#f4f6f8",
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#1f77b4",
  },
  card: {
    borderRadius: 16,
    elevation: 4,
    backgroundColor: "#ffffff",
    marginBottom: 20,
    padding: 16,
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  iqarCenter: {
    alignItems: "center",
  },
  iqarValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  iqarPercent: {
    fontSize: 16,
    color: "#555",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 16,
  },
  metric: {
    alignItems: "center",
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
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
  },
  loadingText: {
    fontSize: 18,
  },
});
