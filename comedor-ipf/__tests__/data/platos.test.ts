import {
  CATEGORIAS,
  buscarPlatoPorId,
  esCategoriaValida,
  platosPorCategoria,
  PLATOS,
} from '@/data/platos';

describe('platos.ts', () => {
  describe('CATEGORIAS', () => {
    it('tiene exactamente 4 categorias', () => {
      expect(CATEGORIAS).toHaveLength(4);
    });

    it('contiene desayuno, almuerzo, bebidas y kiosco', () => {
      expect(CATEGORIAS).toContain('desayuno');
      expect(CATEGORIAS).toContain('almuerzo');
      expect(CATEGORIAS).toContain('bebidas');
      expect(CATEGORIAS).toContain('kiosco');
    });
  });

  describe('PLATOS', () => {
    it('tiene al menos 12 platos', () => {
      expect(PLATOS.length).toBeGreaterThanOrEqual(12);
    });

    it('cada plato tiene id numerico, nombre, precio, descripcion y categoria valida', () => {
      for (const plato of PLATOS) {
        expect(typeof plato.id).toBe('number');
        expect(typeof plato.nombre).toBe('string');
        expect(plato.nombre.length).toBeGreaterThan(0);
        expect(typeof plato.precio).toBe('number');
        expect(plato.precio).toBeGreaterThan(0);
        expect(typeof plato.descripcion).toBe('string');
        expect((CATEGORIAS as readonly string[]).includes(plato.categoria)).toBe(true);
      }
    });

    it('tiene al menos 2 platos por categoria', () => {
      for (const categoria of CATEGORIAS) {
        const platosEnCategoria = PLATOS.filter((p) => p.categoria === categoria);
        expect(platosEnCategoria.length).toBeGreaterThanOrEqual(2);
      }
    });

    it('los ids son unicos', () => {
      const ids = PLATOS.map((p) => p.id);
      const idsUnicos = new Set(ids);
      expect(idsUnicos.size).toBe(ids.length);
    });
  });

  describe('buscarPlatoPorId', () => {
    it('devuelve el plato correcto para un id existente', () => {
      const plato = buscarPlatoPorId(PLATOS[0].id);
      expect(plato).toBeDefined();
      expect(plato?.id).toBe(PLATOS[0].id);
      expect(plato?.nombre).toBe(PLATOS[0].nombre);
    });

    it('devuelve undefined para un id inexistente', () => {
      expect(buscarPlatoPorId(99999)).toBeUndefined();
    });

    it('devuelve undefined para NaN', () => {
      expect(buscarPlatoPorId(NaN)).toBeUndefined();
    });
  });

  describe('esCategoriaValida', () => {
    it('devuelve true para categorias validas', () => {
      expect(esCategoriaValida('desayuno')).toBe(true);
      expect(esCategoriaValida('almuerzo')).toBe(true);
      expect(esCategoriaValida('bebidas')).toBe(true);
      expect(esCategoriaValida('kiosco')).toBe(true);
    });

    it('devuelve false para categorias invalidas', () => {
      expect(esCategoriaValida('postre')).toBe(false);
      expect(esCategoriaValida('')).toBe(false);
      expect(esCategoriaValida('DESAYUNO')).toBe(false); // case sensitive
    });
  });

  describe('platosPorCategoria', () => {
    it('agrupa los platos correctamente por categoria', () => {
      const agrupados = platosPorCategoria();
      for (const categoria of CATEGORIAS) {
        expect(agrupados[categoria]).toBeDefined();
        expect(agrupados[categoria].length).toBeGreaterThanOrEqual(2);
        for (const plato of agrupados[categoria]) {
          expect(plato.categoria).toBe(categoria);
        }
      }
    });
  });
});
