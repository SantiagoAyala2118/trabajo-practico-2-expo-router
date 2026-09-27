import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link, usePathname, Stack } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { colores, espaciado } from '@/tema/colores';

export default function NotFoundScreen() {
  const pathname = usePathname();

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.titulo}>Ruta no encontrada</Text>
        <Text style={styles.texto}>Intentaste acceder a: {pathname}</Text>
        <Link href="/" style={styles.link}>
          Volver a inicio
        </Link>
      </View>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaciado.lg,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: espaciado.md,
  },
  texto: {
    fontSize: 16,
    color: colores.acento,
    marginBottom: espaciado.lg,
  },
  link: {
    fontSize: 18,
    color: colores.primario,
    textDecorationLine: 'underline',
  },
});
