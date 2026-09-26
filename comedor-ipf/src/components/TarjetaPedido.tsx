import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Pedido } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export const TarjetaPedido = memo(({ pedido }: { pedido: Pedido }) => {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.encabezado}>
        <Text style={styles.turno}>Turno #{pedido.numero}</Text>
        <Text style={styles.total}>${pedido.total}</Text>
      </View>
      
      {pedido.nota ? (
        <View style={styles.notaContenedor}>
          <Text style={styles.notaTexto}>Nota: {pedido.nota}</Text>
        </View>
      ) : null}

      <View style={styles.items}>
        {pedido.items.map((item, idx) => (
          <Text key={item.idItem || idx} style={styles.itemTexto}>
            • {item.plato.nombre}
          </Text>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    padding: espaciado.lg,
    borderRadius: radios.lg,
    marginBottom: espaciado.md,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: espaciado.md,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
    paddingBottom: espaciado.sm,
  },
  turno: {
    color: colores.textoClaro,
    fontSize: 20,
    fontWeight: 'bold',
  },
  total: {
    color: colores.acento,
    fontSize: 20,
    fontWeight: 'bold',
  },
  notaContenedor: {
    backgroundColor: colores.fondo,
    padding: espaciado.sm,
    borderRadius: radios.sm,
    marginBottom: espaciado.md,
  },
  notaTexto: {
    color: colores.textoClaro,
    fontStyle: 'italic',
  },
  items: {
    marginTop: espaciado.xs,
  },
  itemTexto: {
    color: colores.textoClaro,
    marginBottom: espaciado.xs,
  },
});
