//Importanteo os componentes necessários da biblioteca do react native 

import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { autenticacaoService } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definiindo o componente funional home como padrão de exportação
export default function Cadastro() {
  const router = useRouter();
  
  const navigation = useNavigation();
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    responsavel: ''
  });
  const [erro, setErro] = useState<string>('');
  const handleCadastro = async () => {
    try {
      await autenticacaoService.cadastrar(
        dados.nome,
        dados.email,
        dados.senha,
        dados.responsavel
      );
      //navigation.navigate('Delivered');
    } catch (error) {
      setErro('Erro ao cadastrar clínica');
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
        placeholder="Nome"
        value={dados.nome}
        onChangeText={(text) => setDados({...dados, nome: text})}
        autoCapitalize="none"
      />
      <TextInput
         style={styles.input}
         placeholder="Responsavel"
         value={dados.responsavel}
         onChangeText={(text) => setDados({...dados, responsavel: text})}
         autoCapitalize="none"
      />
      <TextInput
         style={styles.input}
         placeholder="Email"
         value={dados.email}
         onChangeText={(text) => setDados({...dados, email: text})}
         autoCapitalize="none"
      />
      <TextInput
         style={styles.input}
         placeholder="Senha"
         value={dados.senha}
         onChangeText={(text) => setDados({...dados, senha: text})}
         autoCapitalize="none"
      />

<TouchableOpacity 
  style={styles.botaoContainer}
  onPress={() => router.back()}
>
  <Text style={{ color: '#fff' }}>Cadastrar</Text>
</TouchableOpacity>
    </View>
    
  );
}

//Definindo os estilos para os elementos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela disponível
    backgroundColor: "#fff", // define o fundo da tela como branco
    alignItems: "center", //alinha os itens no centro da tela
    justifyContent: "center",  // alinha os itens no centro  verticalmente
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
        color: "#000",
    },
    input: {
      width: '80%',
      height: 40,
      borderBottomColor: '#000',    // Cor do traço
      borderBottomWidth: 1,         // Espessura do traço
      paddingHorizontal: 10        // Espaçamento interno
    },
    botaoContainer: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 3,
        color: '#fff',
        marginBottom: 10
    }
})