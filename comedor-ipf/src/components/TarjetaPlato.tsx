import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { Plato } from '@/data/platos';
import { colores, espaciado, radios } from '@/tema/colores';

interface Props {
  plato: Plato;
  onPress?: () => void;
}

export const TarjetaPlato = memo(({ plato, onPress }: Props) => {
  return (
    <Pressable style={styles.tarjeta} onPress={onPress}>
      <View style={styles.encabezado}>
        <Text style={styles.nombre} testID="tarjeta-plato-nombre">{plato.nombre}</Text>
        <Text style={styles.precio} testID="tarjeta-plato-precio">${plato.precio}</Text>
      </View>
      <Text style={styles.descripcion}>{plato.descripcion}</Text>
    </Pressable>
  );
});
TarjetaPlato.displayName = 'TarjetaPlato';

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colores.superficie,
    padding: espaciado.md,
    borderRadius: radios.md,
    marginBottom: espaciado.md,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: espaciado.sm,
  },
  nombre: {
    color: colores.textoClaro,
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  precio: {
    color: colores.acento,
    fontWeight: 'bold',
    fontSize: 16,
  },
  descripcion: {
    color: colores.textoClaro,
    opacity: 0.8,
  },
});
