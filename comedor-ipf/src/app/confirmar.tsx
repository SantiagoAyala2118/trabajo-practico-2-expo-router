import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { BotonPrimario } from '@/components/BotonPrimario';
import { MensajeEstado } from '@/components/MensajeEstado';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Confirmar() {
  const { itemsCarrito, totalCarrito, nota, confirmarPedido } = useComedor();
  const router = useRouter();

  const estaVacio = itemsCarrito.length === 0;

  const handleConfirmar = () => {
    if (estaVacio) return;
    const pedido = confirmarPedido();
    // Reemplazamos la pantalla actual por el turno para evitar volver atras
    router.replace(`/turno/${pedido.numero}`);
  };

  const handleCancelar = () => {
    router.back();
  };

  if (estaVacio) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Resumen' }} />
        <MensajeEstado mensaje="No puedes confirmar un pedido vacío." />
        <View style={styles.accionesContainer}>
          <BotonPrimario titulo="Volver" onPress={handleCancelar} />
        </View>
      </Pantalla>
    );
  }

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Resumen del Pedido' }} />
      <View style={styles.contenedor}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Items del pedido:</Text>
          <FlatList
            data={itemsCarrito}
            keyExtractor={(item) => `${item.idItem}`}
            renderItem={({ item }) => (
              <View style={styles.itemFila}>
                <Text style={styles.itemTexto}>{item.plato.nombre}</Text>
                <Text style={styles.itemPrecio}>${item.plato.precio.toFixed(2)}</Text>
              </View>
            )}
            style={styles.listaItems}
          />
          <View style={styles.totalFila}>
            <Text style={styles.totalTitulo}>Total a pagar:</Text>
            <Text style={styles.totalPrecio}>${totalCarrito.toFixed(2)}</Text>
          </View>
        </View>

        {nota ? (
          <View style={styles.notaCard}>
            <Text style={styles.titulo}>Nota para la cocina:</Text>
            <Text style={styles.notaTexto}>{nota}</Text>
          </View>
        ) : null}

        <View style={styles.accionesContainer}>
          <BotonPrimario titulo="Confirmar y Generar Turno" onPress={handleConfirmar} />
          <BotonPrimario titulo="Cancelar" onPress={handleCancelar} variante="secundario" />
        </View>
      </View>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: espaciado.md,
  },
  card: {
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    padding: espaciado.md,
    borderWidth: 1,
    borderColor: colores.borde,
    marginBottom: espaciado.md,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colores.acento,
    marginBottom: espaciado.sm,
  },
  listaItems: {
    maxHeight: 200,
    marginBottom: espaciado.md,
  },
  itemFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: espaciado.xs,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  itemTexto: {
    color: colores.textoClaro,
    flex: 1,
  },
  itemPrecio: {
    color: colores.primario,
    fontWeight: 'bold',
  },
  totalFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: espaciado.sm,
    borderTopWidth: 2,
    borderTopColor: colores.borde,
  },
  totalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.textoClaro,
  },
  totalPrecio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colores.primario,
  },
  notaCard: {
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    padding: espaciado.md,
    borderWidth: 1,
    borderColor: colores.borde,
    marginBottom: espaciado.md,
  },
  notaTexto: {
    color: colores.textoClaro,
    fontStyle: 'italic',
  },
  accionesContainer: {
    marginTop: 'auto',
    gap: espaciado.sm,
  },
});