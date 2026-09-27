import React, { useState, useMemo } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, Pressable, ScrollView } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { DondeEstoy } from '@/components/DondeEstoy';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { TituloConContadorDePila } from '@/components/TituloConContadorDePila';
import { MensajeEstado } from '@/components/MensajeEstado';
import { PLATOS, CATEGORIAS, NOMBRES_CATEGORIA, esCategoriaValida } from '@/data/platos';
import { colores, espaciado, radios } from '@/tema/colores';

const removerAcentos = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export default function Buscar() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string; categoria?: string }>();
  
  // Estado local para el input, evita que el cursor salte
  const [query, setQuery] = useState(params.q || '');

  // Sincronizar parámetro a estado local (solo si cambia el param externamente)
  // Se hace durante el renderizado para evitar cascading renders (regla recomendada de React)
  const [prevParamQ, setPrevParamQ] = useState(params.q);
  if (params.q !== prevParamQ) {
    setPrevParamQ(params.q);
    if (params.q !== undefined && params.q !== query) {
      setQuery(params.q);
    }
  }

  const handleTextChange = (text: string) => {
    setQuery(text);
    router.setParams({ q: text });
  };

  const handleCategoriaSelect = (cat: string) => {
    router.setParams({ categoria: cat === 'Todas' ? '' : cat });
  };

  const categoriaFiltro = params.categoria && esCategoriaValida(params.categoria) ? params.categoria : '';

  const filtrados = useMemo(() => {
    return PLATOS.filter(plato => {
      // Filtrar por categoria
      if (categoriaFiltro && plato.categoria !== categoriaFiltro) return false;
      
      // Filtrar por texto (sin acentos, ignorando mayúsculas)
      if (query) {
        const queryLimpia = removerAcentos(query.toLowerCase());
        const nombreLimpio = removerAcentos(plato.nombre.toLowerCase());
        const descLimpia = removerAcentos(plato.descripcion.toLowerCase());
        return nombreLimpio.includes(queryLimpia) || descLimpia.includes(queryLimpia);
      }
      return true;
    });
  }, [query, categoriaFiltro]);

  return (
    <Pantalla>
      <Stack.Screen options={{ title: 'Buscador' }} />
      <View style={styles.header}>
        <TituloConContadorDePila titulo="Buscar Platos" />
        
        <TextInput
          style={styles.input}
          placeholder="Ej: milanesa, cafe..."
          placeholderTextColor={colores.acento}
          value={query}
          onChangeText={handleTextChange}
        />

        <View style={styles.chipsContenedor}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={[styles.chip, !categoriaFiltro && styles.chipActivo]}
              onPress={() => handleCategoriaSelect('Todas')}
            >
              <Text style={[styles.chipTexto, !categoriaFiltro && styles.chipTextoActivo]}>Todas</Text>
            </Pressable>
            {CATEGORIAS.map(cat => (
              <Pressable
                key={cat}
                style={[styles.chip, categoriaFiltro === cat && styles.chipActivo]}
                onPress={() => handleCategoriaSelect(cat)}
              >
                <Text style={[styles.chipTexto, categoriaFiltro === cat && styles.chipTextoActivo]}>
                  {NOMBRES_CATEGORIA[cat]}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/menu/${item.id}`} asChild>
            <TarjetaPlato plato={item} />
          </Link>
        )}
        contentContainerStyle={styles.lista}
        ListFooterComponent={<DondeEstoy />}
        ListEmptyComponent={<MensajeEstado mensaje="No se encontraron platos que coincidan." />}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: espaciado.md,
    backgroundColor: colores.superficie,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  input: {
    backgroundColor: colores.fondo,
    color: colores.textoClaro,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: radios.md,
    padding: espaciado.sm,
    marginTop: espaciado.md,
    fontSize: 16,
  },
  chipsContenedor: {
    marginTop: espaciado.md,
  },
  chip: {
    paddingHorizontal: espaciado.md,
    paddingVertical: espaciado.xs,
    borderRadius: radios.lg,
    backgroundColor: colores.fondo,
    borderWidth: 1,
    borderColor: colores.borde,
    marginRight: espaciado.sm,
  },
  chipActivo: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },
  chipTexto: {
    color: colores.acento,
  },
  chipTextoActivo: {
    color: colores.textoClaro,
    fontWeight: 'bold',
  },
  lista: {
    padding: espaciado.md,
  },
});