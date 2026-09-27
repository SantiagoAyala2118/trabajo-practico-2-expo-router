import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ComedorProvider, useComedor } from '@/context/ComedorContext';

// DEFENSA: garantiza que un deep link como /categorias/bebidas deje las tabs debajo en la pila; "atrás" lleva a las tabs, no saca al usuario de la app.
export const unstable_settings = { anchor: '(tabs)' };

function NavegacionRaiz() {
  const { hayUsuario } = useComedor();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Artículo de Ayuda' }} />
      <Stack.Screen name="confirmar" options={{ presentation: 'modal', title: 'Confirmar Pedido' }} />
      <Stack.Screen name="pedido" options={{ title: 'Mi Pedido' }} />

      {/* DEFENSA: guard false = la pantalla deja de existir (incluso para deep links) y sale del historial. Login se cierra solo al iniciar sesión (guard pasa a false). Al cerrar sesión desde /cocina/atendidos la sección desaparece sola. */}
      {/* @ts-ignore - Propiedades nuevas de expo-router 57 */}
      <Stack.Protected guard={hayUsuario}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      {/* @ts-ignore */}
      </Stack.Protected>

      {/* @ts-ignore */}
      <Stack.Protected guard={!hayUsuario}>
        <Stack.Screen name="login" options={{ presentation: 'modal', title: 'Iniciar Sesión' }} />
      {/* @ts-ignore */}
      </Stack.Protected>

      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComedorProvider>
        <NavegacionRaiz />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}
