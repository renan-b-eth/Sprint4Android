import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image, Button, TextInput} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Colocar LOGO AQUI</Text>
      <StatusBar style="auto" />

      <Image
        source={require('./logo.png')}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain'
        }}

        
      />

      <Button 
      title="Ir Proxima Tela"
      onPress={() => alert('Botão pressionadodsadas!')}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
