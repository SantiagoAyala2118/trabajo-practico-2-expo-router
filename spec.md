# Especificación: Comedor IPF

## 1. Objetivo, alcance y fuera de alcance

### Objetivo
App móvil **"Comedor IPF"** para el Instituto Politécnico Formosa (TP N° 2, React Native II). Permite a los alumnos pedir comida desde el celular y a la cocina atender los pedidos en orden de llegada. Combina una **Cola** (pedidos FIFO) y una **Pila** (deshacer en el carrito, LIFO).

### Alcance
- Todo lo definido en el brief (secciones 1–13): estructuras de datos, datos estáticos, estado global, enrutamiento con Expo Router SDK 57, pantallas, tema, componentes, tests y documentación.
- Los 4 desafíos opcionales.

### Fuera de alcance
- Backend o API real.
- Persistencia (AsyncStorage, etc.).
- Librerías de UI o animaciones extra.
- Internacionalización.
- Pantallas o rutas no listadas en la tabla de rutas (excepción: `acceso-cocina.tsx` del desafío 2).
- Tests fuera de los definidos en la sección 0.4.

---

## 2. Stack y restricciones técnicas

| Elemento | Detalle |
|---|---|
| Framework | React Native con Expo SDK 57 |
| Lenguaje | TypeScript estricto (`strict: true`), sin `any`, sin `// @ts-ignore` |
| Router | Expo Router (incluido en SDK 57) |
| Instalación de paquetes | **Solo** `npx expo install <paquete>`. Nunca `npm install` |
| Imports de SDK 57 | `Tabs` desde `expo-router/js-tabs` (no desde `expo-router`), `Drawer` desde `expo-router/drawer` |
| Rutas tipadas | `typedRoutes: true` en `app.json > expo > experiments` |
| Entry point | `"main": "expo-router/entry"` |
| Scheme | `"comedoripf"` |
| Interfaz | `"userInterfaceStyle": "dark"` |
| Dependencias requeridas | `react-native-gesture-handler`, `react-native-reanimated`, `react-native-worklets` (si la versión lo requiere), `@expo/vector-icons` |

### Reglas de trabajo
- Idioma: nombres de variables, funciones, tipos, archivos y comentarios en **español**.
- No borrar archivos del usuario (ej: `RESPUESTAS.md`).
- Verificar APIs en la documentación oficial antes de usarlas: https://docs.expo.dev/router/introduction

---

## 3. Arquitectura por capas y árbol de carpetas

### Capas

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| Estructuras puras | `src/estructuras` | `Pila` y `Cola`. TypeScript puro, sin React. |
| Datos | `src/data` | Platos, categorías, artículos de ayuda, constantes. |
| Estado global | `src/context` | Un Context + Provider + hook `useComedor`. |
| Presentación | `src/components` | Componentes reutilizables sin lógica de negocio. |
| Rutas | `src/app` | **Solo** archivos de ruta y layouts. Ningún componente reutilizable. |
| Tema | `src/tema` | Colores, espaciado y radios. |
| Tests | `__tests__` (raíz) | Tests unitarios, de estado, de componentes y de rutas. **Nunca dentro de `src/app`.** |

### Patrones obligatorios
- **Provider/Context** para el estado global.
- **Custom Hook** (`useComedor`).
- **Guard** (`Stack.Protected`).
- **Composición** (componentes chicos y reutilizables).
- **Inmutabilidad de estado en React** (snapshots con `aArray()`).

### Árbol de archivos obligatorio

