import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pantalla } from '@/components/Pantalla';
import { BotonPrimario } from '@/components/BotonPrimario';
import { MensajeEstado } from '@/components/MensajeEstado';
import { TarjetaPedido } from '@/components/TarjetaPedido';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado } from '@/tema/colores';

export default function CocinaIndex() {
  const { pedidoEnFrente, cantidadEnEspera, atenderSiguiente } = useComedor();

  return (
    <Pantalla style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textoEspera}>
          Pedidos en espera: <Text style={styles.resaltado}>{cantidadEnEspera}</Text>
        </Text>
      </View>

      <View style={styles.contenido}>
        {pedidoEnFrente ? (
          <TarjetaPedido pedido={pedidoEnFrente} />
        ) : (
          <MensajeEstado mensaje="No hay pedidos en espera. ¡Buen trabajo!" />
        )}
      </View>

      <View style={styles.acciones}>
        <BotonPrimario
          titulo="Atender siguiente"
          onPress={atenderSiguiente}
          deshabilitado={!pedidoEnFrente}
        />
      </View>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: espaciado.md,
  },
  header: {
    marginBottom: espaciado.md,
    alignItems: 'center',
  },
  textoEspera: {
    fontSize: 18,
    color: colores.textoClaro,
  },
  resaltado: {
    fontWeight: 'bold',
    color: colores.primario,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
  },
  acciones: {
    marginTop: espaciado.md,
  },
});