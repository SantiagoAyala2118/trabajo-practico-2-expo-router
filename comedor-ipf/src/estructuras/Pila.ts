// DEFENSA: Pila<T> es una estructura de datos LIFO (Last In, First Out).
// LIFO significa que el ultimo elemento agregado es el primero en salir,
// como una pila de platos: solo se puede tomar el de arriba.
// En esta app se usa para: deshacer acciones del carrito (la ultima accion
// se deshace primero) y para almacenar pedidos atendidos.

// DEFENSA: Los campos privados usan la sintaxis # de JavaScript (ES2022).
// A diferencia de la convencion _ (que solo es visual), # garantiza privacidad
// real a nivel del lenguaje: ningun codigo externo puede leer ni modificar
// #items directamente. Esto protege la integridad de la estructura.

export class Pila<T> {
  // Campo privado real de JavaScript: inaccesible desde afuera de la clase
  #items: T[] = [];

  // Agrega un elemento al tope de la pila
  push(elemento: T): void {
    this.#items.push(elemento);
  }

  // Quita y devuelve el elemento del tope (el ultimo agregado)
  pop(): T | undefined {
    return this.#items.pop();
  }

  // Devuelve el elemento del tope sin quitarlo
  tope(): T | undefined {
    if (this.#items.length === 0) return undefined;
    return this.#items[this.#items.length - 1];
  }

  // Getter: indica si la pila esta vacia
  get vacia(): boolean {
    return this.#items.length === 0;
  }

  // Getter: cantidad de elementos en la pila
  get tamanio(): number {
    return this.#items.length;
  }

  // DEFENSA: aArray() devuelve una COPIA del arreglo interno (con spread).
  // Si devolvieramos una referencia directa al arreglo #items, el codigo
  // externo podria modificarlo (push, pop, splice) y romper la invariante
  // de la pila sin pasar por los metodos controlados (push/pop).
  // El spread [...this.#items] crea un nuevo arreglo con los mismos valores,
  // ordenados de la base al tope.
  aArray(): T[] {
    return [...this.#items];
  }
}