```
spec.md
plan.md
tasks.md
jest.config.js
jest.setup.ts
__tests__/                             # replica la estructura de src/
src/
├── app/
│   ├── _layout.tsx                    # Stack RAÍZ + GestureHandlerRootView + Provider + Stack.Protected + anchor
│   ├── +not-found.tsx                 # 404
│   ├── pedido.tsx                     # <Redirect href="/carrito" />
│   ├── buscar.tsx                     # /buscar?q=&categoria=
│   ├── confirmar.tsx                  # modal
│   ├── login.tsx                      # modal, solo existe sin sesión
│   ├── (tabs)/
│   │   ├── _layout.tsx                # Tabs (expo-router/js-tabs)
│   │   ├── index.tsx                  # / (tab Inicio)
│   │   ├── acceso-cocina.tsx          # Solo para desafío Tabs.Protected
│   │   ├── menu/
│   │   │   ├── _layout.tsx            # Stack propio de la tab Menú
│   │   │   ├── index.tsx              # /menu
│   │   │   └── [id].tsx               # /menu/[id]
│   │   └── carrito/
│   │       ├── _layout.tsx            # Stack propio de la tab Carrito
│   │       ├── index.tsx              # /carrito
│   │       └── nota.tsx               # /carrito/nota
│   ├── categorias/
│   │   └── [categoria].tsx            # /categorias/[categoria]
│   ├── turno/
│   │   └── [numero].tsx               # /turno/[numero]
│   ├── ayuda/
│   │   ├── index.tsx                  # /ayuda
│   │   └── [...slug].tsx              # /ayuda/pagos/efectivo, etc.
│   └── cocina/
│       ├── _layout.tsx                # Drawer (expo-router/drawer)
│       ├── index.tsx                  # /cocina
│       └── atendidos.tsx              # /cocina/atendidos
├── components/
│   ├── DondeEstoy.tsx
│   ├── Pantalla.tsx
│   ├── BotonPrimario.tsx
│   ├── TarjetaPlato.tsx
│   ├── TarjetaPedido.tsx
│   ├── MensajeEstado.tsx
│   ├── BotonCerrarSesion.tsx
│   └── TituloConContadorDePila.tsx
├── context/
│   └── ComedorContext.tsx
├── data/
│   ├── platos.ts
│   ├── ayuda.ts
│   └── configuracion.ts
├── estructuras/
│   ├── Pila.ts
│   └── Cola.ts
└── tema/
    └── colores.ts
```

---

## 4. Convenciones: nomenclatura, patrones, estilo de comentarios

### Nomenclatura
- **Español** en todo: variables, funciones, tipos, archivos (excepto archivos con convención de Expo Router como `_layout.tsx`, `+not-found.tsx`).
- Nombres claros y descriptivos (ej: `agregarAlCarrito`, `pedidosEnEspera`, `hayUsuario`).
- Sin abreviaturas crípticas.
- No usar tildes ni ñ.

### Patrones
- **Provider/Context**, **Custom Hook**, **Guard**, **Composición**, **Inmutabilidad de estado**.
- Mencionar el patrón en comentarios donde se aplique.

### Estilo de comentarios
- En español, concisos, explican el **porqué** (no lo obvio).
- Los importantes para la defensa arrancan con `// DEFENSA:`.
- Obligatorios en: layouts, rutas dinámicas, `setParams` vs `push`, `replace`, `Redirect`, `+not-found`, `Link` vs `router`, `asChild`, deep links, `Pila` y `Cola`.

---

## 5. Modelo de datos (tipos e interfaces)

### Plato
```typescript
interface Plato {
  id: number;        // numérico (los parámetros de URL llegan como texto, convertir con Number())
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}
```

### Categoría
```typescript
const CATEGORIAS = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'] as const;
type Categoria = typeof CATEGORIAS[number];
```

### ItemCarrito
```typescript
interface ItemCarrito {
  idItem: number;    // identificador único del ítem en el carrito
  plato: Plato;
}
```

### AccionCarrito
```typescript
interface AccionCarrito {
  tipo: 'AGREGAR_PLATO';
  idItem: number;
}
```

### Pedido
```typescript
interface Pedido {
  numero: number;    // turno correlativo (empieza en 1)
  items: ItemCarrito[];
  nota: string;
  total: number;
}
```

### ResultadoTurno
```typescript
type ResultadoTurno =
  | { estado: 'en-espera'; pedidosAdelante: number }
  | { estado: 'atendido' }
  | { estado: 'inexistente' };
```

