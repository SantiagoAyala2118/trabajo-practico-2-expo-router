import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useComedor } from '@/context/ComedorContext';
import { colores } from '@/tema/colores';

export default function TabsLayout() {
  const { cantidadItems } = useComedor();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colores.primario }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          tabBarBadge: cantidadItems > 0 ? cantidadItems : undefined,
        }}
      />
      <Tabs.Screen
        name="acceso-cocina"
        options={{
          title: 'Cocina',
          tabBarIcon: ({ color, size }) => <Ionicons name="lock-closed" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
