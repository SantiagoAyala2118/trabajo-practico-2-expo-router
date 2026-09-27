import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { TituloConContadorDePila } from '@/components/TituloConContadorDePila';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function CarritoNota() {
  const { nota, guardarNota } = useComedor();
  const [texto, setTexto] = useState(nota);
  const router = useRouter();

  const handleGuardar = () => {
    guardarNota(texto);
    router.back();
  };

  return (
    <Pantalla style={styles.container}>
      <Stack.Screen options={{ title: 'Nota para el pedido' }} />
      <View style={styles.header}>
        <TituloConContadorDePila titulo="Aclaraciones" />
      </View>
      
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Ej: Sin sal, la hamburguesa sin tomate..."
        placeholderTextColor={colores.acento}
        value={texto}
        onChangeText={setTexto}
        textAlignVertical="top"
      />
      
      <View style={styles.acciones}>
        <BotonPrimario titulo="Guardar" onPress={handleGuardar} />
      </View>
      
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
  input: {
    backgroundColor: colores.superficie,
    color: colores.textoClaro,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.md,
    padding: espaciado.md,
    fontSize: 16,
    minHeight: 120,
    marginBottom: espaciado.md,
  },
  acciones: {
    marginBottom: espaciado.md,
  },
  espaciador: {
    flex: 1,
  },
});