### Artículo de ayuda
```typescript
interface ArticuloAyuda {
  titulo: string;
  contenido: string;
}
```
Los artículos se indexan por ruta (ej: `"pagos/efectivo"`, `"horarios"`).

---

## 6. Contratos de Pila y Cola

### `Pila<T>` (LIFO)
- **Campos privados reales** de JavaScript (`#items`).
- **Métodos:**
  - `push(elemento: T): void`
  - `pop(): T | undefined`
  - `tope(): T | undefined`
  - `aArray(): T[]` — devuelve una **copia** (de la base al tope)
- **Getters:**
  - `vacia: boolean`
  - `tamanio: number`
- **Implementación:** usa `Array.push` / `Array.pop` sobre `#items`.
- **Restricciones:** no exponer el estado interno (por eso `aArray()` devuelve copia).

### `Cola<T>` (FIFO, **prohibido usar `shift()`**)
- **Campos privados reales** (`#items`, `#indiceFrente`).
- **Métodos:**
  - `encolar(elemento: T): void`
  - `desencolar(): T | undefined`
  - `frente(): T | undefined`
  - `aArray(): T[]` — copia, del frente al final
- **Getters:**
  - `vacia: boolean`
  - `tamanio: number`
- **Implementación:** índice del frente. Desencolar devuelve `#items[#indiceFrente]`, libera la posición (asignar `undefined`), avanza el índice (O(1)). Compactar con `slice` cuando `#indiceFrente` supere la mitad del largo (compactación amortizada).
- **Sin capacidad fija** (los pedidos no se rechazan por falta de lugar).
- **Restricciones:** no usar `shift()`, no exponer estado interno.

### Comentarios de defensa obligatorios
- Qué significa LIFO/FIFO.
- Para qué sirve `#`.
- Por qué `aArray()` devuelve copia.
- Por qué la cola no usa `shift()`.

---

## 7. Estado global: API del Context y lógica de negocio

### Estructura
Un único `ComedorContext` con `ComedorProvider` en el layout raíz y un hook `useComedor()` que lanza error si se usa fuera del Provider.

### Estado interno
- Sesión: usuario actual (`string | null`).
- Carrito: ítems (`ItemCarrito[]`), nota (`string`).
- `Pila<AccionCarrito>` para deshacer.
- `Cola<Pedido>` de pedidos en espera.
- `Pila<Pedido>` de pedidos atendidos.
- Contador correlativo de turnos (empieza en 1).

### Patrón de snapshots (inmutabilidad)
Las instancias de `Pila` y `Cola` son mutables → guardarlas en `useRef`. Después de **cada** operación que las modifique, actualizar un `useState` con **copias** obtenidas con `aArray()`. La interfaz solo lee esos snapshots. Comentar por qué (mutar una clase no dispara re-render).

### API expuesta

#### Sesión
- `usuario: string | null`
- `hayUsuario: boolean`
- `iniciarSesion(usuario: string, clave: string): boolean`
- `cerrarSesion(): void`

#### Carrito
- `itemsCarrito: ItemCarrito[]`
- `totalCarrito: number`
- `cantidadItems: number`
- `nota: string`
- `guardarNota(texto: string): void`
- `agregarAlCarrito(plato: Plato): void`
- `deshacerUltimo(): void`
- `puedeDeshacer: boolean` (derivado de `pilaDeshacer.tamanio > 0`)

#### Pedidos
- `confirmarPedido(): Pedido`
- `pedidosEnEspera: Pedido[]`
- `pedidoEnFrente: Pedido | undefined` (usa `frente()`)
- `cantidadEnEspera: number` (usa `tamanio`)
- `atenderSiguiente(): void`
- `pedidosAtendidos: Pedido[]` (ordenados del tope a la base: último atendido primero)
- `buscarTurno(numero: number): ResultadoTurno`

