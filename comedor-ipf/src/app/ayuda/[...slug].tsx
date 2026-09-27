import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { DondeEstoy } from '@/components/DondeEstoy';
import { MensajeEstado } from '@/components/MensajeEstado';
import { TituloConContadorDePila } from '@/components/TituloConContadorDePila';
import { buscarArticuloAyuda } from '@/data/ayuda';
import { colores, espaciado, radios } from '@/tema/colores';

export default function AyudaArticulo() {
  // El parámetro slug es un arreglo de strings por ser catch-all
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  
  // Unimos los segmentos con / para buscar la clave
  const slugUnido = slug ? slug.join('/') : '';
  const articulo = buscarArticuloAyuda(slugUnido);

  if (!articulo) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Artículo no encontrado' }} />
        <MensajeEstado mensaje={`El artículo de ayuda "${slugUnido}" no existe.`} />
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla style={styles.container}>
      <Stack.Screen options={{ title: articulo.titulo }} />
      <View style={styles.header}>
        <TituloConContadorDePila titulo={articulo.titulo} />
      </View>
      <View style={styles.card}>
        <Text style={styles.contenido}>{articulo.contenido}</Text>
      </View>
      <View style={styles.espaciador} />
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: espaciado.md,
  },
  header: {
    marginBottom: espaciado.md,
  },
  card: {
    backgroundColor: colores.superficie,
    padding: espaciado.md,
    borderRadius: radios.md,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  contenido: {
    fontSize: 16,
    color: colores.textoClaro,
    lineHeight: 24,
  },
  espaciador: {
    flex: 1,
  },
});