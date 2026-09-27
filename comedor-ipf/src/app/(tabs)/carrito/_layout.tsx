import React from 'react';
import { Stack } from 'expo-router';

export const unstable_settings = { anchor: 'index' };

export default function CarritoLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Mi Carrito' }} />
      <Stack.Screen name="nota" options={{ title: 'Añadir Nota' }} />
    </Stack>
  );
}