### Lógica de negocio
- **`agregarAlCarrito`**: crea `ItemCarrito` con `idItem` único, lo agrega al carrito y hace `push` de la acción en la pila de deshacer.
- **`deshacerUltimo`**: `pop` de la pila y quita del carrito el ítem con ese `idItem`. No hace nada si la pila está vacía.
- **`confirmarPedido`**: asigna turno correlativo, arma el `Pedido` (con total y nota), lo **encola**, vacía carrito, nota y pila de deshacer (nueva `Pila`), devuelve el pedido.
- **`atenderSiguiente`**: `desencolar()` de la cola y `push` a la pila de atendidos.
- **`iniciarSesion`**: compara contra las constantes de `configuracion.ts`.

### Eficiencia
- `useCallback` para las funciones.
- `useMemo` para el `value` del Context y para valores derivados.

---

## 8. Enrutamiento

### 8.1 Layout raíz (`src/app/_layout.tsx`)
- `export const unstable_settings = { anchor: '(tabs)' }`.
  - **DEFENSA:** garantiza que un deep link como `/categorias/bebidas` deje las tabs debajo en la pila; "atrás" lleva a las tabs, no saca al usuario de la app.
- Estructura: `GestureHandlerRootView` (con `flex: 1`) > `ComedorProvider` > componente `NavegacionRaiz` (dentro del Provider porque necesita `useComedor`).
- `NavegacionRaiz` renderiza un `<Stack>` con:
  - `(tabs)`: `headerShown: false`.
  - `categorias/[categoria]`, `buscar`, `turno/[numero]`, `ayuda/index`, `ayuda/[...slug]`: pantallas normales con títulos.
  - `confirmar`: `presentation: 'modal'`.
  - `<Stack.Protected guard={hayUsuario}>` con `cocina` (`headerShown: false`).
  - `<Stack.Protected guard={!hayUsuario}>` con `login` (`presentation: 'modal'`).
- **DEFENSA:** guard `false` = la pantalla deja de existir (incluso para deep links) y sale del historial. Login se cierra solo al iniciar sesión (guard pasa a `false`). Al cerrar sesión desde `/cocina/atendidos` la sección desaparece sola.

### 8.2 Tabs (`src/app/(tabs)/_layout.tsx`)
- `import { Tabs } from 'expo-router/js-tabs'` (SDK 57).
- Tres tabs: `index` ("Inicio"), `menu` ("Menú"), `carrito` ("Carrito") con Ionicons.
- `menu` y `carrito` con `headerShown: false`.
- Badge en tab Carrito: `tabBarBadge` con `cantidadItems` (sin badge si es 0).
- `(tabs)` es un **grupo**: no aparece en la URL.

### 8.3 Stacks dentro de las tabs
- `(tabs)/menu/_layout.tsx`: `<Stack>` con `index` y `[id]`. `anchor: 'index'`.
- `(tabs)/carrito/_layout.tsx`: `<Stack>` con `index` y `nota`. `anchor: 'index'`.
- **DEFENSA:** cada tab tiene su propia pila. `/menu/[id]` dentro de la tab mantiene la barra visible. Si el usuario abre un detalle, cambia de tab y vuelve, ve el mismo detalle.

### 8.4 Drawer (`src/app/cocina/_layout.tsx`)
- `import { Drawer } from 'expo-router/drawer'`.
- Pantallas: `index` ("Cocina") y `atendidos` ("Atendidos").
- `BotonCerrarSesion` en `headerRight`. Solo llama a `cerrarSesion()`. **No llama a `router.back()` ni `router.replace()`**: el guard se encarga.

### 8.5 Tabla de rutas

