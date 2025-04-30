import { styles } from "./styles";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useGetAllSensores } from "./../../hooks/useGetAllSensores";

export function DashBoard() {
  const { loading, dataSensores } = useGetAllSensores();

  if (loading) {
    return (
      <View>
        <Text>Carregando sensores...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={dataSensores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>ID: {item.id}</Text>
            <Text>Ozônio: {item.ozonio}</Text>
            <Text>CO₂: {item.dioxidoCarbono}</Text>
            <Text>Enxofre: {item.enxofre}</Text>
            <Text>Partículas 10µm: {item.particulas10}</Text>
            <Text>Partículas 2.5µm: {item.particulas25}</Text>
          </View>
        )}
      />
    </View>
  );
}
