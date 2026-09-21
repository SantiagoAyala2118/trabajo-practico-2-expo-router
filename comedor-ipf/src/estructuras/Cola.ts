// DEFENSA: Cola<T> es una estructura de datos FIFO (First In, First Out).
// FIFO significa que el primer elemento agregado es el primero en salir,
// como una fila de personas: el primero que llega es el primero en ser atendido.
// En esta app se usa para los pedidos del comedor: se atienden en el orden
// en que fueron confirmados. Nadie puede colarse.

// DEFENSA: No se usa shift() para desencolar. shift() remueve el primer
// elemento del arreglo y REINDEXAR todos los demas (mover cada elemento
// una posicion hacia atras), lo que tiene complejidad O(n). En su lugar,
// usamos un indice del frente (#indiceFrente) que simplemente avanza,
// logrando O(1) amortizado. Solo compactamos (con slice) cuando el indice
// supera la mitad del largo del arreglo, para no acumular memoria indefinidamente.

// DEFENSA: Los campos privados usan # (igual que Pila). Ver Pila.ts para
// la explicacion de por que # y no _.

export class Cola<T> {
  // Arreglo interno que almacena los elementos
  // Las posiciones antes de #indiceFrente estan liberadas (undefined)
  #items: (T | undefined)[] = [];

  // Indice que apunta al proximo elemento a desencolar
  // Avanza con cada desencolar() sin reindexar el resto del arreglo
  #indiceFrente: number = 0;

  // Agrega un elemento al final de la cola
  encolar(elemento: T): void {
    this.#items.push(elemento);
  }

  // Quita y devuelve el elemento del frente (el primero que entro)
  // En lugar de usar shift() (O(n)), avanzamos el indice del frente (O(1)).
  // La posicion liberada se marca como undefined para no retener la referencia.
  // Cuando #indiceFrente supera la mitad del largo, compactamos con slice
  // para liberar la memoria de las posiciones ya desencoladas.
  desencolar(): T | undefined {
    if (this.vacia) return undefined;

    // Obtener el elemento del frente
    const elemento = this.#items[this.#indiceFrente] as T;

    // Liberar la posicion (no retener la referencia al objeto)
    this.#items[this.#indiceFrente] = undefined;

    // Avanzar el indice del frente
    this.#indiceFrente++;

    // Compactacion amortizada: cuando el indice del frente supera la mitad
    // del largo del arreglo, cortamos las posiciones vacias con slice.
    // Esto evita que el arreglo crezca indefinidamente con posiciones undefined.
    // La compactacion es O(n) pero ocurre solo despues de n/2 operaciones,
    // asi que el costo amortizado por operacion sigue siendo O(1).
    if (this.#indiceFrente > this.#items.length / 2) {
      this.#items = this.#items.slice(this.#indiceFrente);
      this.#indiceFrente = 0;
    }

    return elemento;
  }

  // Devuelve el elemento del frente sin quitarlo
  frente(): T | undefined {
    if (this.vacia) return undefined;
    return this.#items[this.#indiceFrente] as T;
  }

  // Getter: indica si la cola esta vacia
  get vacia(): boolean {
    return this.#indiceFrente >= this.#items.length;
  }

  // Getter: cantidad de elementos activos en la cola
  // (no cuenta las posiciones ya desencoladas)
  get tamanio(): number {
    return this.#items.length - this.#indiceFrente;
  }

  // DEFENSA: aArray() devuelve una COPIA de los elementos activos.
  // Misma razon que en Pila: no exponer el estado interno.
  // Se usa slice desde #indiceFrente para obtener solo los elementos validos
  // y luego se filtra undefined por seguridad de tipos.
  aArray(): T[] {
    return this.#items.slice(this.#indiceFrente).filter(
      (item): item is T => item !== undefined
    );
  }
}
