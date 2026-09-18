# Parte A - Estructura de datos: la pila y la cola

## A1. Conceptos

a) _LIFO_, por sus siglas en ingles, significa Last In, First Out, y corresponde a la pila (haciendo referencia directa al comportamiento de una pila en la vida real). Por otro lado, _FIFO_ significa First In, First Out, y este corresponde a la cola, ya que (refiriendoce a que el primero en entrar sera el primero en salir).

b) Dentro de la estructura _LIFO_, un elemento se aniade a la pila por el final, -justamente, se van apilando-, y al momento de extraer un elemento, como el nombre lo indica, sale primero el ultimo que entro.

- En la estructura _FIFO_, podria darse a entender que se maneja el mismo comportamiento que en la _LIFO_ debido a que los elementos se agregan de la misma manera. Pero el cambio real esta al momento de extraer los mismos, ya que el primer elemento que ingreso, tambien es el primero en salir, es decir, la estructura le da prioriad de salida al primero en ingresar.

c) **_LIFO_**

- Un ejemplo de la vida real podria darse tranquilamente dentro de la cocina de un restaurante, siendo el ejemplo la pila de platos que aparece al momento de lavar los mismos. Por que? Bueno, cuando se van apliando los platos sucios, se van encimando uno arriba del otro, y al momento de lavarlos, se empieza por el tope (ultimo en agregar en la cima de la pila), -no comenzas por el ultimo... En la mayoria de los casos-.
- Pasado a una aplicacion movil, un ejemplo podria ser la manera en la que se estrcutura la navegacion por las diferentes pantallas de la aplicacion. O sea, cuando uno va navegando por la aplicacion, lo que hacen las mayorias de aplicaciones es apilar las pestanias, y cuando uno le da al boton para retroceder, la ultima pantalla (tope) desaparece y queda la anterior.

**_FIFO_**

- Un ejemplo conocido es la fila de supermercado de toda la vida, siendo que el primero en la fila sera, por obvias razones, el primero en salir... -Tambien en la mayoria de casos.-
- En una aplicacion movil (o web) esta estructura se utiliza mucho para el manejo de encolamiento de procesos. Esto porque los mismos se manejan de tal forma que la primera peticion o solicitud, por poner un ejemplo, a la base de datos, deberia ser la primera en terminar y darle una respuesta al usuario.

---

## A2. Seguimiento de una pila

Mirando este bloque de codigo:

```javascript
class Pila {
  #items = [];

  push(x) {
    this.#items.push(x);
  }
  pop() {
    return this.#items.pop();
  }
  tope() {
    return this.#items.at(-1);
  }
  get vacia() {
    return this.#items.length === 0;
  }
}

const p = new Pila();
p.push("Inicio");
p.push("Productos");
p.push("Detalle 3");
p.pop();
p.push("Perfil");
console.log(p.tope()); // (1)
console.log(p.pop()); // (2)
console.log(p.tope()); // (3)
console.log(p.vacia); // (4)
```

Los console.log() imprimiran lo siguiente:

1. "Perfil"
2. "Perfil"
3. "Productos"
4. false

En el final, la pila qeudaria de esta forma:

```javascript
#items = ['Inicio', 'Productos'];
```

---

## A3. Seguimiento de una cola.

Procediendo ahora con la clase Cola:

```javascript
class Cola {
  #items = [];

  encolar(x) {
    this.#items.push(x);
  }
  desencolar() {
    return this.#items.shift();
  }
  frente() {
    return this.#items[0];
  }
  get vacia() {
    return this.#items.length === 0;
  }
}

const c = new Cola();
c.encolar("Ana");
c.encolar("Beto");
c.desencolar();
c.encolar("Caro");
c.encolar("Dani");
console.log(c.frente()); // (1)
console.log(c.desencolar()); // (2)
console.log(c.vacia); // (3)
```

Los console.log() darian por consola lo siguiente:

1. 'Beto'
2. 'Beto'
3. false

El estado final de la cola seria este:

```javascript
#items = ['Caro','Dani']
```

## A4. Analisis de la implementacion.

