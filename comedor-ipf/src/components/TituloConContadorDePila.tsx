import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { colores } from '@/tema/colores';

export function TituloConContadorDePila({ titulo }: { titulo: string }) {
  const navigation = useNavigation();
  const stackLength = navigation.getState()?.routes.length ?? 1;

  return (
    <Text style={styles.titulo}>
      {titulo} ({stackLength})
    </Text>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: colores.textoClaro,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
