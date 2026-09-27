import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function InicioTab() {
  const { hayUsuario } = useComedor();

  return (
    <Pantalla style={styles.container}>
      <Text style={styles.saludo}>¡Bienvenido al Comedor IPF!</Text>

      <View style={styles.grid}>
        <Link href="/menu" asChild>
          <Pressable style={styles.card} testID="card-menu">
            <Text style={styles.cardTitulo}>Menú</Text>
            <Text style={styles.cardTexto}>Explorá nuestros platos</Text>
          </Pressable>
        </Link>

        <Link href="/buscar" asChild>
          <Pressable style={styles.card} testID="card-buscar">
            <Text style={styles.cardTitulo}>Buscar</Text>
            <Text style={styles.cardTexto}>Buscá por nombre o categoría</Text>
          </Pressable>
        </Link>

        <Link href="/ayuda" asChild>
          <Pressable style={styles.card} testID="card-ayuda">
            <Text style={styles.cardTitulo}>Ayuda</Text>
            <Text style={styles.cardTexto}>Preguntas frecuentes y tutoriales</Text>
          </Pressable>
        </Link>

        <Link href={hayUsuario ? "/cocina" : "/login"} asChild>
          <Pressable style={styles.card} testID="card-cocina">
            <Text style={styles.cardTitulo}>Cocina</Text>
            <Text style={styles.cardTexto}>Acceso exclusivo para personal</Text>
          </Pressable>
        </Link>
      </View>

      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: espaciado.md,
  },
  saludo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.textoClaro,
    marginBottom: espaciado.lg,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colores.superficie,
    width: '48%',
    padding: espaciado.md,
    borderRadius: radios.md,
    marginBottom: espaciado.md,
    borderWidth: 1,
    borderColor: colores.borde,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: espaciado.sm,
  },
  cardTexto: {
    fontSize: 14,
    color: colores.textoClaro,
    textAlign: 'center',
  },
});