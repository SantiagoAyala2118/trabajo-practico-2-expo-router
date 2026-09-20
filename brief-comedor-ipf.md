# 0. METODOLOGÍA: SPEC DRIVEN DEVELOPMENT (SDD)

Este proyecto (la app "Comedor IPF", descripta en detalle en las secciones siguientes) **no se desarrolla con un camino fijo**: se trabaja con la metodología **SDD (Spec Driven Development)**. Esto significa que:

- La **especificación es la fuente de verdad**. El código implementa la spec; no se escribe código que no esté respaldado por ella.
- Si durante el desarrollo detectás que la spec es incorrecta, ambigua o incompleta, **primero se corrige `spec.md`** (registrando el cambio al final del archivo, en una sección "Registro de cambios") y **después** se toca el código.
- El flujo es estrictamente: **Especificar → Planificar → Dividir en tareas → Implementar con verificación por tarea**.

## 0.1 Etapa previa (ANTES de manipular el proyecto)

1. **Solo lectura:** inspeccioná el proyecto existente (`package.json`, `app.json`, `tsconfig.json`, árbol de archivos). No modifiques ni elimines nada todavía.
2. **Creá exactamente estos tres archivos en la raíz del repositorio**, en este orden, antes de tocar cualquier otro archivo del proyecto:
   1. `spec.md`
   2. `plan.md`
   3. `tasks.md`
3. Al terminar de crearlos, presentame un resumen de máximo 15 líneas (qué contiene cada archivo y las dudas o supuestos que hayas tenido) y **esperá mi confirmación explícita ("aprobado") antes de ejecutar la Tarea 1.** Si tenés dudas sobre el contenido de este prompt, preguntame en este punto.

## 0.2 Contenido obligatorio de cada archivo

Los tres archivos siguen **los mismos patrones arquitectónicos y de diseño, y las mismas reglas de nomenclatura** definidos en este documento (capas, Provider/Context, Custom Hook, Guard, Composición; nombres en español, claros y descriptivos; sin `any`). Escribilos en español.

### `spec.md` (qué se construye)
Debe ser una **síntesis fiel y completa de las secciones 1 a 13 de este documento** (sin omitir ningún requisito, restricción ni regla; podés resumir la redacción, no el contenido). Organizala con estas secciones:
1. Objetivo, alcance y **fuera de alcance**.
2. Stack y restricciones técnicas (SDK 57, TypeScript estricto, `npx expo install`, versiones de imports: `expo-router/js-tabs`, `expo-router/drawer`).
3. Arquitectura por capas y árbol de carpetas (incluyendo `__tests__/`).
4. Convenciones: nomenclatura, patrones, estilo de comentarios (`// DEFENSA:`).
5. Modelo de datos (tipos e interfaces).
6. Contratos de `Pila` y `Cola` (métodos, getters, restricciones).
7. Estado global: API del Context y lógica de negocio.
8. Enrutamiento: tabla de rutas, layouts, guards, `anchor`, reglas de navegación, deep links, `typedRoutes`.
9. Pantallas: comportamiento y validaciones de cada una.
10. Tema y paleta.
11. Desafíos opcionales.
12. **Requisitos numerados con criterios de aceptación verificables**: `RF-01..RF-10` (requisitos funcionales del enunciado), `RT-xx` (técnicos), `RR-xx` (una por ruta de la tabla) y `RO-1..RO-4` (desafíos). Cada criterio debe poder verificarse con un test o, si es imposible automatizarlo (por ejemplo, comportamiento en el celular), marcarse como **"manual"**.
13. Estrategia de testing (sección 0.4).
14. README y entregables.
15. Preguntas de la defensa oral (las 6 de la sección 11).
16. Registro de cambios de la spec.

### `plan.md` (cómo se construye: paso a paso)
El plan de desarrollo de la spec, con estas fases y, por cada una: objetivo, secciones de la spec que cubre, archivos involucrados, orden de trabajo, riesgos y mitigación, y estrategia de tests:
1. Fundaciones (limpieza, configuración, tooling de tests, tema).
2. Dominio (estructuras de datos y datos estáticos).
3. Estado global (Context).
4. Presentación (componentes reutilizables).
5. Esqueleto de enrutamiento (layouts reales y rutas provisorias).
6. Pantallas por flujo (exploración, buscador y ayuda, carrito y confirmación, sesión y cocina).
7. Desafíos opcionales (integrados en las fases anteriores, ver la asignación en tasks).
8. Documentación y verificación final.

Incluí además: dependencias entre fases, riesgos técnicos identificados (por ejemplo APIs de SDK 57 a verificar en la documentación, mocks de Reanimated/Gesture Handler en Jest, generación de tipos de `typedRoutes`, uso de `renderRouter`) y el registro de decisiones técnicas.

### `tasks.md` (qué se hace, en qué orden)
**Máximo 10 tareas atómicas** (una sola preocupación por tarea, verificable de forma independiente). Usá **exactamente** esta división:

| N° | Tarea |
| :-- | :-- |
| T1 | Base del proyecto, tema y tooling de tests (Fase 0 pasos 2 a 5, `src/tema`, Jest) |
| T2 | Estructuras de datos (`Pila`, `Cola`) y datos estáticos (`platos`, `ayuda`, `configuracion`) |
| T3 | Estado global (`ComedorContext` + `useComedor`) |
| T4 | Componentes reutilizables (incluye `DondeEstoy` y `TituloConContadorDePila`, desafío 1) |
| T5 | Esqueleto de enrutamiento: todos los layouts reales (Stack raíz, Tabs, Stacks anidados, Drawer, guards, anchor) y **todas** las rutas de la tabla como pantallas provisorias |
| T6 | Inicio, Menú, Detalle de plato, Categorías y 404 real |
| T7 | Buscador y Ayuda (catch-all) |
| T8 | Carrito, Nota, Confirmar, Turno y `/pedido` (incluye desafíos 3 y 4) |
| T9 | Login, Cocina, Atendidos, cierre de sesión y tab protegida (desafío 2) |
| T10 | README y verificación final integral |

