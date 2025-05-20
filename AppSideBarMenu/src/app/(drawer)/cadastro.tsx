// Cadastro.tsx
import { StyleSheet, Text, View, TextInput, Image, ActivityIndicator } from "react-native";
import React, { useState, useCallback } from 'react';
import { Link, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { autenticacaoService } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { Alert } from 'react-native';

export interface CadastroDados {
  nome: string;
  email: string;
  senha: string;
  responsavel: string;
}

interface ErroAutenticacao {
  mensagem: string;
}

export default function Cadastro() {
  const router = useRouter();
  
  // Estado para dados do formulário
  const [dados, setDados] = useState<CadastroDados>({
    nome: '',
    email: '',
    senha: '',
    responsavel: ''
  });
  
  // Estados de controle
  const [erro, setErro] = useState<string>('');
  const [carregando, setCarregando] = useState(false);

  // Função otimizada com useCallback para evitar re-renderizações desnecessárias
  const handleCadastro = useCallback(async () => {
    // Validação inicial dos dados
    if (!dados.nome || !dados.email || !dados.senha || !dados.responsavel) {
      setErro('Por favor, preencha todos os campos');
      return;
    }
  
    setCarregando(true);
    setErro('');
  
    try {
      // Configuração da requisição com timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 10000);
  
      console.log('[DEBUG] Tentando cadastrar:', {
        nome: dados.nome,
        email: dados.email,
        senha: dados.senha,
        responsavel: dados.responsavel
      });
  
      const response = await autenticacaoService.cadastrar(
        dados.nome,
        dados.email,
        dados.senha,
        dados.responsavel
      );
  
      console.log('[DEBUG] Resposta do servidor:', response);
  
      clearTimeout(timeoutId);
      
      // Armazena dados com sucesso
      await AsyncStorage.setItem('usuario_cadastrado', JSON.stringify(response));
  
      // Navega de volta após sucesso
      router.back();
  
    } catch (error) {
      console.error('[DEBUG] Erro detalhado:', error);
      
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro('Ocorreu um erro durante o cadastro. Verifique os logs para mais detalhes.');
      }
    } finally {
      setCarregando(false);
    }
  }, [dados, router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Clínica</Text>
      
      {/* Logo */}
      <Image
        source={require('./logo.png')}
        style={styles.logo}
      />

      {/* Campos do formulário */}
      <TextInput
        style={[styles.input, erro ? styles.inputError : {}]}
        placeholder="Nome"
        value={dados.nome}
        onChangeText={(text) => setDados({...dados, nome: text})}
      />
      
      <TextInput
        style={[styles.input, erro ? styles.inputError : {}]}
        placeholder="Email"
        value={dados.email}
        onChangeText={(text) => setDados({...dados, email: text})}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={[styles.input, erro ? styles.inputError : {}]}
        placeholder="Senha"
        value={dados.senha}
        onChangeText={(text) => setDados({...dados, senha: text})}
        secureTextEntry={true}
      />
      
      <TextInput
        style={[styles.input, erro ? styles.inputError : {}]}
        placeholder="Responsável"
        value={dados.responsavel}
        onChangeText={(text) => setDados({...dados, responsavel: text})}
      />

      {/* Exibição de erros */}
      {erro && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      {/* Botão de cadastro */}
      <TouchableOpacity
        style={styles.botaoContainer}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  inputError: {
    borderBottomColor: 'red'
  },
  botaoContainer: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center'
  },
  erro: {
    color: 'red',
    marginBottom: 15,
    marginTop: 10
  }
});