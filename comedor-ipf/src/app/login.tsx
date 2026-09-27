import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { BotonPrimario } from '@/components/BotonPrimario';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function LoginModal() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  
  const { iniciarSesion } = useComedor();
  const router = useRouter();

  const handleLogin = () => {
    if (!usuario || !clave) {
      setError('Por favor, ingresá usuario y clave.');
      return;
    }

    const exito = iniciarSesion(usuario, clave);
    if (!exito) {
      setError('Credenciales inválidas. (Pista: cocina / 1234)');
    }
  };

  return (
    <Pantalla style={styles.container}>
      <Stack.Screen options={{ title: 'Acceso a Cocina', presentation: 'modal' }} />
      
      <View style={styles.card}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          value={usuario}
          onChangeText={(text) => {
            setUsuario(text);
            setError('');
          }}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="ej. cocina"
          placeholderTextColor={colores.borde}
        />

        <Text style={styles.label}>Clave</Text>
        <TextInput
          style={styles.input}
          value={clave}
          onChangeText={(text) => {
            setClave(text);
            setError('');
          }}
          secureTextEntry
          placeholder="****"
          placeholderTextColor={colores.borde}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.acciones}>
          <BotonPrimario titulo="Ingresar" onPress={handleLogin} />
          <BotonPrimario 
            titulo="Cancelar" 
            onPress={() => router.back()} 
            variante="secundario" 
          />
        </View>
      </View>
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: espaciado.md,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colores.superficie,
    padding: espaciado.lg,
    borderRadius: radios.md,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  label: {
    color: colores.textoClaro,
    fontWeight: 'bold',
    marginBottom: espaciado.xs,
  },
  input: {
    backgroundColor: colores.fondo,
    color: colores.textoClaro,
    borderWidth: 1,
    borderColor: colores.borde,
    padding: espaciado.md,
    borderRadius: radios.sm,
    marginBottom: espaciado.md,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: espaciado.md,
    textAlign: 'center',
  },
  acciones: {
    gap: espaciado.sm,
    marginTop: espaciado.sm,
  },
});