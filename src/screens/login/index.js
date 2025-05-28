import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export function Login({ navigation }) {
    const handleLogin = () => {
        navigation.replace('Dashboard');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Seja Bem-Vindo!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Usuário"
                    placeholderTextColor="#999"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Não tem uma conta??{' '}
                    <Text style={styles.linkText}>Inscreva-se agora!</Text>
                </Text>
            </View>
        </View>
    );
}
