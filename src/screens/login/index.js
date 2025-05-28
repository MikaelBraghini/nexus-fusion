import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

export function Login({ navigation }) {
    const handleLogin = () => {
        navigation.replace('Dashboard');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Welcome Back!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#999"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Don’t have an account?{' '}
                    <Text style={styles.linkText}>Sign up now!</Text>
                </Text>
            </View>
        </View>
    );
}
