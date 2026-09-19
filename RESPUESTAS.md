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

# Parte B - Rutas basadas en archivos.

## B1. Del archivo a la URL.

| Archivo                              | URL que genera / función                                                                                                                                                                                                                                                               |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/(tabs)/index.tsx`           | `/`                                                                                                                                                                                                                                                                                    |
| `src/app/acerca.tsx`                 | `/acerca`                                                                                                                                                                                                                                                                              |
| `src/app/(tabs)/perfil.tsx`          | `/perfil`                                                                                                                                                                                                                                                                              |
| `src/app/(tabs)/productos/index.tsx` | `/productos`                                                                                                                                                                                                                                                                           |
| `src/app/(tabs)/productos/[id].tsx`  | `/productos/[id]` (Ruta dinámica, ej. `/productos/123`)                                                                                                                                                                                                                                |
| `src/app/docs/[...slug].tsx`         | `/docs/[...slug]` (Ruta comodín o _catch-all_, atrapa múltiples segmentos como `/docs/api/v1`)                                                                                                                                                                                         |
| `src/app/_layout.tsx`                | No genera pantalla independiente. Define la estructura compartida (Layout) que envuelve a las rutas de su directorio (ej. un navegador Stack o Tabs).                                                                                                                                  |
| `src/app/+not-found.tsx`             | No genera URL navegable directa. Renderiza la pantalla de error 404 cuando el usuario intenta acceder a una ruta inexistente.                                                                                                                                                          |
| `src/app/Boton.tsx`                  | **Problema (Mala práctica):** Expo Router convierte automáticamente todo archivo dentro de `app` en una pantalla, por lo que generaría la ruta `/Boton`. Los componentes de UI reutilizables (como botones) no deben ir en `app/`, sino en una carpeta externa como `src/components/`. |

---

## B2. De la URL al archivo

| URL                                                | Archivo                                                                                                                                                                                    |
| :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx` (o `[id].tsx` para capturar el segmento dinámico).                                                                                                    |
| `/buscar?q=mate&categoria=kiosco`                  | `src/app/buscar.tsx` (o `src/app/buscar/index.tsx`). Los parámetros de búsqueda (_query params_) no cambian el nombre del archivo, se obtienen por código usando `useLocalSearchParams()`. |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios`         | Son dos archivos distintos: `src/app/ayuda/pagos/tarjeta.tsx` y `src/app/ayuda/horarios.tsx`.                                                                                              |
| `/ayuda` (con una pantalla propia)                 | `src/app/ayuda/index.tsx`. Al tener subrutas (como en el caso anterior), se debe crear una carpeta `ayuda` y usar `index.tsx` para la pantalla principal de esa ruta.                      |

---

## B3. Verdadero o Falso

a) Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuracion. **F**

    - Con Expo Router, no hace falta registrar las pantallas en ninguna tabla, con el simple hecho de ir cargando carpetas con el nombre de las rutas dentro de la carpeta app/ ya se van a estar generando las rutas de manera automatica en la aplicacion.

b) Los archivos _layout.tsx_ son pantallas que el usuario puede visitar. **F**

    - Los archivos layout.tsx mas bien son los encargados de envolver las rutas de la carpeta donde esta presente y de sus subcarpetas, devolviendo un navegador: Stack, Tabs, Drawer o Slot.

c) Una carpeta entre parentesis, como (tabs) no aparece en la URL. **V**

d) Para agregar una libreria conviene usar _npm install_, porque siempre trae la ultima version. **F**

    - Si bien, en algunos casos tener la ultima version de las librerias suele ser una solucion rapida y sencilla, esto suele generar problemas graves de incompatibilidad dentro del proyecto. Para trabajar con Expo es altamente prefrible utilizar el comando npx expo install <<nombre_de_la_libreria>>, ya que este comando actua como si fuera un filtro, escanea el estado del proyecto y decide que version de la libreria es la mas adecuada para su descargar y asi no romper nada.

e) En _package.json_ "main":"expo-router/entry" reemplaza al viejo App.tsx. **V**

f) La ruta /\_sitemap lista todas las rutas de la app y sirve para depurar. **V**

g) Si existen docs/index.tsx y docs/[...slug].tsx, la URL /docs muestra docs/index.tsx. **V**

h) En SDK 57, expo-router usa el mismo número de versión mayor que el SDK (57). **V**

---

# Parte C - Navegar: <<Link>>, router y la pila.

## C1. Metodos de router.

| Método                    | Qué le hace a la pila                                                                                                                                                                                        |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `router.push(href)`       | Añade una nueva pantalla en la parte superior de la pila de navegación. Al presionar el botón "Atrás", el usuario volverá a la pantalla anterior.                                                            |
| `router.navigate(href)`   | Navega a la ruta inteligente: si la pantalla ya existe en la pila actual, retrocede o se mueve hacia ella sin duplicarla. Si no existe, la añade a la pila como un `push`.                                   |
| `router.replace(href)`    | Reemplaza la pantalla actual (en la cima de la pila) por la nueva. La pantalla original desaparece del historial, por lo que al presionar "Atrás" el usuario no regresará a ella, sino a la pantalla previa. |
| `router.back()`           | Desapila (elimina) la pantalla que se encuentra actualmente en la cima, haciendo que el usuario regrese a la pantalla inmediatamente anterior en la pila.                                                    |
| `router.dismissTo(href)`  | Retrocede en el historial eliminando múltiples pantallas de la pila de golpe, hasta encontrar y volver a la pantalla específica declarada en el `href`.                                                      |
| `router.dismissAll()`     | Vacía la pila de navegación actual por completo (desapila todas las pantallas superpuestas) y devuelve al usuario a la primera pantalla (raíz) de ese stack.                                                 |
| `router.canGoBack()`      | No modifica la pila en absoluto. Solo la evalúa y retorna un valor booleano (`true` o `false`) indicando si hay al menos una pantalla anterior a la cual retroceder.                                         |
| `router.setParams({...})` | No añade ni elimina pantallas. Solo modifica los parámetros de la ruta (_query params_) de la pantalla actual en la cima de la pila, lo que puede provocar un re-renderizado con nuevos datos.               |

---

## C2. Simulacion de la pila.

| #   | Instruccion                           | Pila resultante                                                                                                          |
| :-- | :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------- |
| 1   | `router.push("/productos/1")`         | `[ /productos, /productos/1 ]`                                                                                           |
| 2   | `router.push("/productos/2")`         | `[ /productos, /productos/1, /productos/2 ]`                                                                             |
| 3   | `router.navigate("/productos/5")`     | `[ /productos, /productos/1, /productos/2, /productos/5 ]`                                                               |
| 4   | `router.push("/perfil")`              | `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]`                                                      |
| 5   | `router.replace("/buscar")`           | `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]`                                                      |
| 6   | `router.back()`                       | `[ /productos, /productos/1, /productos/2, /productos/5 ]`                                                               |
| 7   | `router.dismissTo("/productos")`      | `[ /productos ]`                                                                                                         |
| 8   | `router.canGoBack() -> que devuelve?` | Devuelve `false` (la pila solo tiene la pantalla raiz `/productos`, por lo que no hay pantallas previas para retroceder) |

---

## C3. Link o Router?

a) El usuario toca la tarjeta de un producto en una lista. **Link**

    - Link justamente es utilizado cuando existe una interaccion entre el usuario y algun boton que necesite redirigir la vista a alguna otra pantalla sin logica pesada por detras.

b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito. **Router**

    - En este caso, al presionar el boton de _Enviar_ en el formulario, se ejecuta necesariamente una logica de negocios por detras (se conctacta a una API, se envian y reciben datos, etc). Eso implica usar _router_.

c) Boton "Cancelar" de un modal. **Link**

    - Tenieno en mente que lo unico que hace el boton es cerrar el modal, se puede usar _Link_ con total normalidad.

d) Después de un login exitoso hay que ir a la pantalla principal. **Router**

    - Posterior a la logica y la respuesta exitosa de la API, _router_ se encarga de redirigir al usuario a la pantalla principal.

e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres
pantallas más abajo. **Link**

    - Existen varias maneras de que el usuario vuelva para atras en la pagina, y en la gran mayoria de ellas (por no decir en todas) un simple _Link_ es suficiente (solo se van desapilando las vistas).

---

## C4. Escribi el codigo.

a) Un _Link_ que abra el producto con id 8 usando href como objeto.

    ```tsx
    <Link href={{ pathname: "/productos/[id]", params: { id: 8 } }}>
    Ver producto 8
    </Link>
    ```

b) Un _Link_ a /perfil que siempre apile, aunque la pantalla ya exista.

    ```tsx
    <Link href="/perfil" push>
    Ir a mi perfil
    </Link>
    ```

c) Un botón (Pressable) propio que funcione como link a /carrito usando asChild.

    ```tsx
    <Link href="/carrito" asChild>
    <Pressable>
    <Text>Ir al carrito</Text>
    </Pressable>
    </Link>
    ```

---

## C5. Pensar.

- En la web, convertirse en una etiqueta HTML <a> real permite aprovechar el comportamiento nativo del navegador (como abrir en nueva pestania o copiar el enlace), mejora la accesibilidad para lectores de pantalla y es fundamental para el SEO, ya que permite a los motores de busqueda rastrear e indexar todas las rutas de la aplicacion.

- En el celular, al no haber barra de direcciones, el enlace se compila como un componente tactil nativo que gestiona el historial de navegacion internamente en la memoria. Este manejo oculto basado en URLs es clave porque habilita el "Deep Linking", lo que permite al sistema operativo recibir un enlace externo y abrir la aplicacion movil directamente en una pantalla especifica.

---

# Parte D - Navegadores: Stack, Tabs y Drawner.

## D1. Comparacion

| Caracteristica                       | Stack                                                                                | Tabs                                                                  | Drawer                                                                          |
| :----------------------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| ¿Apila pantallas?                    | Si                                                                                   | No                                                                    | No                                                                              |
| ¿Como cambia de pantalla el usuario? | Mediante botones/enlaces para avanzar, y el boton de volver atras en el encabezado.  | Tocando los iconos en la barra de navegacion inferior.                | Desplegando un menu lateral oculto (deslizando o tocando el boton hamburguesa). |
| ¿Desde donde se importa en SDK 57?   | `expo-router`                                                                        | `expo-router`                                                         | `expo-router/drawer`                                                            |
| Un caso de uso tipico                | Flujos paso a paso (ejemplo: ir de la lista de productos al detalle de un producto). | Secciones principales de la app (ejemplo: Inicio, Favoritos, Perfil). | Menu con multiples accesos secundarios (ejemplo: Configuracion, Soporte).       |

---

## D2. Cada Tab tiene su pila.

- El usuario, tras hacer toda la navegacion mencionada en el enunciado, veria nuevamente la pantalla del **producto 4**. Esto es asi por como se comportaria la aplicacion al momento de navegar por las vistas, ya que en este flujo las pantallas se van **_apilando_**, es deciR, Expo Router guarda cada (Tab) en memoria de forma independiente, entonces cuando el usuario vuelve directamente a **Productos**, Expo Router le muestra el _tope_ de **esa pila** (El producto 4). Un ejemplo del dia a dia es **Mercado Libre**.

---

## D3. Donde va cada pantalla?

a) Dentro de una tab. Al estar adentro, la barra de navegacion inferior sigue envolviendo a la pantalla y permanece visible.

b) En el Stack raiz. Al estar en la raiz, la nueva pantalla se apila por encima de todo el sistema de Tabs, ocultandolo por completo.

c) En el Stack raiz. Los modales globales (como inicio de sesion o alertas de error critico) siempre deben renderizarse por encima de cualquier otra estructura de navegacion.

d) Dentro de una tab. Es una pantalla que profundiza el historial dentro de la pestania Perfil, por lo que las tabs deben seguir visibles para que el usuario pueda ir al Inicio rapidamente si asi lo desea.

---

## D4. Configurar el Stack.

**Layout Proporcionado**:

```tsx
import { Stack } from "expo-router";
export default function LayoutRaiz() {
  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="hoja"
        options={{ presentation: "formSheet", sheetAllowedDetents: [0.5, 0.9] }}
      />
    </Stack>
  );
}
```

a) `screenOptions` aplica configuraciones globales a todas las pantallas que esten dentro de ese Stack (como si fuera una regla general). En cambio, `options` aplica configuraciones especificas y unicas solo a la pantalla donde se declara, sobreescribiendo cualquier regla global para ese caso puntual.

b) Porque el navegador interno de pestanias (Tabs) ya genera su propio encabezado superior por defecto. En caso de no ocultar el encabezado del Stack raiz pasandole `false`, el usuario veria dos encabezados duplicados uno arriba del otro.

c) Si, la pantalla existe y es perfectamente navegable porque Expo Router crea las rutas automaticamente con solo crear el archivo. Declararla explicitamente en el `_layout.tsx` mediante un `<Stack.Screen>` no es obligatorio; solo sirve si se requiere personalizar esa pantalla (cambiarle el titulo, cambiar su animacion a modal, ocultar su encabezado, etc.).

d) Cuatro valores comunes son: `card` (animacion normal), `modal` (de abajo hacia arriba tapando todo), `transparentModal` (modal con fondo translucido) y `formSheet`.
Para una hoja inferior al 50%, usaria **`formSheet`** y lo combinaria con la opcion `sheetAllowedDetents: [0.5]`.

e) Directamente dentro del archivo del detalle del producto, es posible importar `<Stack>` (o `<Stack.Screen>`) desde `expo-router` y renderizarlo junto con tu interfaz pasandole el titulo en las opciones:
`<Stack.Screen options={{ title: 'Producto 7' }} />`

---

## D5. Tabs y Drawer en SDK 57.

a) En SDK 57 `Tabs` ya no se importa desde `expo-router`, sino desde `expo-router/js-tabs` (pestanias implementadas en JavaScript). La alternativa experimental son las pestanias nativas, `NativeTabs`, que usan la barra de pestanias propia de cada sistema operativo.

b) El Drawer necesita `react-native-gesture-handler` y `react-native-reanimated`. En el layout raiz conviene envolver la app con `GestureHandlerRootView`, para que los gestos (como deslizar para abrir el menu) funcionen.

c) No. Desde SDK 56 Expo Router ya no admite importar paquetes externos de `@react-navigation/*` en el codigo de la app. El Drawer se importa directamente desde `expo-router/drawer`, que ya trae internamente lo necesario.

d) `router.back()` actua sobre el navegador que esta enfocado en ese momento (el mas interno, donde esta la pantalla visible). Si ese navegador no tiene pantallas anteriores a las cuales volver, la accion sube al navegador padre.

---

# Parte E - Rutas dinamicas, parametros y hooks.

## E1. Encontra el error.

Los parametros de la URL siempre llegan como _texto_. Entonces `id` vale `"3"`, mientras que `p.id` vale `3` (numero). Como `===` compara tambien el tipo, `3 === "3"` da `false` y `find` nunca encuentra el producto. Lo mismo pasa con `if (id === 3)`, que nunca se cumple.

La correccion es convertir el parametro a numero antes de comparar:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
const idNumero = Number(id);
const producto = productos.find((p) => p.id === idNumero);
if (idNumero === 3) console.log("Es el chipa");
```

Si llega algo como `/productos/mate`, `Number("mate")` da `NaN`, `find` no encuentra nada y se muestra el mensaje de "No existe".

---

## E2. Catch-all.

| URL                          | slug                                                                                                                       |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `/docs/react`                | `["react"]`                                                                                                                |
| `/docs/react/hooks/useState` | `["react", "hooks", "useState"]`                                                                                           |
| `/docs`                      | No coincide con `[...slug]`, porque este requiere al menos un segmento. La atiende `docs/index.tsx` si existe (sino, 404). |

---

## E3. Anatomia de una URL.

a) El _scheme_ es `rutasipf://`, la ruta es `/buscar` y los parametros de busqueda son `q=mate` y `categoria=bebidas`.

b) Devuelve un objeto con los valores como texto: `{ q: "mate", categoria: "bebidas" }`.

c) No. Los corchetes solo se usan para segmentos dinamicos que forman parte de la ruta (como `/productos/[id]`). Los parametros de busqueda van despues del `?`, no forman parte del path y llegan a cualquier pantalla sin configurar nada en el nombre del archivo.

d) Dos razones:

    - `push` apilaria una pantalla nueva por cada letra escrita, llenando la pila y obligando al usuario a tocar atras muchas veces para salir del buscador.
    - `setParams` solo actualiza los parametros de la pantalla actual, sin crear otra ni volver a montarla (el input no pierde el foco), y deja la URL siempre sincronizada, por lo que la busqueda se puede compartir con un link.

---

## E4. Donde estoy?

| Hook                     | En `/productos/3`                 | En `/buscar?q=chipa` |
| :----------------------- | :-------------------------------- | :------------------- |
| `usePathname()`          | `"/productos/3"`                  | `"/buscar"`          |
| `useSegments()`          | `["(tabs)", "productos", "[id]"]` | `["buscar"]`         |
| `useLocalSearchParams()` | `{ id: "3" }`                     | `{ q: "chipa" }`     |

`usePathname()` nunca incluye los parametros de busqueda, y `useSegments()` si incluye los grupos entre parentesis como `(tabs)`.

---

## E5. Local vs global.

a) `useLocalSearchParams` devuelve los parametros de la ruta de la pantalla donde se usa, aunque haya otras pantallas encima en la pila. `useGlobalSearchParams` devuelve los de la URL actual de toda la app (la pantalla enfocada), por lo que las pantallas del fondo tambien se re-renderizan cada vez que la URL cambia. La opcion por defecto es la **local**, porque cada pantalla conserva sus propios parametros y se evitan re-renderizados innecesarios.

b) `useFocusEffect` ejecuta un efecto cada vez que la pantalla gana el foco y lo limpia cuando lo pierde. Es necesario porque en un Stack las pantallas de abajo siguen montadas, por lo que un `useEffect` no vuelve a correr al regresar a ellas. Ejemplo: refrescar la lista de pedidos cada vez que el usuario vuelve a esa pantalla.

c) No, no es un error de Expo Router. El archivo `[id].tsx` coincide con cualquier segmento, exista o no el producto. Validar el parametro y mostrar un mensaje cuando no se encuentra es responsabilidad del desarrollador, dentro de la propia pantalla.

---

# Parte F - Redirecciones, rutas protegidas y deep links.

## F1. Redirect.

a) Al renderizarse, `<Redirect href="/productos" />` lleva automaticamente al usuario a esa ruta. Equivale a `router.replace("/productos")`.

b) Porque si apilara (`push`), la pantalla que redirige quedaria en la pila. Al tocar atras, el usuario volveria a ella, esta volveria a redirigir y quedaria atrapado en un bucle sin poder retroceder.

---

## F2. Stack.Protected.

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="privado" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" options={{ presentation: "modal" }} />
</Stack.Protected>
```

a) Cuando el guard es `false`, la pantalla deja de existir en el navegador: no se puede llegar a ella ni por un link ni por un deep link, y si estaba en la pila se elimina del historial.

b) Porque al iniciar sesion `conSesion` pasa a `true`, el guard de `login` pasa a `false` y esa pantalla desaparece del navegador. El Stack la quita solo y muestra la pantalla que quedaba debajo.

c) Lo causa intentar navegar a una ruta cuyo guard es `false` en ese momento, por ejemplo `router.push("/privado")` sin sesion (o navegar justo antes de que se actualice el estado de la sesion). Se evita navegando solo cuando el guard es `true` (mostrando el boton o link unicamente si hay sesion) y dejando que el cambio de guard haga el resto.

d) La logica de acceso queda centralizada en un solo lugar (el layout raiz) en vez de repetirse en cada pantalla. Tambien evita que la pantalla protegida se muestre un instante antes de redirigir, cubre los deep links y limpia el historial al cerrar sesion.

---

## F3. 404, anchor y rutas tipadas.

a) `+not-found.tsx` es la pantalla que se muestra cuando la URL no coincide con ninguna ruta (el 404). Se define en `src/app/+not-found.tsx`.

b) `anchor` indica la ruta base que queda debajo en la pila cuando se abre un deep link directo a una pantalla profunda. Asi, el boton atras lleva a `(tabs)` en vez de sacar al usuario de la app. Se define en el `_layout.tsx` del navegador correspondiente (en este caso el raiz, `src/app/_layout.tsx`).

c) `typedRoutes` activa la verificacion de tipos de los `href`. Si se escribe `<Link href="/prodcutos" />`, TypeScript marca error porque esa ruta no existe, detectando el typo antes de ejecutar la app. Se activa en `app.json` y los tipos se generan automaticamente en `.expo/types/router.d.ts`.

---

## F4. Deep links.

| Donde                        | URL                                 |
| :--------------------------- | :---------------------------------- |
| App instalada (build propia) | `comedoripf://menu/7`               |
| Expo Go en desarrollo        | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7`      |

La parte `/--/` separa la direccion del servidor de desarrollo (IP y puerto) de la ruta interna de la app. El scheme propio no funciona dentro de Expo Go porque Expo Go es una app ya instalada con su propio scheme (`exp://`) y no tiene registrado `comedoripf`. Ese scheme solo existe en una build propia de la app.

---

## F5. Errores comunes.

a) **Causa:** `Link` con `asChild` le pasa sus props (incluido `style`) al hijo a traves de un `Slot`, y este no admite un array de estilos. **Solucion:** combinar los estilos en un unico objeto con `StyleSheet.flatten([estilos.boton, activo && estilos.activo])`.

b) **Causa:** todo archivo dentro de `src/app` se convierte en una ruta, incluso un componente. **Solucion:** mover `TarjetaProducto.tsx` a `src/components/`.

c) **Causa:** `router.push("/")` apila el inicio encima del login, que queda debajo en la pila, por lo que atras vuelve a el. **Solucion:** usar `router.replace("/")` o, con `Stack.Protected`, dejar que el guard cierre el login solo.

d) **Causa:** `npm install` instala la ultima version del paquete sin tener en cuenta la compatibilidad con el SDK, y Expo Go exige versiones alineadas. **Solucion:** instalar con `npx expo install <paquete>`, o corregir las versiones ya instaladas con `npx expo install --fix`.
