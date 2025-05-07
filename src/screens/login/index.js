import { View, Text, Button } from 'react-native';

export function Login({ navigation }) {
    const handleLogin = () => {
        navigation.replace('Dashboard');
    };

    return (
        <View>
            <Text>Login</Text>
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
}
