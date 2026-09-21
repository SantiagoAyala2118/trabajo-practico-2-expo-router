import { Cola } from '@/estructuras/Cola';
import * as fs from 'fs';
import * as path from 'path';

describe('Cola<T>', () => {
  let cola: Cola<number>;

  beforeEach(() => {
    cola = new Cola<number>();
  });

  describe('estado inicial', () => {
    it('comienza vacia', () => {
      expect(cola.vacia).toBe(true);
      expect(cola.tamanio).toBe(0);
    });

    it('frente devuelve undefined en cola vacia', () => {
      expect(cola.frente()).toBeUndefined();
    });

    it('desencolar devuelve undefined en cola vacia', () => {
      expect(cola.desencolar()).toBeUndefined();
    });

    it('aArray devuelve un arreglo vacio', () => {
      expect(cola.aArray()).toEqual([]);
    });
  });

  describe('encolar y desencolar (FIFO)', () => {
    it('encolar agrega un elemento y actualiza tamanio', () => {
      cola.encolar(10);
      expect(cola.vacia).toBe(false);
      expect(cola.tamanio).toBe(1);
    });

    it('desencolar devuelve el primer elemento agregado (FIFO)', () => {
      cola.encolar(1);
      cola.encolar(2);
      cola.encolar(3);
      expect(cola.desencolar()).toBe(1);
      expect(cola.desencolar()).toBe(2);
      expect(cola.desencolar()).toBe(3);
    });

    it('despues de desencolar todos los elementos, la cola queda vacia', () => {
      cola.encolar(1);
      cola.encolar(2);
      cola.desencolar();
      cola.desencolar();
      expect(cola.vacia).toBe(true);
      expect(cola.tamanio).toBe(0);
    });
  });

  describe('frente', () => {
    it('devuelve el elemento del frente sin quitarlo', () => {
      cola.encolar(10);
      cola.encolar(20);
      expect(cola.frente()).toBe(10);
      expect(cola.tamanio).toBe(2); // no se quito
    });
  });

  describe('aArray', () => {
    it('devuelve los elementos del frente al final', () => {
      cola.encolar(1);
      cola.encolar(2);
      cola.encolar(3);
      expect(cola.aArray()).toEqual([1, 2, 3]);
    });

    it('devuelve los elementos correctos despues de desencolar', () => {
      cola.encolar(1);
      cola.encolar(2);
      cola.encolar(3);
      cola.desencolar(); // quita el 1
      expect(cola.aArray()).toEqual([2, 3]);
    });

    it('devuelve una COPIA independiente (no expone el estado interno)', () => {
      cola.encolar(1);
      cola.encolar(2);
      const copia = cola.aArray();
      copia.push(999);
      copia[0] = -1;
      // la cola original no debe verse afectada
      expect(cola.aArray()).toEqual([1, 2]);
      expect(cola.tamanio).toBe(2);
    });
  });

  describe('no usa shift()', () => {
    it('el codigo fuente de Cola.ts no contiene .shift()', () => {
      const rutaArchivo = path.resolve(__dirname, '../../src/estructuras/Cola.ts');
      const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
      expect(contenido).not.toMatch(/\.shift\s*\(/);
    });
  });

  describe('compactacion amortizada y muchas operaciones', () => {
    it('mantiene el orden FIFO correcto despues de muchas operaciones', () => {
      // Encolar 100 elementos
      for (let i = 0; i < 100; i++) {
        cola.encolar(i);
      }
      // Desencolar los primeros 80 (deberia disparar compactaciones)
      for (let i = 0; i < 80; i++) {
        expect(cola.desencolar()).toBe(i);
      }
      // Verificar que los 20 restantes estan en orden
      expect(cola.tamanio).toBe(20);
      for (let i = 80; i < 100; i++) {
        expect(cola.desencolar()).toBe(i);
      }
      expect(cola.vacia).toBe(true);
    });

    it('encolar y desencolar intercalado mantiene el orden correcto', () => {
      // Simular uso real: encolar y desencolar alternadamente
      cola.encolar(1);
      cola.encolar(2);
      expect(cola.desencolar()).toBe(1);
      cola.encolar(3);
      cola.encolar(4);
      expect(cola.desencolar()).toBe(2);
      expect(cola.desencolar()).toBe(3);
      cola.encolar(5);
      expect(cola.desencolar()).toBe(4);
      expect(cola.desencolar()).toBe(5);
      expect(cola.vacia).toBe(true);
    });
  });

  describe('funciona con tipos genericos', () => {
    it('funciona con strings', () => {
      const colaTexto = new Cola<string>();
      colaTexto.encolar('a');
      colaTexto.encolar('b');
      expect(colaTexto.desencolar()).toBe('a');
      expect(colaTexto.desencolar()).toBe('b');
    });

    it('funciona con objetos', () => {
      const colaObj = new Cola<{ id: number }>();
      colaObj.encolar({ id: 1 });
      colaObj.encolar({ id: 2 });
      expect(colaObj.desencolar()).toEqual({ id: 1 });
    });
  });
});
