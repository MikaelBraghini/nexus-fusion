import { useGetAllSensores } from "../../hooks/useGetAllSensores"
import { styles } from "./styles"
import { View, Text } from "react-native"

export function DashBoard() {
    console.log(useGetAllSensores)

    return (
        <View>
            <Text style={styles.titleDashBoard}>DashBord</Text>
        </View>
    )
}