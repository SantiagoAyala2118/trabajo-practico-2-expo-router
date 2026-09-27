import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Stack, useLocalSearchParams, Link } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { DondeEstoy } from '@/components/DondeEstoy';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { TituloConContadorDePila } from '@/components/TituloConContadorDePila';
import { MensajeEstado } from '@/components/MensajeEstado';
import { esCategoriaValida, platosPorCategoria, NOMBRES_CATEGORIA } from '@/data/platos';
import { espaciado } from '@/tema/colores';

export default function CategoriaLista() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  if (!categoria || !esCategoriaValida(categoria)) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Categoría Inválida' }} />
        <MensajeEstado mensaje="La categoría ingresada no existe." />
        <DondeEstoy />
      </Pantalla>
    );
  }

  const titulo = NOMBRES_CATEGORIA[categoria];
  const platos = platosPorCategoria()[categoria];

  return (
    <Pantalla>
      <Stack.Screen options={{ title: titulo }} />
      <View style={styles.header}>
        <TituloConContadorDePila titulo={`Categoría: ${titulo}`} />
      </View>
      <FlatList
        data={platos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/menu/${item.id}`} asChild>
            <TarjetaPlato plato={item} />
          </Link>
        )}
        contentContainerStyle={styles.lista}
        ListFooterComponent={<DondeEstoy />}
        ListEmptyComponent={<MensajeEstado mensaje="No hay platos en esta categoría." />}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: espaciado.md,
    paddingTop: espaciado.md,
    paddingBottom: espaciado.sm,
  },
  lista: {
    padding: espaciado.md,
  },
});