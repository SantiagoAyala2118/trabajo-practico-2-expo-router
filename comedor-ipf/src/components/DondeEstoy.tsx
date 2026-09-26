import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePathname, useSegments } from 'expo-router';
import { colores, espaciado, radios } from '@/tema/colores';

export const DEBUG = true;

export function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();

  if (!DEBUG) return null;

  return (
    <View style={styles.container} testID="donde-estoy">
      <Text style={styles.texto}>Ruta: {pathname}</Text>
      <Text style={styles.texto}>Segmentos: {JSON.stringify(segments)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: espaciado.sm,
    backgroundColor: colores.superficie,
    borderRadius: radios.sm,
    borderWidth: 1,
    borderColor: colores.acento,
    marginTop: espaciado.lg,
  },
  texto: {
    color: colores.textoClaro,
    fontSize: 12,
  },
});