| URL | Archivo | Detalle |
|---|---|---|
| `/` | `(tabs)/index.tsx` | Tab "Inicio" |
| `/menu` | `(tabs)/menu/index.tsx` | Tab "Menú" con Stack propio |
| `/menu/[id]` | `(tabs)/menu/[id].tsx` | Dentro de la tab Menú. Header = nombre del plato |
| `/categorias/[categoria]` | `categorias/[categoria].tsx` | Stack raíz |
| `/buscar?q=&categoria=` | `buscar.tsx` | Stack raíz |
| `/carrito` | `(tabs)/carrito/index.tsx` | Tab "Carrito" con badge |
| `/carrito/nota` | `(tabs)/carrito/nota.tsx` | Dentro de la tab Carrito |
| `/confirmar` | `confirmar.tsx` | Modal |
| `/turno/[numero]` | `turno/[numero].tsx` | Stack raíz |
| `/login` | `login.tsx` | Modal, `Stack.Protected` (solo sin sesión) |
| `/cocina` | `cocina/index.tsx` | Drawer, `Stack.Protected` (solo con sesión) |
| `/cocina/atendidos` | `cocina/atendidos.tsx` | Drawer |
| `/ayuda` y `/ayuda/...` | `ayuda/index.tsx` + `ayuda/[...slug].tsx` | Índice + catch-all |
| `/pedido` | `pedido.tsx` | `<Redirect href="/carrito" />` |
| cualquier otra | `+not-found.tsx` | 404 con URL inexistente |

### 8.6 Reglas de navegación
1. `<Link>` cuando el usuario toca algo. `router` cuando se navega después de una lógica.
2. **Confirmar pedido:** `router.replace({ pathname: '/turno/[numero]', params: { numero: pedido.numero } })`. **DEFENSA:** `replace` para que la confirmación no quede en la pila (evita confirmar dos veces).
3. **hrefs tipados:** rutas estáticas con string; dinámicas con objeto `{ pathname, params }`.
4. **Link con `asChild` + `Pressable`:** no pasar array de estilos al hijo. Aplanar con `StyleSheet.flatten` o usar un único objeto.
5. Parámetros llegan como texto: validar siempre.
6. Card "Cocina" de Inicio va a `/login` sin sesión, a `/cocina` con sesión.
7. Cola FIFO de acciones de navegación: comentar qué pasa con acciones consecutivas.

---

## 9. Pantallas: comportamiento y validaciones

Todas terminan con `<DondeEstoy />`. En listas, va en `ListFooterComponent`. Nunca anidar lista vertical dentro de `ScrollView`.

### `/` Inicio
Saludo y 4 tarjetas: Menú (`/menu`), Buscar (`/buscar`), Ayuda (`/ayuda`), Cocina (`/login` sin sesión, `/cocina` con sesión).

### `/menu`
`SectionList` con platos agrupados por categoría. Cada plato es `<Link>` a `/menu/[id]` con `TarjetaPlato`. Encabezado de sección con link "Ver categoría" a `/categorias/[categoria]`.

### `/menu/[id]`
`useLocalSearchParams<{ id: string }>()`, convertir con `Number(id)`. Si no existe o es `NaN` → `MensajeEstado`. Si existe: nombre, precio, descripción, botón "Agregar al carrito" (sin navegar, con mensaje de confirmación breve). Header = nombre del plato via `<Stack.Screen options={{ title: plato.nombre }} />`.

### `/categorias/[categoria]`
Validar con `esCategoriaValida`. Inválida → mensaje. Válida → lista de platos con links a `/menu/[id]`.

### `/buscar?q=&categoria=`
`useLocalSearchParams` para `q` y `categoria`. `TextInput` + chips de categoría (Todas + 4). Al escribir o elegir chip → `router.setParams(...)` (**nunca `push`**). Estado local del input sincronizado con el parámetro. Filtrado con `useMemo` (sin mayúsculas ni acentos). Categoría inválida se ignora. Resultados con links a `/menu/[id]`.

### `/carrito`
Lista de ítems, total, `Link` "Agregar nota" a `/carrito/nota`, botón "Deshacer último" (deshabilitado si `!puedeDeshacer`), botón "Confirmar pedido" (`Link` a `/confirmar`, deshabilitado con carrito vacío). Mensaje de carrito vacío.

### `/carrito/nota`
`TextInput` multilínea + botón "Guardar" (`guardarNota` + `router.back()`).

### `/confirmar` (modal)
Resumen: ítems, nota, total. Botón "Confirmar" (flujo de replace a `/turno/[numero]`) y "Cancelar" (`router.back()`). Si carrito vacío (deep link) → mensaje, no permitir confirmar.

