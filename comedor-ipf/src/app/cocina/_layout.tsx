import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Redirect } from 'expo-router';
import { BotonCerrarSesion } from '@/components/BotonCerrarSesion';
import { useComedor } from '@/context/ComedorContext';

export default function CocinaLayout() {
  const { hayUsuario } = useComedor();

  if (!hayUsuario) {
    // Redirige al login si no hay usuario autenticado
    return <Redirect href="/login" />;
  }

  return (
    <Drawer screenOptions={{ headerRight: () => <BotonCerrarSesion /> }}>
      <Drawer.Screen name="index" options={{ title: 'Cocina' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos' }} />
    </Drawer>
  );
}