Cada tarea en `tasks.md` debe tener estos campos: **ID, título, objetivo, requisitos de la spec que cubre (IDs), archivos a crear/modificar, tests a escribir (archivo y qué verifican), criterios de terminación (Definition of Done), estado (`[ ]` pendiente, `[~]` en curso, `[x]` terminada) y "Evidencia de verificación"** (se completa al terminar: comandos ejecutados y resultado real).

Las pantallas provisorias de T5 se marcan con el comentario `// STUB(Tarea N)` y **deben reemplazarse por la implementación real** en la tarea indicada. T10 verifica que no quede ningún `STUB`.

## 0.3 Regla de oro: NO SE AVANZA SIN VERIFICAR

> **Está PROHIBIDO empezar la Tarea N+1 si la Tarea N no superó su Puerta de Verificación completa.** No alcanza con "creo que funciona": hay que **ejecutar los comandos y ver el resultado real**. Nunca declares una tarea como terminada sin evidencia.

### Ciclo obligatorio por tarea

1. **Marcar** la tarea como en curso (`[~]`) en `tasks.md`. Solo puede haber **una** tarea en curso.
2. **Derivar los tests** de los criterios de aceptación de la spec y escribirlos como parte de la tarea. Para estructuras y contexto, escribí los tests **antes** de implementar y comprobá que fallen (rojo); después implementá hasta que pasen (verde).
3. **Implementar solo lo que pide esa tarea** (nada de adelantar trabajo de tareas posteriores, salvo lo estrictamente necesario).
4. **Ejecutar la Puerta de Verificación** (todos los puntos deben cumplirse):
   1. **Tests nuevos** de la tarea: todos en verde.
   2. **Suite completa** (`npx jest`, es decir los tests de todas las tareas anteriores más los nuevos): todo en verde (así se detecta regresión).
   3. **`npx tsc --noEmit`**: 0 errores (esto incluye los `href` tipados).
   4. **Lint** (`npx expo lint`, si está configurado): 0 errores.
   5. **Definition of Done** de la tarea cumplida y cada criterio de aceptación de la spec asociado cubierto por al menos un test (o marcado "manual").
5. **Si todo está en verde:** marcá la tarea como `[x]`, completá su "Evidencia de verificación" (comandos ejecutados, cantidad de tests pasados, resultado de `tsc` y lint) y dame un mini-resumen de máximo 5 líneas. Recién entonces pasás a la siguiente tarea.
6. **Si algo falla: NO AVANCES.** Entrá al ciclo *diagnosticar → corregir → volver a ejecutar la Puerta COMPLETA* (no solo el test que falló). Analizá la causa raíz e indicá si el error está en el código, en el test o en la spec:
   - Error en el código: corregí el código.
   - El test contradice la spec: corregí el test y dejá anotada la justificación en `tasks.md`.
   - La spec es incorrecta o ambigua: corregí primero `spec.md` (con registro de cambios) y luego el código y los tests.
7. **Prohibido para "hacer pasar" los tests:** usar `.skip`, `.only`, `xit`, `xdescribe`; borrar o comentar tests; debilitar aserciones; mockear la lógica que se está probando; silenciar errores de TypeScript (`@ts-ignore`, `any`) o de lint.
8. **Límite de intentos:** si después de **3 ciclos de corrección consecutivos** la misma falla persiste, **detenete y preguntame**, con tu diagnóstico y las hipótesis que descartaste.

## 0.4 Estrategia de testing

