import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import { postAuthUserRequest } from "../../hooks/usePostAuthUser"

export function Login({ navigation }) {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const dados = await postAuthUserRequest({ user, password })
      console.log(dados)
      if (dados?.success) {
        navigation.replace("Dashboard")
      } else {
        alert("Usuário ou senha inválidos")
      }
    } catch (error) {
      console.error(error)
      alert("Erro na autenticação")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Seja Bem-Vindo!</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#999"
          onChangeText={setUser}
          value={user}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Não tem uma conta?{" "}
          <Text style={styles.linkText}>Inscreva-se agora!</Text>
        </Text>
      </View>
    </View>
  )
}
