import React from 'react';
import { View, StyleSheet, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { colores, espaciado } from '@/tema/colores';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function Pantalla({ children, scroll = false, style, contentContainerStyle }: Props) {
  if (scroll) {
    return (
      <ScrollView 
        style={[styles.container, style]} 
        contentContainerStyle={[styles.content, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    );
  }
  return (
    <View style={[styles.container, styles.content, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  content: {
    padding: espaciado.lg,
  }
});