a) El uso de # dentro de la declaracion de atributos en una clase sirve especificamente para determinar la privacidad estricta de los mismos. Es algo parecido al uso del \_. Sin embargo, estos ultimos solo servian como algo entre programador y programador, el # es una funcionalidad real que modifica el acceso que se puede tener a un atributo en especifico dentro del codigo.

b) El problema que presenta .shift() al momento de implementarse en arreglos de gran tamanio radica en su comportamiento: .shift() quita y retorna el primer elemento del arreglo, y _disminuye (corre) el indice de todos los elementos posteriores_ para que se adapten a la nueva cantidad de elementos. Esto genera problemas de rendimiento y lentitud de respuesta. Las colas "serias" resuelven esto de dos formas conocidas, pero la mas normal sin dejar de lado los arreglos (porque si, una de las formas es no usar arreglos en lo absoluto) es no usar shift() y utilizar un algoritmo que modifica simplemente el indice del inicio y el de salida, sin cambiar los indices de todos los elementos presentes en el mismo.

c) El metodo utilizado por la pila para sacar elementos es el .pop(), y el de la cola es el .shift(). El hecho de que no puedan "intercambiar" de metodos es justamente por el comportamiento de cada uno, ya que el pop() quita y retorna el ultimo elemento del arreglo, mientras que shift() quita y retorna el primero mientras reindexa todo el arreglo, es decir, uno cumple especificamente cin la estructura LIFO y otro con la LIFO.

---

## A5. Programacion: una cola eficiente.

- Implementacion del algoritmo de una cola eficiente:

```javascript
class ColaEficiente {
  #elementos = [];
  #capacidad = 0;
  #head;
  #tail;
  #cantidad;

  constructor(capacidadMaxima) {
    // Arreglo con un tamanio fijo desde el principio
    this.elementos = new Array(capacidadMaxima);
    this.capacidad = capacidadMaxima;

    this.head = 0; // Elemento actual
    this.tail = 0; // Elemento siguiente
    this.cantidad = 0; // Cantidad de elementos en la cola
  }

  encolar(item) {
    // Verificacion de que la cola tenga lugar
    if (this.cantidad === this.capacidad) {
      console.log("La sala de espera está llena");
      return;
    }

    // El proceso a encolar se ubica donde indica tail.
    this.elementos[this.tail] = item;

    // Tail se mueve un lugar, en caso de que ya haya llegado al maximo, regresa a 0
    this.tail = (this.tail + 1) % this.capacidad;

    this.cantidad++;
  }

  desencolar() {
    // Verificacion de que la cola no este vacia
    if (this.cantidad === 0) {
      return undefined;
    }

    // Se guarda el proceso a desencolar
    const item = this.elementos[this.head];
    this.elementos[this.head] = null; // Se "vacia" ese lugar

    // Se corre un puesto el lugar actual, tiene el mismo funcionamiento que tail, si llega al final se reinicia.
    this.head = (this.head + 1) % this.capacidad;

    this.cantidad--;
    return item; // Se retorna el elemento/proceso
  }

  get vacia() {
    return this.cantidad === 0;
  }

  get tamanio() {
    return this.cantidad;
  }
}
```

---

## A6. Pila y cola dentro de Expo Router

a) El **historial de pantallas** de un describe una estructura _LIFO_, ya que Expo Router lo que hace es apilar las pantallas mientras se navega por la aplicacion (no siempre las apila). La pantalla visible siempre va a ser la del _tope_ de la pila (la ultima en la que se ingreso). Y la operacion que hace "atras" es cuando el usuario clickea en el boton del navegador para ir hacia atras en la pagina o cuando toca algun boton qeu hayamos designado nosotros, haciendo uso del metodo .pop() para quitar la ultima pantalla de la vista y mostrar la anterior.

b) Cuando hablamos de **acciones de navegacion** implicitamente estamos mencionando a procesos dentro de la aplicacion, que por lo general toman tiempo en resolverse. Para gestionar estas acciones, Expo Router usa la estructura _FIFO_ para manejar colas. En el caso de que un usuario clickee dos links muy rapido, esto provocaria un encolamiento, y la aplicacion le daria prioridad al proceso que el usuario dio click primero, siendo este el primero en terminar, pero tambien aniadiendo un delay para la completacion del segundo.

---

#
