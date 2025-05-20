import { StyleSheet, Text, View, Image, FlatList, Alert, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Clinica {
  id: string;
  nome: string;
  email: string;
  senha: string;
  responsavel: string;
}

export default function Delivered() {
  const [clinicas, setClinicas] = useState<Clinica[]>([]);
  const [clinicaSelecionada, setClinicaSelecionada] = useState<Clinica | null>(null);
  const [novoResponsavel, setNovoResponsavel] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const router = useRouter();

  // Função para carregar as clínicas com debug melhorado
  const carregarClinicas = async () => {
    setCarregando(true);
    setErro('');
    try {
      const clinicasJson = await AsyncStorage.getItem('clinicas');
      if (clinicasJson) {
        const clinicasParseadas = JSON.parse(clinicasJson);
        setClinicas(clinicasParseadas);
        if (clinicasParseadas.length > 0) {
          setClinicaSelecionada(clinicasParseadas[0]);
        }
      } else {
        setErro('Nenhuma clínica encontrada');
      }
    } catch (erro) {
      console.error('Erro ao carregar clínicas:', erro);
      setErro('Erro ao carregar as clínicas. Verifique o armazenamento.');
    } finally {
      setCarregando(false);
    }
  };

  // Função para deslogar
  const deslogar = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.back();
    } catch (erro) {
      console.error('Erro ao deslogar:', erro);
      Alert.alert('Erro', 'Não foi possível deslogar');
    }
  };

  // Função para alterar o responsável
  const alterarResponsavel = async () => {
    if (!clinicaSelecionada || !novoResponsavel.trim()) {
      Alert.alert('Erro', 'Por favor, selecione uma clínica e digite um nome válido');
      return;
    }

    try {
      const clinicasJson = await AsyncStorage.getItem('clinicas');
      if (clinicasJson) {
        const clinicasArray = JSON.parse(clinicasJson);
        const index = clinicasArray.findIndex((c: { id: string; }) => c.id === clinicaSelecionada.id);
        if (index !== -1) {
          clinicasArray[index].responsavel = novoResponsavel;
          await AsyncStorage.setItem('clinicas', JSON.stringify(clinicasArray));
          setClinicas(clinicasArray);
          setClinicaSelecionada(clinicasArray[index]);
          setNovoResponsavel('');
        }
      }
    } catch (erro) {
      console.error('Erro ao alterar responsável:', erro);
      Alert.alert('Erro', 'Não foi possível alterar o responsável');
    }
  };

  useEffect(() => {
    carregarClinicas();
  }, []);

  const renderItem = ({ item }: { item: Clinica }) => (
    <TouchableOpacity
      style={[
        styles.clinicaContainer,
        clinicaSelecionada?.id === item.id && styles.clinicaSelecionada
      ]}
      onPress={() => setClinicaSelecionada(item)}
    >
      <Image
        source={require('./clinicasCredenciadas.png')}
        style={styles.clinicaLogo}
      />
      <View style={styles.detalhesContainer}>
        <Text style={styles.titulo}>{item.nome}</Text>
        <Text style={styles.detalhe}>Responsável: {item.responsavel}</Text>
        <Text style={styles.detalhe}>Email: {item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('./logo1.png')}
        style={styles.logo}
      />
      
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botaoDeslogar}
          onPress={deslogar}
        >
          <Text style={styles.textoBotao}>Deslogar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.alterarResponsavelContainer}>
        <TextInput
          style={styles.inputResponsavel}
          placeholder="Novo nome do responsável"
          value={novoResponsavel}
          onChangeText={setNovoResponsavel}
        />
        <TouchableOpacity
          style={styles.botaoAlterar}
          onPress={alterarResponsavel}
        >
          <Text style={styles.textoBotao}>Alterar Responsável</Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <View style={styles.carregandoContainer}>
          <Text>Carregando clínicas...</Text>
        </View>
      ) : erro ? (
        <View style={styles.erroContainer}>
          <Text>{erro}</Text>
        </View>
      ) : (
        <FlatList
          data={clinicas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.lista}
          extraData={clinicaSelecionada}
        />
      )}

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
  botoesContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  botaoDeslogar: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alterarResponsavelContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputResponsavel: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 4,
  },
  botaoAlterar: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
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
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  },
  clinicaSelecionada: {
    backgroundColor: '#e3f2fd',
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
  carregandoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  erroContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  menu: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: -300,
  }
});