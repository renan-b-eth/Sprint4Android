//Importanteo os componentes necessários da biblioteca do react native 

import { StyleSheet, Text, View, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definiindo o componente funional home como padrão de exportação
export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Image
        source={require('./logo.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain'
        }}
      />      
    </View>
  );
}

// Funções utilitárias para AsyncStorage
const storeData = async (key: string, value: string) => {
  try {
      await AsyncStorage.setItem(key, value);
  } catch (error) {
      console.error("Erro ao salvar no AsyncStorage:", error);
  }
};

const getData = async (key: string) => {
  try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
          return value;
      }
  } catch (error) {
      console.error("Erro ao buscar no AsyncStorage:", error);
  }
};

const removeData = async (key: string) => {
  try {
      await AsyncStorage.removeItem(key);
  } catch (error) {
      console.error("Erro ao remover do AsyncStorage:", error);
  }
};



//Definindo os estilos para os elementos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa toda a tela disponível
    backgroundColor: "#fff", // define o fundo da tela como branco
    alignItems: "center", //alinha os itens no centro da tela
    justifyContent: "center",  // alinha os itens no centro  verticalmente
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
        color: "#000",
    },
})