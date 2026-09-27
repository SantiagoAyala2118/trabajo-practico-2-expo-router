import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Stack, Link } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { MensajeEstado } from '@/components/MensajeEstado';
import { BotonPrimario } from '@/components/BotonPrimario';
import { DondeEstoy } from '@/components/DondeEstoy';
import { useComedor } from '@/context/ComedorContext';
import { colores, espaciado, radios } from '@/tema/colores';

export default function CarritoIndex() {
  const { itemsCarrito, totalCarrito, nota, puedeDeshacer, deshacerUltimo } = useComedor();

  const estaVacio = itemsCarrito.length === 0;

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Mi Pedido' }} />
      
      {estaVacio ? (
        <MensajeEstado mensaje="Tu carrito está vacío." />
      ) : (
        <FlatList
          data={itemsCarrito}
          keyExtractor={(item) => `${item.idItem}`}
          renderItem={({ item }) => <TarjetaPlato plato={item.plato} />}
          contentContainerStyle={styles.lista}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.totalTexto}>Total: ${totalCarrito.toFixed(2)}</Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              {nota ? (
                <View style={styles.notaContainer}>
                  <Text style={styles.notaTitulo}>Nota agregada:</Text>
                  <Text style={styles.notaTexto}>{nota}</Text>
                </View>
              ) : null}
              
              <Link href="/carrito/nota" asChild>
                <Pressable style={styles.botonNota}>
                  <Text style={styles.botonNotaTexto}>
                    {nota ? 'Editar nota' : 'Agregar nota'}
                  </Text>
                </Pressable>
              </Link>
            </View>
          }
        />
      )}

      <View style={styles.accionesContainer}>
        <BotonPrimario
          titulo="Deshacer último"
          onPress={deshacerUltimo}
          deshabilitado={!puedeDeshacer}
        />
        
        {estaVacio ? (
          <BotonPrimario
            titulo="Confirmar pedido"
            onPress={() => {}}
            deshabilitado={true}
          />
        ) : (
          <Link href="/confirmar" asChild>
            <BotonPrimario titulo="Confirmar pedido" onPress={() => {}} />
          </Link>
        )}
      </View>
      <DondeEstoy />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: espaciado.md,
  },
  header: {
    marginBottom: espaciado.md,
    padding: espaciado.md,
    backgroundColor: colores.superficie,
    borderRadius: radios.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colores.borde,
  },
  totalTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.textoClaro,
  },
  footer: {
    marginTop: espaciado.md,
  },
  notaContainer: {
    backgroundColor: colores.superficie,
    padding: espaciado.md,
    borderRadius: radios.md,
    marginBottom: espaciado.md,
    borderWidth: 1,
    borderColor: colores.borde,
  },
  notaTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colores.acento,
    marginBottom: espaciado.xs,
  },
  notaTexto: {
    fontSize: 16,
    color: colores.textoClaro,
    fontStyle: 'italic',
  },
  botonNota: {
    padding: espaciado.md,
    borderRadius: radios.md,
    backgroundColor: colores.superficie,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colores.primario,
  },
  botonNotaTexto: {
    color: colores.primario,
    fontWeight: 'bold',
    fontSize: 16,
  },
  accionesContainer: {
    padding: espaciado.md,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
    backgroundColor: colores.fondo,
    gap: espaciado.sm,
  },
});