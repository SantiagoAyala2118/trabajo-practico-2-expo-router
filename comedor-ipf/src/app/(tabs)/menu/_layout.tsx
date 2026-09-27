import React from 'react';
import { Stack } from 'expo-router';

// DEFENSA: cada tab tiene su propia pila. /menu/[id] dentro de la tab mantiene la barra visible. Si el usuario abre un detalle, cambia de tab y vuelve, ve el mismo detalle.
export const unstable_settings = { anchor: 'index' };

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalle del Plato' }} />
    </Stack>
  );
}
