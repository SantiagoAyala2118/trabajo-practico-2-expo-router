import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colores, espaciado } from '@/tema/colores';

export function MensajeEstado({ mensaje }: { mensaje: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto} testID="mensaje-estado-texto">{mensaje}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: espaciado.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: colores.textoClaro,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});
