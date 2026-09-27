import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { DondeEstoy } from '@/components/DondeEstoy';
import { TituloConContadorDePila } from '@/components/TituloConContadorDePila';
import { MensajeEstado } from '@/components/MensajeEstado';
import { BotonPrimario } from '@/components/BotonPrimario';
import { buscarPlatoPorId } from '@/data/platos';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado } from '@/tema/colores';

export default function MenuDetalle() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNum = Number(id);
  const plato = buscarPlatoPorId(idNum);
  const { agregarAlCarrito } = useComedor();
  const [agregado, setAgregado] = useState(false);

  if (!plato) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Plato no encontrado' }} />
        <MensajeEstado mensaje="El plato que buscas no existe." />
        <DondeEstoy />
      </Pantalla>
    );
  }

  const handleAgregar = () => {
    agregarAlCarrito(plato);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  return (
    <Pantalla style={styles.container}>
      <Stack.Screen options={{ title: plato.nombre }} />
      <View style={styles.header}>
        <TituloConContadorDePila titulo={plato.nombre} />
      </View>

      <Text style={styles.precio}>${plato.precio}</Text>
      <Text style={styles.descripcion}>{plato.descripcion}</Text>

      <BotonPrimario
        titulo={agregado ? "¡Agregado!" : "Agregar al carrito"}
        onPress={handleAgregar}
        variante={agregado ? 'secundario' : 'primario'}
      />

      <View style={styles.espaciador} />
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: espaciado.md,
  },
  header: {
    marginBottom: espaciado.md,
  },
  precio: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.acento,
    marginBottom: espaciado.md,
  },
  descripcion: {
    fontSize: 16,
    color: colores.textoClaro,
    marginBottom: espaciado.lg,
  },
  espaciador: {
    flex: 1,
  },
});