import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

const API_KEY = '9157ef94165be95deabed9fa56481739'; // Coloque sua chave aqui também!
const BASE_URL = 'https://api.themoviedb.org/3';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

type MovieDetail = {
  title: string;
  overview: string;
  poster_path: string;
};

const MovieDetailScreen = () => {
  const route = useRoute<MovieDetailRouteProp>();
  const { movieId } = route.params;
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.error(error));
  }, [movieId]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  poster: {
    width: 300,
    height: 450,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default MovieDetailScreen;
