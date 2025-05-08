//Importanteo os componentes necessários da biblioteca do react native 

import { StyleSheet, Text, View, TextInput, Button, Image } from "react-native";
import React, { useState } from 'react';

// Definiindo o componente funional home como padrão de exportação
export default function Delivered() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./clinicasCredenciadas.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
          position: "relative",
          top: -250
          
        }}
      /> 
      <Image
        source={require('./logo1.png')}
        style={{
          width: 50,
          height: 50,
          resizeMode: 'contain',
          position: "relative",
          top: -225,
          left: -130
          
        }}
      /> 

    <Text style={styles.textoTitulo}>Clinica DentalCompany</Text>
    <Text style={styles.textoScoring}>Scoring: 3</Text>
    <Text style={styles.textoQtd}>Quantidade Profissionais: 1</Text>
    <Text style={styles.textoSinistro}>Sinistros: 20</Text>





      <Image
        source={require('./menu.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
          marginBottom: -300
        }}
      /> 
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
      fontSize: 20,
      fontWeight: 'bold',
        color: "#000",
    },
    textoTitulo: {
      fontSize: 15,
      fontWeight: 'bold',
      color: "#000",
      position: "relative",
      top: -300
    },
    textoScoring: {
      fontSize: 15,
      color: "#000",
      position: "relative",
      top: -295
    },
    textoQtd: {
      fontSize: 15,
      color: "#000",
      position: "relative",
      top: -290
    },
    textoSinistro: {
      fontSize: 15,
      color: "#000",
      position: "relative",
      top: -285
    }
})