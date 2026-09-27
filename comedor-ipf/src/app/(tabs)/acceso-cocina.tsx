import React from 'react';
import { Redirect } from 'expo-router';

export default function AccesoCocinaTab() {
  // Desafío 2: Redirige a la sección de cocina (fuera del tab)
  return <Redirect href="/cocina" />;
}