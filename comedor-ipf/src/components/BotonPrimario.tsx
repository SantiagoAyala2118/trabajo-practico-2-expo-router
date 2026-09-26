import React, { forwardRef } from 'react';
import { Pressable, Text, StyleSheet, PressableProps, ViewStyle, StyleProp } from 'react-native';
import { colores, espaciado, radios } from '@/tema/colores';

interface Props extends Omit<PressableProps, 'style'> {
  titulo: string;
  variante?: 'primario' | 'acento' | 'secundario';
  deshabilitado?: boolean;
  style?: StyleProp<ViewStyle>;
}

// forwardRef para usar con Link asChild
export const BotonPrimario = forwardRef<any, Props>(
  ({ titulo, variante = 'primario', deshabilitado = false, style, ...props }, ref) => {
    
    const getBgColor = () => {
      if (deshabilitado) return colores.borde;
      if (variante === 'acento') return colores.acento;
      if (variante === 'secundario') return 'transparent';
      return colores.primario;
    };

    const getTextColor = () => {
      if (variante === 'acento' && !deshabilitado) return colores.negro;
      if (variante === 'secundario' && !deshabilitado) return colores.acento;
      return colores.textoClaro;
    };

    return (
      <Pressable
        ref={ref}
        testID="boton-primario"
        disabled={deshabilitado}
        style={StyleSheet.flatten([
          styles.boton,
          { backgroundColor: getBgColor() },
          variante === 'secundario' && { borderWidth: 1, borderColor: colores.acento },
          style
        ])}
        {...props}
      >
        <Text testID="boton-primario-texto" style={[styles.texto, { color: getTextColor() }]}>
          {titulo}
        </Text>
      </Pressable>
    );
  }
);
BotonPrimario.displayName = 'BotonPrimario';

const styles = StyleSheet.create({
  boton: {
    padding: espaciado.md,
    borderRadius: radios.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: espaciado.sm,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
