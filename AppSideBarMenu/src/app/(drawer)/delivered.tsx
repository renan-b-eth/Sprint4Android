import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';

interface Clinica {
  id: string;
  nome: string;
  email: string;
  senha: string;
  responsavel: string;
}

export default function Delivered() {
  const [clinicas, setClinicas] = useState<Clinica[]>([]);

  // Função para carregar as clínicas
  const carregarClinicas = async () => {
    try {
      const clinicasJson = await AsyncStorage.getItem('clinicas');
      if (clinicasJson) {
        const clinicasParseadas = JSON.parse(clinicasJson);
        setClinicas(clinicasParseadas);
      }
    } catch (erro) {
      console.error('Erro ao carregar clínicas:', erro);
    }
  };

  // Função para excluir uma clínica
  const excluirClinica = async (id: string) => {
    try {
      const clinicasJson = await AsyncStorage.getItem('clinicas');
      if (clinicasJson) {
        const clinicasArray = JSON.parse(clinicasJson);
        const clinicasFiltradas = clinicasArray.filter(
          (clinica: Clinica) => clinica.id !== id
        );
        
        await AsyncStorage.setItem('clinicas', JSON.stringify(clinicasFiltradas));
        setClinicas(clinicasFiltradas);
      }
    } catch (erro) {
      console.error('Erro ao excluir clínica:', erro);
      Alert.alert('Erro', 'Não foi possível excluir a clínica');
    }
  };

  useEffect(() => {
    carregarClinicas();
  }, []);

  const renderItem = ({ item }: { item: Clinica }) => (
    <View style={styles.clinicaContainer}>
      <Image
        source={require('./clinicasCredenciadas.png')}
        style={styles.clinicaLogo}
      />
      <View style={styles.detalhesContainer}>
        <Text style={styles.titulo}>{item.nome}</Text>
        <Text style={styles.detalhe}>Responsável: {item.responsavel}</Text>
        <Text style={styles.detalhe}>Email: {item.email}</Text>
      </View>
      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => excluirClinica(item.id)}
      >
        <Text style={styles.textoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('./logo1.png')}
        style={styles.logo}
      />
      
      <FlatList
        data={clinicas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.lista}
      />

      <Image
        source={require('./menu.png')}
        style={styles.menu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    position: "relative",
    top: -225,
    left: -130
  },
  lista: {
    width: '100%',
    paddingHorizontal: 20,
  },
  clinicaContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  clinicaLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 15,
  },
  detalhesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#000",
  },
  detalhe: {
    fontSize: 14,
    color: "#666",
  },
  botaoExcluir: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menu: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: -300,
  }
});