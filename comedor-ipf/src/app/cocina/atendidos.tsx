import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { MensajeEstado } from '@/components/MensajeEstado';
import { TarjetaPedido } from '@/components/TarjetaPedido';
import { useComedor } from '@/context/ComedorContext';
import { espaciado } from '@/tema/colores';

export default function CocinaAtendidos() {
  const { pedidosAtendidos } = useComedor();

  return (
    <Pantalla>
      {pedidosAtendidos.length === 0 ? (
        <MensajeEstado mensaje="Aún no hay pedidos atendidos." />
      ) : (
        <FlatList
          data={pedidosAtendidos}
          keyExtractor={(item) => item.numero.toString()}
          renderItem={({ item }) => <TarjetaPedido pedido={item} />}
          contentContainerStyle={styles.lista}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
        />
      )}
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: espaciado.md,
  },
  separador: {
    height: espaciado.md,
  },
});