### `/turno/[numero]`
`Number(numero)` + `buscarTurno`. Estados: en espera (turno, pedidos adelante, tiempo estimado), atendido, inexistente/inválido.

### `/login` (modal)
Usuario y clave. Válidos → `iniciarSesion`, **no navega** (el guard cierra el modal). Inválidos → mensaje de error.

### `/cocina`
`TarjetaPedido` con `pedidoEnFrente`, cantidad en espera, botón "Atender siguiente" (deshabilitado si cola vacía). Mensaje si no hay pedidos.

### `/cocina/atendidos`
Lista de `pedidosAtendidos` (más reciente primero).

### `/ayuda`
Índice con links a los artículos.

### `/ayuda/[...slug]`
`useLocalSearchParams<{ slug: string[] }>()`. Unir con `/` y buscar. No existe → mensaje.

### `/pedido`
`<Redirect href="/carrito" />`. **DEFENSA:** `Redirect` equivale a `replace` (no `push`), evita bucle al volver atrás.

### `+not-found`
Muestra URL inexistente (`usePathname()`), `Link` a `/` para volver.

---

## 10. Tema y paleta

### Paleta institucional (tema oscuro verde)

| Nombre | Hex | Uso |
|---|---|---|
| `fondo` | `#051F20` | Fondo de pantallas, headers |
| `superficie` | `#0B2B26` | Tarjetas, tab bar, drawer, modales |
| `borde` | `#163832` | Bordes, separadores, botones deshabilitados |
| `primario` | `#235347` | Botones primarios, elementos activos |
| `acento` | `#8EB69B` | CTA destacados, íconos, textos secundarios |
| `textoClaro` | `#DAF1DE` | Texto principal sobre fondos oscuros |
| `negro` | `#000000` | Texto sobre fondos claros, sombras |

### Reglas de aplicación
- Texto principal: `textoClaro` sobre `fondo`/`superficie`.
- Botones CTA: fondo `acento`, texto `negro`.
- Botones primarios: fondo `primario`, texto `textoClaro`.
- Tab bar: fondo `superficie`, ícono activo `textoClaro`, inactivo `acento`.
- No usar hex sueltos fuera de `colores.ts`.
- `StyleSheet.create` siempre.
- Fuente del sistema (no instalar fuentes).
- `StatusBar` estilo claro.
- Constantes de espaciado y radios de borde en `src/tema`.

---

## 11. Desafíos opcionales

### Desafío 1: Contador de pila (T4 componente, uso en T6/T7/T8)
Componente `TituloConContadorDePila` usa `useNavigation().getState().routes.length` y renderiza `<Stack.Screen options={{ title: ... }} />` con formato `"<título> (pila: N)"`. Usar en `/menu/[id]`, `/categorias/[categoria]`, `/turno/[numero]`, `/carrito/nota` y `/buscar`.

### Desafío 2: Tab protegida (T9)
`Tabs.Protected guard={hayUsuario}` para una cuarta pestaña "Cocina". Crear `(tabs)/acceso-cocina.tsx` con `<Redirect href="/cocina" />`. En `Tabs.Screen` interceptar `tabPress` con `preventDefault` + `router.push('/cocina')`.

### Desafío 3: Hoja inferior (T8)
`/carrito/nota` con `presentation: 'formSheet'` y `sheetAllowedDetents: [0.5, 0.9]` en el layout del carrito.

### Desafío 4: Tiempo estimado (T8)
En `/turno/[numero]`: espera = pedidos adelante × `MINUTOS_POR_PEDIDO`. Mostrar "aprox. X min" (si 0 adelante: "es tu turno / falta poco").

---

## 12. Requisitos numerados con criterios de aceptación

