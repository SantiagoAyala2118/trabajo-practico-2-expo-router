import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Pantalla } from '@/components/Pantalla';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { DondeEstoy } from '@/components/DondeEstoy';
import { platosPorCategoria, NOMBRES_CATEGORIA, CATEGORIAS } from '@/data/platos';
import { colores, espaciado } from '@/tema/colores';

export default function MenuIndex() {
  const secciones = useMemo(() => {
    const agrupados = platosPorCategoria();
    return CATEGORIAS.map(cat => ({
      categoria: cat,
      title: NOMBRES_CATEGORIA[cat],
      data: agrupados[cat],
    })).filter(sec => sec.data.length > 0);
  }, []);

  return (
    <Pantalla>
      <SectionList
        sections={secciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Link href={`/menu/${item.id}`} asChild>
            {/* asChild requiere que el hijo propague onPress, TarjetaPlato lo hace */}
            <TarjetaPlato plato={item} />
          </Link>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.headerContenedor}>
            <Text style={styles.headerTitulo}>{section.title}</Text>
            <Link href={`/categorias/${section.categoria}`} style={styles.headerLink}>
              Ver categoría
            </Link>
          </View>
        )}
        ListFooterComponent={<DondeEstoy />}
        contentContainerStyle={styles.lista}
        stickySectionHeadersEnabled={false}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: espaciado.md,
  },
  headerContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: espaciado.md,
    marginBottom: espaciado.sm,
    paddingBottom: espaciado.xs,
    borderBottomWidth: 1,
    borderBottomColor: colores.borde,
  },
  headerTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.textoClaro,
  },
  headerLink: {
    color: colores.primario,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});