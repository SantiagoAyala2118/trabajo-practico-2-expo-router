import { Pila } from '@/estructuras/Pila';

describe('Pila<T>', () => {
  let pila: Pila<number>;

  beforeEach(() => {
    pila = new Pila<number>();
  });

  describe('estado inicial', () => {
    it('comienza vacia', () => {
      expect(pila.vacia).toBe(true);
      expect(pila.tamanio).toBe(0);
    });

    it('tope devuelve undefined en pila vacia', () => {
      expect(pila.tope()).toBeUndefined();
    });

    it('pop devuelve undefined en pila vacia', () => {
      expect(pila.pop()).toBeUndefined();
    });

    it('aArray devuelve un arreglo vacio', () => {
      expect(pila.aArray()).toEqual([]);
    });
  });

  describe('push y pop (LIFO)', () => {
    it('push agrega un elemento y actualiza tamanio', () => {
      pila.push(10);
      expect(pila.vacia).toBe(false);
      expect(pila.tamanio).toBe(1);
    });

    it('pop devuelve el ultimo elemento agregado (LIFO)', () => {
      pila.push(1);
      pila.push(2);
      pila.push(3);
      expect(pila.pop()).toBe(3);
      expect(pila.pop()).toBe(2);
      expect(pila.pop()).toBe(1);
    });

    it('despues de pop de todos los elementos, la pila queda vacia', () => {
      pila.push(1);
      pila.push(2);
      pila.pop();
      pila.pop();
      expect(pila.vacia).toBe(true);
      expect(pila.tamanio).toBe(0);
    });
  });

  describe('tope', () => {
    it('devuelve el elemento del tope sin quitarlo', () => {
      pila.push(10);
      pila.push(20);
      expect(pila.tope()).toBe(20);
      expect(pila.tamanio).toBe(2); // no se quito
    });
  });

  describe('aArray', () => {
    it('devuelve los elementos de la base al tope', () => {
      pila.push(1);
      pila.push(2);
      pila.push(3);
      expect(pila.aArray()).toEqual([1, 2, 3]);
    });

    it('devuelve una COPIA independiente (no expone el estado interno)', () => {
      pila.push(1);
      pila.push(2);
      const copia = pila.aArray();
      copia.push(999); // modificar la copia
      copia[0] = -1;
      // la pila original no debe verse afectada
      expect(pila.aArray()).toEqual([1, 2]);
      expect(pila.tamanio).toBe(2);
    });
  });

  describe('funciona con tipos genericos', () => {
    it('funciona con strings', () => {
      const pilaTexto = new Pila<string>();
      pilaTexto.push('a');
      pilaTexto.push('b');
      expect(pilaTexto.pop()).toBe('b');
      expect(pilaTexto.pop()).toBe('a');
    });

    it('funciona con objetos', () => {
      const pilaObj = new Pila<{ id: number }>();
      pilaObj.push({ id: 1 });
      pilaObj.push({ id: 2 });
      expect(pilaObj.pop()).toEqual({ id: 2 });
    });
  });
});