### Requisitos funcionales (RF)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RF-01 | El usuario puede ver el menú agrupado por categoría | `SectionList` renderiza al menos 12 platos en 4 categorías, con links funcionales a `/menu/[id]` |
| RF-02 | El usuario puede ver el detalle de un plato | Al navegar a `/menu/[id]` con un id válido, se muestra nombre, precio, descripción y botón "Agregar" |
| RF-03 | El usuario puede agregar platos al carrito | `agregarAlCarrito` agrega un `ItemCarrito`, la pila de deshacer registra la acción, `cantidadItems` se incrementa |
| RF-04 | El usuario puede deshacer la última acción del carrito | `deshacerUltimo` quita el último ítem agregado; botón deshabilitado si pila vacía |
| RF-05 | El usuario puede agregar una nota al pedido | `guardarNota` guarda texto; la nota aparece en el resumen de confirmación |
| RF-06 | El usuario puede confirmar un pedido | `confirmarPedido` encola el pedido, asigna turno, vacía carrito y pila, navega con `replace` a `/turno/[numero]` |
| RF-07 | El usuario puede ver el estado de su turno | `/turno/[numero]` muestra estado en-espera (con pedidos adelante), atendido o inexistente |
| RF-08 | La cocina puede iniciar sesión con credenciales fijas | `iniciarSesion('cocina', '1234')` retorna `true`; credenciales inválidas retornan `false` |
| RF-09 | La cocina puede atender el siguiente pedido | `atenderSiguiente` desencola el pedido del frente y lo pushea a atendidos; botón deshabilitado si cola vacía |
| RF-10 | La cocina puede ver el historial de atendidos | `/cocina/atendidos` muestra pedidos del más reciente al más antiguo |

### Requisitos técnicos (RT)

| ID | Requisito | Criterio de aceptación |
|---|---|---|
| RT-01 | TypeScript estricto sin `any` ni `@ts-ignore` | `npx tsc --noEmit` pasa con 0 errores |
| RT-02 | `Pila` usa campos privados `#` y `aArray()` devuelve copia | Test: modificar el array devuelto no afecta la pila |
| RT-03 | `Cola` no usa `shift()` y mantiene O(1) en desencolar | Test: grep en el código + test con muchas operaciones y compactación |
| RT-04 | Colores solo desde `colores.ts` | Grep: ningún hex fuera de `colores.ts` |
| RT-05 | Estado global usa snapshots (`useRef` + `useState` + `aArray()`) | Test de renderHook verifica re-render tras mutación |
| RT-06 | `useComedor` lanza error fuera del Provider | Test con `renderHook` sin wrapper |
| RT-07 | Todos los `href` tipados pasan `tsc` | `npx tsc --noEmit` incluye los tipos generados por `typedRoutes` |
| RT-08 | Rutas tipadas activas | `typedRoutes: true` en `app.json` |
| RT-09 | Paquetes instalados solo con `npx expo install` | No existe `npm install` en el historial |
| RT-10 | Comentarios `// DEFENSA:` en todos los puntos obligatorios | Grep verifica presencia |

### Requisitos de rutas (RR)

| ID | Ruta | Criterio de aceptación |
|---|---|---|
| RR-01 | `/` | Renderiza pantalla de inicio con 4 tarjetas |
| RR-02 | `/menu` | Renderiza SectionList con platos |
| RR-03 | `/menu/[id]` | Renderiza detalle del plato con id numérico válido; mensaje si inválido |
| RR-04 | `/categorias/[categoria]` | Renderiza platos de la categoría; mensaje si inválida |
| RR-05 | `/buscar?q=&categoria=` | Filtra por texto y categoría con `setParams` |
| RR-06 | `/carrito` | Renderiza ítems, total, botones deshacer y confirmar |
| RR-07 | `/carrito/nota` | Renderiza TextInput multilínea + Guardar |
| RR-08 | `/confirmar` | Modal con resumen; impide confirmar con carrito vacío |
| RR-09 | `/turno/[numero]` | Muestra estado del turno |
| RR-10 | `/login` | Modal protegido, se cierra solo al iniciar sesión |
| RR-11 | `/cocina` | Protegida por guard, muestra pedido del frente |
| RR-12 | `/cocina/atendidos` | Lista de atendidos, más reciente primero |
| RR-13 | `/ayuda` | Índice de artículos con links |
| RR-14 | `/ayuda/[...slug]` | Muestra artículo o mensaje si no existe |
| RR-15 | `/pedido` | Redirige a `/carrito` |
| RR-16 | URL inexistente | Muestra 404 con `usePathname()` |

