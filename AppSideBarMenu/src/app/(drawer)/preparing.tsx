import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from 'react';
import { Link } from 'expo-router';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { autenticacaoService } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definindo os tipos para a navegação
type RootStackParamList = {
  Login: undefined;
  TelaPrincipal: undefined;
  Delivered: undefined; 
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Preparing({ navigation }: { navigation: NavigationProp }) {
  const CREDENCIAIS_VALIDAS = {
    email: 'adm@adm.com',
    senha: 'adm'
  };

  const [erro, setErro] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const verificarLogin = () => {
    if (email === CREDENCIAIS_VALIDAS.email && senha === CREDENCIAIS_VALIDAS.senha) {
      navigation.navigate('Delivered'); 
    } else {
      setErro('Email ou senha incorretos');
    }
  };
  const handleLogin = async () => {
    try {
      const response = await autenticacaoService.login(email, senha);
      await AsyncStorage.setItem('token', response.token);
      //navigation.navigate('Menu');
    } catch (error) {
      setErro('Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./logo.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain'
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity 
        style={styles.botaoContainer}
        onPress={verificarLogin}
      >
        <Text style={{ color: '#fff' }}>Logar</Text>
      </TouchableOpacity>
      <Link href="/cadastro" style={styles.botaoContainer}>
        <Text style={{ color: '#fff' }}>Cadastro</Text>
      </Link>
      <Text style={styles.title}>Recuperar Senha</Text>
      {erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "#000",
    marginTop: 20
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  botaoContainer: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    color: '#fff',
    marginBottom: 10
  },
  erro: {
    color: 'red',
    marginTop: 10
  }
});