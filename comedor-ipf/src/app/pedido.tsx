import React from 'react';
import { Redirect } from 'expo-router';

export default function PedidoRedirect() {
  // DEFENSA: Redirect equivale a replace (no push), evita bucle al volver atrás.
  return <Redirect href="/carrito" />;
}