### Requisitos opcionales (RO)

| ID | Desafío | Criterio de aceptación |
|---|---|---|
| RO-01 | Contador de pila | `TituloConContadorDePila` muestra `"<título> (pila: N)"` con `getState().routes.length` |
| RO-02 | Tab protegida | Pestaña "Cocina" solo visible con sesión; `acceso-cocina.tsx` redirige a `/cocina` |
| RO-03 | Hoja inferior | `/carrito/nota` con `presentation: 'formSheet'` y `sheetAllowedDetents` |
| RO-04 | Tiempo estimado | `/turno/[numero]` muestra tiempo = pedidos adelante × `MINUTOS_POR_PEDIDO` |

---

## 13. Estrategia de testing

### Herramientas
- Jest con preset `jest-expo`.
- `@testing-library/react-native`.
- `expo-router/testing-library` (`renderRouter`).
- Script: `"test": "jest"`.
- Instalar con `npx expo install jest-expo jest @types/jest @testing-library/react-native --dev`.

### Ubicación
- Carpeta `__tests__/` en la **raíz**, replicando la estructura de `src/`.
- **Nunca dentro de `src/app`** (Expo Router lo interpretaría como rutas).
- Configuración en `jest.config.js` y `jest.setup.ts` (raíz).

### Mocks
- Reanimated y Gesture Handler en `jest.setup.ts` si lo requieren.
- No mockear lógica propia del proyecto.

### Niveles de test

| Nivel | Qué se prueba |
|---|---|
| Unitarios | `Pila`, `Cola` (incluyendo que Cola no use `shift()`, orden tras muchas operaciones y compactaciones), funciones de `platos.ts`, artículos de ayuda |
| Lógica de estado | Context con `renderHook` y Provider como wrapper (agregar, deshacer, confirmar, atender, sesión, `buscarTurno`) |
| Componentes | Render, props y estados deshabilitados |
| Integración de rutas | Con `renderRouter` apuntando al directorio real `src/app` (pathname, segmentos, parámetros, pantallas, guards, redirecciones, 404, `replace`/`setParams` no apilan) |

### Verificaciones manuales
- Gestos del Drawer.
- Apariencia real en el celular.
- Deep link en Expo Go.

---

## 14. README y entregables

El README (en T10) incluye:
1. Descripción breve y cómo ejecutar / correr tests.
2. Árbol de carpetas de `src/app` con el navegador de cada layout.
3. Tabla de rutas.
4. Justificación de `replace` vs `push`.
5. Explicación de Cola y Pilas.
6. Desafíos opcionales implementados y ruta extra (`acceso-cocina`).
7. Deep link de prueba para Expo Go y scheme propio.
8. Secciones de capturas con `<!-- PEGAR CAPTURA AQUÍ -->`.

---

## 15. Preguntas de la defensa oral

1. Qué método se usa de `/confirmar` a `/turno/[numero]` y qué pasaría con `push`.
2. Qué ocurre con `/cocina/atendidos` si la cocina cierra sesión y por qué no hace falta `router.back()`.
3. Por qué "Deshacer" usa una pila y los pedidos una cola.
4. Qué pasa con `comedoripf://menu/999` (plato inexistente) y con `comedoripf://no-existe` (404).
5. En qué orden se procesan "Agregar al carrito" y el link al carrito (cola FIFO de acciones de navegación).
6. Qué pantalla queda debajo al abrir `/categorias/bebidas` por deep link y qué configuración lo decide (`anchor: '(tabs)'`).

---

## 16. Registro de cambios de la spec

| Fecha | Cambio | Justificación |
|---|---|---|
| _(vacío al inicio)_ | | |
