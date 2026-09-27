import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { DondeEstoy } from '@/components/DondeEstoy';
import { SLUGS_AYUDA, ARTICULOS_AYUDA } from '@/data/ayuda';
import { colores, espaciado, radios } from '@/tema/colores';

export default function AyudaIndex() {
  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Centro de Ayuda' }} />
      <View style={styles.header}>
        <Text style={styles.titulo}>¿En qué podemos ayudarte?</Text>
      </View>
      <FlatList
        data={SLUGS_AYUDA}
        keyExtractor={item => item}
        renderItem={({ item: slug }) => {
          const articulo = ARTICULOS_AYUDA[slug];
          return (
            <Link href={`/ayuda/${slug}`} asChild>
              <Pressable style={styles.item}>
                <Text style={styles.itemTitulo}>{articulo.titulo}</Text>
                <Text style={styles.itemSubtitulo}>{slug}</Text>
              </Pressable>
            </Link>
          );
        }}
        contentContainerStyle={styles.lista}
        ListFooterComponent={<DondeEstoy />}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: espaciado.md,
    backgroundColor: colores.superficie,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
    marginBottom: espaciado.md,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.textoClaro,
  },
  lista: {
    paddingHorizontal: espaciado.md,
  },
  item: {
    padding: espaciado.md,
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    marginBottom: espaciado.md,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: espaciado.xs,
  },
  itemSubtitulo: {
    fontSize: 12,
    color: colores.acento,
  },
});