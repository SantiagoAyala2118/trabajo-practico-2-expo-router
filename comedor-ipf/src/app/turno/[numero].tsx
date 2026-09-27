import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { MensajeEstado } from '@/components/MensajeEstado';
import { DondeEstoy } from '@/components/DondeEstoy';
import { TituloConContadorDePila } from '@/components/TituloConContadorDePila';
import { useComedor } from '@/context/ComedorContext';
import { MINUTOS_POR_PEDIDO } from '@/data/configuracion';
import { colores, espaciado, radios } from '@/tema/colores';

export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { buscarTurno } = useComedor();
  
  const numTurno = Number(numero);
  
  // Usamos useEffect para forzar que el componente se re-renderice
  // si el estado del turno cambia. El Contexto emite actualizaciones
  // por lo que reevaluamos buscarTurno().
  const resultado = buscarTurno(numTurno);

  if (isNaN(numTurno) || !resultado) {
    return (
      <Pantalla>
        <Stack.Screen options={{ title: 'Turno Inválido' }} />
        <MensajeEstado mensaje="El número de turno ingresado no es válido o no existe." />
        <DondeEstoy />
      </Pantalla>
    );
  }

  return (
    <Pantalla style={styles.container}>
      <Stack.Screen options={{ title: `Turno #${numTurno}` }} />
      
      <View style={styles.header}>
        <TituloConContadorDePila titulo={`Tu Turno: ${numTurno}`} />
      </View>

      <View style={styles.card}>
        {resultado.estado === 'en-espera' ? (
          <>
            <Text style={styles.estadoTitulo}>En preparación</Text>
            <Text style={styles.textoGeneral}>
              Hay <Text style={styles.resaltado}>{resultado.pedidosAdelante}</Text> pedidos antes que el tuyo.
            </Text>
            <Text style={styles.textoGeneral}>
              Tiempo estimado de espera:{' '}
              <Text style={styles.resaltado}>
                {resultado.pedidosAdelante * MINUTOS_POR_PEDIDO} minutos
              </Text>
            </Text>
          </>
        ) : (
          <>
            <Text style={[styles.estadoTitulo, styles.estadoAtendido]}>¡Listo para retirar!</Text>
            <Text style={styles.textoGeneral}>
              Tu pedido ya está listo. Por favor, acercate a la caja para retirarlo.
            </Text>
          </>
        )}
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
  card: {
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    padding: espaciado.lg,
    borderWidth: 1,
    borderColor: colores.borde,
    alignItems: 'center',
    gap: espaciado.sm,
  },
  estadoTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colores.acento,
    marginBottom: espaciado.sm,
  },
  estadoAtendido: {
    color: colores.primario,
  },
  textoGeneral: {
    fontSize: 16,
    color: colores.textoClaro,
    textAlign: 'center',
  },
  resaltado: {
    fontWeight: 'bold',
    color: colores.primario,
  },
  espaciador: {
    flex: 1,
  },
});