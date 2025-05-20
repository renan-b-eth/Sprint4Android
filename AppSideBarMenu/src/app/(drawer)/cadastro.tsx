//Importanteo os componentes necessários da biblioteca do react native 

import { StyleSheet, Text, View, TextInput, Button, Image, ActivityIndicator  } from "react-native";
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { autenticacaoService } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ErroAutenticacao } from './types';

// Definiindo o componente funional home como padrão de exportação
export default function Cadastro() {
  const router = useRouter();
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    responsavel: ''
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Simulação de cadastro 
  const simularCadastro = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return true;
  };

  const handleCadastro = async () => {
    setCarregando(true);
    setErro('');
    
    try {
      const clinica = await autenticacaoService.cadastrar(
        dados.nome,
        dados.email,
        dados.senha,
        dados.responsavel
      );
      
      // Armazenar o token
      await AsyncStorage.setItem('usuario_cadastrado', JSON.stringify(clinica));
      
      // Voltar para a tela de login
      router.back();
    } catch (error) {
      // Criar um type guard para verificar se o erro tem a estrutura esperada
      const isErrorWithCodigo = (erro: unknown): erro is ErroAutenticacao => {
        return (
          typeof erro === 'object' &&
          erro !== null &&
          'codigo' in erro &&
          'mensagem' in erro
        );
      };
  
      if (isErrorWithCodigo(error)) {
        setErro(`Erro ${error.codigo}: ${error.mensagem}`);
        if (error.detalhes) {
          console.error('Detalhes do erro:', error.detalhes);
        }
      } else {
        setErro('Erro ao cadastrar clínica. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text style={{ fontSize: 24, marginBottom: 20, fontWeight: 'bold' }}>
        Cadastro de Clínica
      </Text>
      <Image
        source={require('./logo.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain'
        }}
      />

      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 15,
          paddingHorizontal: 10
        }}
        placeholder="Nome"
        value={dados.nome}
        onChangeText={(text) => setDados({...dados, nome: text})}
      />

      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 15,
          paddingHorizontal: 10
        }}
        placeholder="Email"
        value={dados.email}
        onChangeText={(text) => setDados({...dados, email: text})}
        keyboardType="email-address"
      />

      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 15,
          paddingHorizontal: 10
        }}
        secureTextEntry={true}
        placeholder="Senha"
        value={dados.senha}
        onChangeText={(text) => setDados({...dados, senha: text})}
      />

      <TextInput
        style={{
          width: '100%',
          height: 40,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          marginBottom: 15,
          paddingHorizontal: 10
        }}
        placeholder="Responsável"
        value={dados.responsavel}
        onChangeText={(text) => setDados({...dados, responsavel: text})}
      />

      {erro && (
        <Text style={{ color: 'red', marginBottom: 15 }}>
          {erro}
        </Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: '#007AFF',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          marginBottom: 10,
          width: '100%'
        }}
        onPress={handleCadastro}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff' }}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}