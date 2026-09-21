// STUB(T6): Pantalla de Inicio - se reemplaza con la implementacion real en T6
import { View, Text, StyleSheet } from 'react-native';
import { colores } from '@/tema/colores';

export default function PantallaInicio() {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.texto}>Comedor IPF - Inicio (provisorio)</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.fondo,
  },
  texto: {
    color: colores.textoClaro,
    fontSize: 18,
  },
});
