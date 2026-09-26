import React from 'react';
import { BotonPrimario } from './BotonPrimario';
import { useComedor } from '@/context/ComedorContext';
import { ViewStyle, StyleProp } from 'react-native';

export function BotonCerrarSesion({ style }: { style?: StyleProp<ViewStyle> }) {
  const { cerrarSesion } = useComedor();
  return (
    <BotonPrimario
      titulo="Cerrar sesión"
      variante="secundario"
      onPress={cerrarSesion}
      style={style}
    />
  );
}
