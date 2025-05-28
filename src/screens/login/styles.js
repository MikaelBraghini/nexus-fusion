import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFA07A', // fundo de base caso o gradiente falhe
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #FF7F50, #FFB347)', // visual referência
    },
    card: {
        backgroundColor: '#fff',
        width: width * 0.85,
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 25,
        fontSize: 16,
        color: '#333',
        paddingVertical: 8,
    },
    button: {
        backgroundColor: '#000',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        marginTop: 20,
        fontSize: 14,
        color: '#555',
    },
    linkText: {
        color: '#3399FF',
        fontWeight: '600',
    },
});