- **Herramientas:** Jest con el preset `jest-expo`, `@testing-library/react-native` y `expo-router/testing-library` (`renderRouter`) para probar el enrutamiento. Instalá con `npx expo install` (por ejemplo `npx expo install jest-expo jest @types/jest @testing-library/react-native --dev`; verificá la sintaxis exacta en https://docs.expo.dev/develop/unit-testing/). Agregá el script `"test": "jest"`.
- **Ubicación:** carpeta `__tests__/` en la **raíz** del proyecto, replicando la estructura de `src/` (por ejemplo `__tests__/estructuras/Pila.test.ts`). **NUNCA dentro de `src/app`**, porque Expo Router lo interpretaría como rutas. La configuración va en `jest.config.js` y `jest.setup.ts` (raíz).
- **Mocks:** si Reanimated o Gesture Handler requieren mocks para correr en Jest, configuralos en `jest.setup.ts`. No mockees la lógica propia del proyecto.
- **Niveles de test:**
  - **Unitarios:** `Pila`, `Cola` (incluyendo que `Cola` no use `shift()` y que el orden se mantenga tras muchas operaciones y compactaciones), funciones de `platos.ts`, artículos de ayuda.
  - **Lógica de estado:** el Context con `renderHook` y el Provider como wrapper (agregar, deshacer, confirmar, atender, sesión, `buscarTurno`).
  - **Componentes:** render, props y estados deshabilitados.
  - **Integración de rutas:** con `renderRouter` apuntando al directorio real `src/app` (verificá la sintaxis en la documentación). Comprobá pathname, segmentos, parámetros, pantallas mostradas, guards, redirecciones, 404 y que `replace`/`setParams` no apilen pantallas.
  - Si `renderRouter` no fuera viable en SDK 57, decime por qué y proponé una alternativa **antes** de continuar.
- Lo que no se pueda automatizar (gestos del Drawer, apariencia real en el celular, deep link en Expo Go) se marca como **"manual"** en la spec y lo listás al final para que yo lo pruebe.

---

# ROL Y OBJETIVO

Actuá como Desarrollador Senior y Arquitecto de Software especializado en React Native, Expo Router y TypeScript.

Vas a desarrollar la app **"Comedor IPF"**, un trabajo práctico del Instituto Politécnico Formosa (Taller Complementario React Native II, TP N° 2, Expo Router SDK 57). La app permite que los alumnos pidan comida desde el celular y que la cocina atienda los pedidos en orden de llegada. Combina una **Cola** (pedidos) y una **Pila** (deshacer en el carrito).

El proyecto Expo **ya está creado** por mí. Tu trabajo es modificarlo, no crear uno nuevo.

El código se va a **defender oralmente**. Debe ser claro, limpio, eficiente y estar comentado para que yo pueda explicar cada decisión (sobre todo el enrutamiento).

---

# 1. REGLAS DE TRABAJO (leer antes de tocar nada)

1. **Alcance exacto:** implementá todo lo pedido en este documento, ni más ni menos. Queda fuera de alcance: backend o API real, persistencia (AsyncStorage, etc.), librerías de UI o animaciones extra, internacionalización, pantallas o rutas que no estén listadas acá (la única excepción está justificada en la sección 10, desafío 2). Los únicos tests son los definidos en la sección 0.4.
2. **Idioma:** nombres de variables, funciones, tipos, archivos y comentarios en **español**, claros y descriptivos (ejemplo: `agregarAlCarrito`, `pedidosEnEspera`, `hayUsuario`). Nada de abreviaturas crípticas.
3. **Paquetes:** instalar SOLO con `npx expo install <paquete>`. Nunca `npm install`. Antes de instalar algo, revisá `package.json`: si ya está, no lo reinstales.
4. **Documentación:** si tenés dudas sobre una API de Expo Router SDK 57 (`Tabs.Protected`, `Stack.Protected`, `Link` con `dismissTo`, `typedRoutes`, `sheetAllowedDetents`, `expo-router/js-tabs`, `expo-router/drawer`, `expo-router/testing-library`), verificá en https://docs.expo.dev/router/introduction antes de escribir código. No inventes APIs.
5. **Si algo del proyecto no coincide con lo esperado** (otra versión de SDK, no es TypeScript, estructura distinta) o **si algo de este prompt es ambiguo o imposible, frená y preguntame.** No improvises en silencio.
6. **No borres nada que yo haya creado** (por ejemplo `RESPUESTAS.md`). Solo eliminá archivos de la plantilla de Expo que sobren (ver sección 2).
7. **TypeScript estricto:** sin `any`, sin `// @ts-ignore`. Tipos e interfaces explícitos para los modelos.
8. **Metodología:** todo el trabajo sigue la sección 0 (SDD). No avances de tarea sin superar la Puerta de Verificación.

---

# 2. FASE 0 - INSPECCIÓN Y LIMPIEZA

El paso 1 (inspección, solo lectura) se hace **antes de crear los archivos SDD** (sección 0.1). Los pasos 2 a 5 se ejecutan **dentro de la Tarea 1**, después de mi aprobación.

1. Leé `package.json`, `app.json`, `tsconfig.json` y el árbol de archivos actual. Confirmá: Expo SDK 57, TypeScript, `"main": "expo-router/entry"`.
2. Si la carpeta `app` está en la raíz y no en `src/app`, moveé el contenido a `src/app` (Expo Router lo detecta automáticamente).
3. Eliminá los restos de la plantilla que no se usan (pantallas de ejemplo como `explore`, `modal` de ejemplo, componentes y hooks temáticos de ejemplo, assets sin uso). Listame qué eliminaste al final.
4. Configurá `app.json`:
   - `"scheme": "comedoripf"`
   - Rutas tipadas activas (`typedRoutes`; verificá en la documentación de SDK 57 en qué clave va).
   - `"userInterfaceStyle": "dark"`.
5. Verificá (o instalá con `npx expo install`) las dependencias: `react-native-gesture-handler`, `react-native-reanimated` (el Drawer las necesita; si la versión instalada requiere `react-native-worklets`, seguí la documentación) y `@expo/vector-icons`.

---

# 3. ARQUITECTURA

Principio: **separación de responsabilidades en capas**, cada una sin conocer a las de arriba.

| Capa | Carpeta | Responsabilidad |
| :-- | :-- | :-- |
| Estructuras puras | `src/estructuras` | `Pila` y `Cola`. TypeScript puro, sin React. |
| Datos | `src/data` | Platos, categorías, artículos de ayuda, constantes. |
| Estado global | `src/context` | Un Context + Provider + hook `useComedor`. |
| Presentación | `src/components` | Componentes reutilizables sin lógica de negocio. |
| Rutas | `src/app` | **Solo** archivos de ruta y layouts. Ningún componente reutilizable acá. |
| Tema | `src/tema` | Colores, espaciado y radios. |
| Tests | `__tests__` (raíz) | Tests unitarios, de estado, de componentes y de rutas. **Nunca dentro de `src/app`.** |

Patrones a aplicar (mencionalos en comentarios donde corresponda): **Provider/Context** para el estado global, **Custom Hook** (`useComedor`), **Guard** (`Stack.Protected`), **Composición** (componentes chicos y reutilizables), **Inmutabilidad de estado en React** (snapshots, ver sección 6).

## Árbol de archivos obligatorio

```
spec.md                                # SDD (seccion 0)
plan.md                                # SDD (seccion 0)
tasks.md                               # SDD (seccion 0)
jest.config.js
jest.setup.ts
__tests__/                             # replica la estructura de src/ (NUNCA dentro de src/app)
src/
├── app/
│   ├── _layout.tsx                    # Stack RAIZ + GestureHandlerRootView + Provider + Stack.Protected + anchor
│   ├── +not-found.tsx                 # 404
│   ├── pedido.tsx                     # <Redirect href="/carrito" />
│   ├── buscar.tsx                     # /buscar?q=&categoria=
│   ├── confirmar.tsx                  # modal
│   ├── login.tsx                      # modal, solo existe sin sesion
│   ├── (tabs)/
│   │   ├── _layout.tsx                # Tabs (expo-router/js-tabs)
│   │   ├── index.tsx                  # /  (tab Inicio)
│   │   ├── acceso-cocina.tsx          # SOLO para el desafio Tabs.Protected (ver seccion 10)
│   │   ├── menu/
│   │   │   ├── _layout.tsx            # Stack propio de la tab Menu
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

Las URLs deben ser **exactamente** las de la sección 7.5. Ninguna ruta extra, salvo `acceso-cocina.tsx` (desafío opcional).

---

# 4. ESTRUCTURAS DE DATOS (`src/estructuras`)

Implementá dos clases genéricas (`Pila<T>`, `Cola<T>`) con **campos privados reales de JavaScript (`#`)**, no `_`.

**`Pila<T>`** (LIFO)
- `push(elemento)`, `pop()`, `tope()`, getter `vacia`, getter `tamanio`, `aArray()` (devuelve una **copia**, de la base al tope).
- Usa `array.push` / `array.pop` sobre `#items`.

**`Cola<T>`** (FIFO), **prohibido usar `shift()`**
- `encolar(elemento)`, `desencolar()`, `frente()`, getter `vacia`, getter `tamanio`, `aArray()` (copia, del frente al final).
- Técnica: guardar un campo privado con el **índice del frente** (`#indiceFrente`). Desencolar devuelve `#items[#indiceFrente]`, libera esa posición (asignar `undefined`) y avanza el índice, sin reindexar los demás elementos (O(1)). Para no acumular memoria, compactá el arreglo con `slice` cuando el índice del frente supere la mitad del largo (compactación amortizada). Explicalo en comentarios.
- Si en el repositorio existe `RESPUESTAS.md` con mi versión de `ColaEficiente` (A5), usala como base conceptual (misma idea del índice del frente), pero implementala **sin capacidad fija** (los pedidos no pueden rechazarse por falta de lugar), con `#` correctamente usado en todos los accesos y con `frente()` incluido.

Comentarios de defensa obligatorios en ambas clases: qué significa LIFO/FIFO, para qué sirve `#`, por qué `aArray()` devuelve una copia (no exponer el estado interno), y por qué la cola no usa `shift()`.

---

# 5. DATOS (`src/data`)

**`platos.ts`**
- `CATEGORIAS = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'] as const` y el tipo `Categoria` derivado.
- Interfaz `Plato { id: number; nombre: string; precio: number; descripcion: string; categoria: Categoria }`. El `id` es **numérico** (esto es clave: los parámetros de URL llegan como texto, hay que convertirlos con `Number()` antes de comparar).
- **Mínimo 12 platos** repartidos en las 4 categorías (al menos 2 por categoría), con precios realistas en pesos argentinos y descripciones cortas.
- Funciones auxiliares: `buscarPlatoPorId(id: number)`, `esCategoriaValida(valor: string): valor is Categoria`, y una función que agrupe platos por categoría.
- Nombres de categoría para mostrar (ejemplo: "Desayuno").

**`ayuda.ts`**
- Artículos de ayuda de **profundidad variable**, indexados por ruta (por ejemplo `"pagos/efectivo"`, `"pagos/tarjeta"`, `"horarios"`, `"pedidos/turnos"`). Cada artículo con título y contenido breve. El índice `/ayuda` los lista como links.

**`configuracion.ts`**
- Credenciales fijas de cocina: usuario `cocina`, clave `1234` (constantes con nombre).
- `MINUTOS_POR_PEDIDO = 3`.

---

# 6. ESTADO GLOBAL (`src/context/ComedorContext.tsx`)

Un único Context, con un `ComedorProvider` colocado en el layout raíz y un hook `useComedor()` que lance un error claro si se usa fuera del Provider.

**Tipos:** `ItemCarrito { idItem: number; plato: Plato }`, `AccionCarrito { tipo: 'AGREGAR_PLATO'; idItem: number }`, `Pedido { numero: number; items: ItemCarrito[]; nota: string; total: number }`.

**Estado que vive en el Context**
- Sesión: usuario actual (`string | null`).
- Carrito: ítems, nota.
- `Pila<AccionCarrito>` para deshacer.
- `Cola<Pedido>` de pedidos en espera.
- `Pila<Pedido>` de pedidos atendidos.
- Contador correlativo de turnos (empieza en 1).

**Patrón para que React se entere de los cambios (importante):** las instancias de `Pila` y `Cola` son mutables. Guardalas en `useRef` (estables entre renders) y, después de **cada** operación que las modifique, actualizá un `useState` con **copias** obtenidas con `aArray()`. La interfaz solo lee esos snapshots. Comentá por qué (mutar una clase no dispara re-render).

**API expuesta (nombres en español)**
- Sesión: `usuario`, `hayUsuario`, `iniciarSesion(usuario, clave): boolean`, `cerrarSesion()`.
- Carrito: `itemsCarrito`, `totalCarrito`, `cantidadItems`, `nota`, `guardarNota(texto)`, `agregarAlCarrito(plato)`, `deshacerUltimo()`, `puedeDeshacer` (derivado de `pilaDeshacer.tamanio > 0`).
- Pedidos: `confirmarPedido(): Pedido`, `pedidosEnEspera`, `pedidoEnFrente` (usa `frente()`), `cantidadEnEspera` (usa `tamanio`), `atenderSiguiente()`, `pedidosAtendidos` (ordenados del tope a la base, es decir el último atendido primero), `buscarTurno(numero)` que devuelva el estado del turno: `{ estado: 'en-espera'; pedidosAdelante: number } | { estado: 'atendido' } | { estado: 'inexistente' }`.

**Lógica de negocio**
- `agregarAlCarrito`: crea un `ItemCarrito` con `idItem` único, lo agrega al carrito y hace `push` de la acción en la pila de deshacer.
- `deshacerUltimo`: `pop` de la pila y quita del carrito el ítem con ese `idItem`. No hace nada si la pila está vacía.
- `confirmarPedido`: asigna el número de turno correlativo, arma el `Pedido` (con total y nota), lo **encola**, vacía el carrito, la nota y la pila de deshacer (reemplazando la instancia por una nueva `Pila`), y devuelve el pedido.
- `atenderSiguiente`: `desencolar()` de la cola y `push` a la pila de atendidos. Nadie puede colarse: la única forma de entrar es `encolar` (al final) y de salir `desencolar` (por el frente).
- `iniciarSesion`: compara contra las constantes de `configuracion.ts`.
- Eficiencia: `useCallback` para las funciones, `useMemo` para el `value` del Context y para los valores derivados.

---

# 6.1 TEMA Y ESTILOS (`src/tema/colores.ts`)

Paleta institucional (tema oscuro verde). **No escribas colores hexadecimales sueltos en ningún otro archivo**: todo sale de `colores.ts` con nombres semánticos.

| Nombre | Hex | Uso |
| :-- | :-- | :-- |
| `fondo` | `#051F20` | Fondo de pantallas, headers |
| `superficie` | `#0B2B26` | Tarjetas, tab bar, drawer, modales |
| `borde` | `#163832` | Bordes, separadores, botones deshabilitados |
| `primario` | `#235347` | Botones primarios, elementos activos |
| `acento` | `#8EB69B` | CTA destacados, íconos, textos secundarios |
| `textoClaro` | `#DAF1DE` | Texto principal sobre fondos oscuros |
| `negro` | `#000000` | Texto sobre fondos claros (`acento` / `textoClaro`), sombras |

Reglas: texto principal `textoClaro` sobre `fondo`/`superficie`; botones CTA con fondo `acento` y texto `negro`; botones primarios con fondo `primario` y texto `textoClaro`; tab bar con fondo `superficie`, ícono activo `textoClaro` e inactivo `acento`. Verificá que el contraste sea legible.

Además en `src/tema`: constantes de espaciado y radios de borde. Usá `StyleSheet.create`. Fuente del sistema (no instales fuentes). `StatusBar` en estilo claro.

---

# 7. ENRUTAMIENTO (LO MÁS IMPORTANTE)

## 7.1 Layout raíz: `src/app/_layout.tsx` (Stack raíz)

- `export const unstable_settings = { anchor: '(tabs)' }`. Comentá: garantiza que un deep link como `/categorias/bebidas` deje las pestañas **debajo** en la pila, así "atrás" lleva a las tabs y no saca al usuario de la app.
- Estructura: `GestureHandlerRootView` (con `flex: 1`, necesario para los gestos del Drawer) > `ComedorProvider` > componente `NavegacionRaiz` (adentro del Provider, porque necesita `useComedor`).
- `NavegacionRaiz` renderiza un `<Stack>` con:
  - `(tabs)`: `headerShown: false` (las tabs y sus stacks ya tienen sus headers).
  - `categorias/[categoria]`, `buscar`, `turno/[numero]`, `ayuda/index`, `ayuda/[...slug]`: pantallas normales, con títulos.
  - `confirmar`: `presentation: 'modal'`.
  - `<Stack.Protected guard={hayUsuario}>` con la pantalla `cocina` (`headerShown: false`, porque el Drawer tiene su propio header).
  - `<Stack.Protected guard={!hayUsuario}>` con `login` (`presentation: 'modal'`).
- Comentarios de defensa: qué hace un guard `false` (la pantalla deja de existir, incluso para deep links, y sale del historial), por qué el login se cierra solo al iniciar sesión (su guard pasa a `false`, el Stack lo quita sin `router.back()`), y por qué al cerrar sesión desde `/cocina/atendidos` la sección desaparece sola de la pila.

## 7.2 Tabs: `src/app/(tabs)/_layout.tsx`

- `import { Tabs } from 'expo-router/js-tabs'` (en SDK 57 ya no se importa de `expo-router`). Comentá esto.
- Tres tabs: `index` ("Inicio"), `menu` ("Menú"), `carrito` ("Carrito"), con íconos de `@expo/vector-icons` (Ionicons).
- `menu` y `carrito` con `headerShown: false` (cada una tiene su propio Stack con header; evita headers duplicados). `index` puede usar el header de Tabs.
- Badge en la tab Carrito: `tabBarBadge` con `cantidadItems` (sin badge si es 0).
- La carpeta `(tabs)` es un **grupo**: no aparece en la URL (`/` y no `/(tabs)/`). Comentalo.

## 7.3 Stacks dentro de las tabs

- `(tabs)/menu/_layout.tsx`: `<Stack>` con `index` ("Menú") y `[id]`. `unstable_settings = { anchor: 'index' }` para que un deep link a `/menu/7` deje `/menu` debajo.
- `(tabs)/carrito/_layout.tsx`: `<Stack>` con `index` ("Carrito") y `nota` (ver desafío 3 para su presentación). También con `anchor: 'index'`.
- Comentá **por qué cada tab tiene su propia pila**: `/menu/[id]` dentro de la tab Menú mantiene visible la barra de pestañas, mientras que `/categorias/[categoria]` (Stack raíz) la tapa. Y que si el usuario abre un detalle, cambia de tab y vuelve, ve el mismo detalle (cada tab conserva su pila).

## 7.4 Drawer: `src/app/cocina/_layout.tsx`

- `import { Drawer } from 'expo-router/drawer'` (SDK 57: no instalar `@react-navigation/drawer`).
- Dos pantallas: `index` ("Cocina") y `atendidos` ("Atendidos").
- `BotonCerrarSesion` en el header (por ejemplo `headerRight`). Solo llama a `cerrarSesion()`. **No llama a `router.back()` ni a `router.replace()`**: el guard del Stack raíz se encarga. Comentalo.
- Colores del Drawer según la paleta.

## 7.5 Tabla de rutas (deben responder EXACTAMENTE a estas URLs)

| URL | Archivo | Navegador / detalle |
| :-- | :-- | :-- |
| `/` | `(tabs)/index.tsx` | Tab "Inicio" |
| `/menu` | `(tabs)/menu/index.tsx` | Tab "Menú" con Stack propio |
| `/menu/[id]` | `(tabs)/menu/[id].tsx` | Dentro de la tab Menú (barra visible). Título del header = nombre del plato |
| `/categorias/[categoria]` | `categorias/[categoria].tsx` | Stack raíz |
| `/buscar?q=&categoria=` | `buscar.tsx` | Stack raíz |
| `/carrito` | `(tabs)/carrito/index.tsx` | Tab "Carrito" con Stack propio, con badge |
| `/carrito/nota` | `(tabs)/carrito/nota.tsx` | Dentro de la tab Carrito |
| `/confirmar` | `confirmar.tsx` | Stack raíz, `presentation: 'modal'` |
| `/turno/[numero]` | `turno/[numero].tsx` | Stack raíz |
| `/login` | `login.tsx` | Modal, `Stack.Protected` (solo sin sesión) |
| `/cocina` | `cocina/index.tsx` | Drawer, `Stack.Protected` (solo con sesión) |
| `/cocina/atendidos` | `cocina/atendidos.tsx` | Misma sección del Drawer |
| `/ayuda` y `/ayuda/...` | `ayuda/index.tsx` + `ayuda/[...slug].tsx` | Índice + catch-all |
| `/pedido` | `pedido.tsx` | `<Redirect href="/carrito" />` |
| cualquier otra | `+not-found.tsx` | Pantalla 404 que muestra la URL inexistente |

## 7.6 Reglas de navegación (aplicar y comentar)

1. **`<Link>` cuando el usuario toca algo** (tarjetas de plato, cards de inicio, "Agregar nota", "Confirmar pedido" que abre el modal). **`router` cuando se navega después de una lógica** (después de confirmar el pedido, al guardar la nota).
2. **Confirmar pedido:** en `/confirmar`, al presionar "Confirmar": `const pedido = confirmarPedido(); router.replace({ pathname: '/turno/[numero]', params: { numero: pedido.numero } })`. Usá **`replace`**, no `push`. Comentá por qué: con `push`, la pantalla de confirmación quedaría en la pila y al tocar "atrás" el usuario volvería a ella (pudiendo confirmar dos veces el mismo pedido). Con `replace`, la confirmación desaparece del historial.
3. **hrefs tipados (typedRoutes):** rutas estáticas con string (`href="/carrito"`); rutas dinámicas con **objeto** (`{ pathname: '/menu/[id]', params: { id: plato.id } }`). Ningún `href` puede tener errores de TypeScript.
4. **Link con `asChild` + `Pressable`:** nunca pases un array de estilos al hijo (error "You are passing an array of styles to a child of <Slot>"). Aplaná con `StyleSheet.flatten` o usá un único objeto/función de estilo. Comentá esto donde ocurra.
5. **Parámetros llegan como texto:** validar siempre (ver sección 8).
6. **No navegar a rutas protegidas sin sesión:** el card "Cocina" de Inicio va a `/login` si no hay sesión y a `/cocina` si la hay (evita el aviso "The action 'NAVIGATE' was not handled by any navigator").
7. **Cola de acciones de navegación:** Expo Router procesa las acciones de navegación en orden FIFO. Dejá un comentario de defensa en la pantalla de detalle explicando qué pasa si el usuario toca "Agregar al carrito" y enseguida el link al carrito.

---

# 8. PANTALLAS (comportamiento detallado)

**Todas las pantallas** terminan con `<DondeEstoy />` (ver sección 9). En pantallas con `FlatList`/`SectionList`, va en `ListFooterComponent`. **Nunca** anidar una lista vertical dentro de un `ScrollView`. Las demás usan el componente `Pantalla`.

- **`/` Inicio:** saludo y 4 tarjetas de acceso rápido: Menú (`/menu`), Buscar (`/buscar`), Ayuda (`/ayuda`), Cocina (`/login` sin sesión, `/cocina` con sesión).
- **`/menu`:** `SectionList` con los platos agrupados por categoría. Cada plato es un `<Link>` a `/menu/[id]` (usar `TarjetaPlato`). Cada encabezado de sección tiene un link "Ver categoría" a `/categorias/[categoria]`.
- **`/menu/[id]`:** `useLocalSearchParams<{ id: string }>()`, convertir con `Number(id)`, buscar el plato. Si no existe (o es `NaN`), mostrar mensaje claro (`MensajeEstado`). Si existe: nombre, precio, descripción, botón "Agregar al carrito" (llama `agregarAlCarrito`, con un breve mensaje de confirmación en pantalla, sin navegar). Título del header = nombre del plato mediante `<Stack.Screen options={{ title: plato.nombre }} />` dentro de la propia pantalla.
- **`/categorias/[categoria]`:** validar con `esCategoriaValida`. Si es inválida, mensaje claro. Si es válida, lista de platos de esa categoría (links a `/menu/[id]`).
- **`/buscar?q=&categoria=`:** lee `q` y `categoria` con `useLocalSearchParams`. Un `TextInput` y chips de categoría (Todas + las 4). Al escribir o elegir un chip, actualiza la URL con `router.setParams(...)`, **nunca `push`** (no apila pantallas y la búsqueda se puede compartir por link). Para que el cursor no salte, mantené un estado local del input sincronizado con el parámetro. Filtrado por texto (sin distinguir mayúsculas ni acentos) y por categoría, con `useMemo`. Una `categoria` inválida se ignora. Resultados con links a `/menu/[id]`.
- **`/carrito`:** lista de ítems, total, `Link` "Agregar nota" (a `/carrito/nota`), botón "Deshacer último" (**deshabilitado si `puedeDeshacer` es falso**), botón "Confirmar pedido" (`Link` a `/confirmar`, deshabilitado con carrito vacío). Mensaje de carrito vacío.
- **`/carrito/nota`:** `TextInput` multilínea con la aclaración para la cocina ("sin sal", etc.) y botón "Guardar" (guarda con `guardarNota` y cierra con `router.back()`).
- **`/confirmar` (modal):** resumen del pedido (ítems, nota, total). Botón "Confirmar" (flujo de la sección 7.6, punto 2) y botón "Cancelar" que cierra el modal (`router.back()` o `Link` con `dismissTo`; verificá la API). Si el carrito está vacío (por ejemplo, por deep link), mostrar mensaje y no permitir confirmar.
- **`/turno/[numero]`:** `Number(numero)` y `buscarTurno`. Estados: en espera (número de turno, cuántos pedidos hay adelante y tiempo estimado, ver desafío 4), ya atendido, o inexistente/inválido (mensaje).
- **`/login` (modal):** usuario y clave. Si son válidos llama a `iniciarSesion` y **no navega**: el guard cierra el modal solo. Si no, mensaje de error.
- **`/cocina`:** `TarjetaPedido` con el pedido del frente (`pedidoEnFrente`), cantidad de pedidos en espera y botón "Atender siguiente" (`atenderSiguiente`, deshabilitado si la cola está vacía). Mensaje si no hay pedidos.
- **`/cocina/atendidos`:** lista de `pedidosAtendidos`, del más reciente al más antiguo (tope a base de la pila).
- **`/ayuda`:** índice con links a los artículos de `ayuda.ts`.
- **`/ayuda/[...slug]`:** `useLocalSearchParams<{ slug: string[] }>()`. El `slug` es un **arreglo** con todos los segmentos (`['pagos','efectivo']`). Unirlo con `/` y buscar el artículo. Si no existe, mensaje claro. Comentá qué valor toma `slug` con 1, 2 o 3 segmentos.
- **`/pedido`:** solo `<Redirect href="/carrito" />`. Comentá por qué `Redirect` equivale a `replace` y no a `push` (evita un bucle al volver atrás).
- **`+not-found`:** muestra la URL que no existe (`usePathname()`), y un `Link` a `/` para volver.

---

# 9. COMPONENTES (`src/components`)

- **`DondeEstoy.tsx`:** muestra `usePathname()`, `useSegments()` y `useLocalSearchParams()` en un recuadro. Se oculta con una constante `DEBUG` exportada en el mismo archivo. Comentá qué devuelve cada hook.
- **`Pantalla.tsx`:** contenedor con fondo, `ScrollView` y `DondeEstoy` al final.
- **`BotonPrimario.tsx`:** `Pressable` con variantes (`primario`, `acento`), estado deshabilitado, sin arrays de estilo (para que funcione con `Link asChild`).
- **`TarjetaPlato.tsx`:** presentacional, envuelta en `React.memo`.
- **`TarjetaPedido.tsx`:** muestra número, ítems, nota y total.
- **`MensajeEstado.tsx`:** mensajes de vacío o error (parámetro inválido, plato inexistente, etc.).
- **`BotonCerrarSesion.tsx`:** solo llama a `cerrarSesion()`.
- **`TituloConContadorDePila.tsx`:** ver desafío 1.

Eficiencia: `FlatList`/`SectionList` con `keyExtractor`, `React.memo` donde corresponda, `useCallback`/`useMemo` sin abusar. No optimices de más ni compliques el código.

---

# 10. DESAFÍOS OPCIONALES (incluirlos)

Se integran en las tareas de la sección 0.2 (cada uno con sus tests): el desafío 1 en T4 (componente) y su uso en T6, T7 y T8; el desafío 2 en T9; los desafíos 3 y 4 en T8.

1. **Contador de pila:** el componente `TituloConContadorDePila` usa `useNavigation().getState().routes.length` y renderiza un `<Stack.Screen options={{ title: ... }} />` con el formato `"<título> (pila: N)"`. Usalo en `/menu/[id]` (título = nombre del plato + contador), `/categorias/[categoria]`, `/turno/[numero]`, `/carrito/nota` y `/buscar`. Comentá que `getState()` devuelve el estado del navegador dueño de la pantalla (su pila) y que se lee al renderizar.
2. **Tab protegida:** con `Tabs.Protected guard={hayUsuario}`, una cuarta pestaña "Cocina" que solo existe con sesión. Como `/cocina` vive en el Stack raíz (protegido con `Stack.Protected`, según el enunciado), la pestaña es un **atajo**: creá `(tabs)/acceso-cocina.tsx` (única ruta extra permitida; comentá que existe solo por este desafío), cuyo cuerpo sea `<Redirect href="/cocina" />`, y en `Tabs.Screen` interceptá `tabPress` (`listeners`) con `preventDefault` y `router.push('/cocina')`. Verificá en la documentación si SDK 57 ofrece una forma más limpia y, si es así, usala.
3. **Hoja inferior:** `/carrito/nota` con `presentation: 'formSheet'` y `sheetAllowedDetents: [0.5, 0.9]` declarado en `(tabs)/carrito/_layout.tsx`.
4. **Tiempo estimado:** en `/turno/[numero]`, espera = pedidos adelante × `MINUTOS_POR_PEDIDO` (constante de `configuracion.ts`). Mostrar "aprox. X min" (si hay 0 adelante, "es tu turno / falta poco").

---

# 11. COMENTARIOS PARA LA DEFENSA ORAL

- Comentarios en español, concisos, que expliquen el **porqué** (no lo obvio). Los importantes para la defensa arrancan con el prefijo `// DEFENSA:` para poder encontrarlos rápido con búsqueda.
- Obligatorios en: `_layout.tsx` raíz (Stack, anchor, Provider, `Stack.Protected`), layout de Tabs (`js-tabs`, grupo `(tabs)`, badge), layouts de Stack anidados, layout del Drawer (`expo-router/drawer`, `GestureHandlerRootView`), cada ruta dinámica (`[id]`, `[categoria]`, `[numero]`, `[...slug]`: texto vs número, arreglo en catch-all), `setParams` vs `push`, `replace` en confirmación, `Redirect`, `+not-found`, `Link` vs `router`, `asChild` y arrays de estilo, deep links y el scheme `comedoripf`, y las clases `Pila` y `Cola`.
- Al terminar, los comentarios deben alcanzar para responder estas 6 preguntas de la defensa:
  1. Qué método se usa de `/confirmar` a `/turno/[numero]` y qué pasaría con `push`.
  2. Qué ocurre con `/cocina/atendidos` si la cocina cierra sesión y por qué no hace falta `router.back()`.
  3. Por qué "Deshacer" usa una pila y los pedidos una cola.
  4. Qué pasa con `comedoripf://menu/999` (pantalla con mensaje de plato inexistente) y con `comedoripf://no-existe` (404).
  5. En qué orden se procesan "Agregar al carrito" y el link al carrito (cola FIFO de acciones de navegación).
  6. Qué pantalla queda debajo al abrir `/categorias/bebidas` por deep link y qué configuración lo decide (`anchor: '(tabs)'`).

---

# 12. README.md (en la raíz del repositorio, se redacta en la Tarea T10)

Redactalo en español con estas secciones:
1. Descripción breve y cómo ejecutar (`npx expo start`) y cómo correr los tests (`npx jest`).
2. **Árbol de carpetas de `src/app`** con el navegador de cada `_layout` (Stack raíz, Tabs, Stack de Menú, Stack de Carrito, Drawer de Cocina).
3. Tabla de rutas (URL, archivo, navegador).
4. **Justificación de `replace` vs `push`** en el flujo de confirmación.
5. Explicación breve de cómo se usan la Cola y las Pilas en el sistema.
6. Desafíos opcionales implementados y la única ruta extra (`acceso-cocina`).
7. **Deep link de prueba para Expo Go**: `exp://<IP-DE-MI-PC>:8081/--/menu/7` (dejá el placeholder de la IP, y explicá la parte `/--/`). También la versión con el scheme propio para una build instalada: `comedoripf://menu/7`.
8. **Capturas:** secciones vacías con un comentario HTML `<!-- PEGAR CAPTURA AQUI -->` para: carrito con deshacer, turno, cocina atendiendo pedidos, login/logout y pantalla 404.

---

# 13. VERIFICACIÓN FINAL Y ENTREGA (Tarea T10)

Además de la Puerta de Verificación de cada tarea (sección 0.3), en T10 hacé la verificación integral:

1. Ejecutá la **suite completa** (`npx jest`), `npx tsc --noEmit` y `npx expo lint` (si está configurado) hasta que no haya errores ni tests fallidos. Los tipos de rutas se generan al iniciar el servidor de desarrollo; si faltan, pedime que ejecute `npx expo start` una vez.
2. Revisá que: no quede ningún comentario `STUB`, ninguna ruta esté de más, no haya hex sueltos fuera de `colores.ts`, no haya `any`, no se use `shift()` ni `npm install`, no haya tests `.skip`/`.only`, y `src/app` solo contenga rutas.
3. Verificá la **cobertura de la spec**: cada requisito (`RF`, `RT`, `RR`, `RO`) debe tener al menos un test asociado o estar marcado como "manual". Dejá esa matriz en `tasks.md`.
4. Hacé una prueba de cada flujo (con tests): agregar, deshacer (botón se deshabilita con pila vacía), confirmar (turno correlativo, "atrás" no vuelve a confirmar), cocina atendiendo en orden, historial de atendidos, login que se cierra solo, logout con la sección desapareciendo, `/pedido` redirigiendo, `/menu/999` y una URL inexistente.
5. **Entrega:** al terminar, dame un resumen con (a) archivos creados, modificados y eliminados, (b) decisiones de diseño que me convenga conocer para la defensa, (c) cualquier duda o supuesto que hayas tenido que asumir, y (d) la lista de verificaciones **"manuales"** que debo probar yo en el celular (gestos del Drawer, apariencia, deep link en Expo Go).

**Empezá por la sección 0.1: inspección en modo solo lectura, creación de `spec.md`, `plan.md` y `tasks.md`, y esperá mi aprobación antes de la Tarea 1. Si algo no coincide con lo esperado, preguntame antes de seguir.**