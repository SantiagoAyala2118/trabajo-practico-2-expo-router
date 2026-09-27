import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { BotonCerrarSesion } from '@/components/BotonCerrarSesion';

export default function CocinaLayout() {
  return (
    <Drawer screenOptions={{ headerRight: () => <BotonCerrarSesion /> }}>
      <Drawer.Screen name="index" options={{ title: 'Cocina' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos' }} />
    </Drawer>
  );
}
