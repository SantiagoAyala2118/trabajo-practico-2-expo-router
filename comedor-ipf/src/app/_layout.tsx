// Layout raiz provisorio - se reemplaza completamente en T5
// STUB(T5): Stack raiz con GestureHandlerRootView, Provider, guards y anchor
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colores } from '@/tema/colores';

export default function LayoutRaiz() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colores.fondo },
          headerTintColor: colores.textoClaro,
          contentStyle: { backgroundColor: colores.fondo },
        }}
      />
    </>
  );
}
