# Tareas: Comedor IPF

---

## T1 — Base del proyecto, tema y tooling de tests

- **Estado:** `[x]` terminada
- **Objetivo:** Limpiar la plantilla de Expo, configurar el tema oscuro verde, instalar y configurar Jest y las herramientas de testing.
- **Requisitos de la spec:** RT-01, RT-04, RT-08, RT-09
- **Archivos a crear:**
  - `src/tema/colores.ts`
  - `jest.config.js`
  - `jest.setup.ts`
  - `__tests__/` (estructura base vacía)
- **Archivos a modificar:**
  - `app.json` (cambiar `userInterfaceStyle` a `"dark"`)
  - `package.json` (agregar script `"test": "jest"`)
  - `src/app/_layout.tsx` (limpiar, dejar provisorio mínimo)
- **Archivos a eliminar:**
  - `src/app/explore.tsx`
  - `src/components/animated-icon.tsx`, `animated-icon.web.tsx`, `animated-icon.module.css`
  - `src/components/app-tabs.tsx`, `app-tabs.web.tsx`
  - `src/components/external-link.tsx`, `hint-row.tsx`, `themed-text.tsx`, `themed-view.tsx`, `web-badge.tsx`
  - `src/components/ui/collapsible.tsx` (y carpeta `ui/` si queda vacía)
  - `src/constants/theme.ts` (y carpeta `constants/` si queda vacía)
  - `src/hooks/use-color-scheme.ts`, `use-color-scheme.web.ts`, `use-theme.ts` (y carpeta `hooks/` si queda vacía)
  - `src/global.css`
- **Tests a escribir:** Ninguno funcional (solo verificar que Jest corre con 0 test suites)
- **Criterios de terminación (DoD):**
  - [x] Archivos de la plantilla eliminados
  - [x] `app.json` con `userInterfaceStyle: "dark"`, `scheme: "comedoripf"`, `typedRoutes: true`
  - [x] `@expo/vector-icons` instalado (verificar)
  - [x] Dependencias de testing instaladas
  - [x] `jest.config.js` y `jest.setup.ts` creados
  - [x] `src/tema/colores.ts` con paleta completa y constantes de espaciado/radios
  - [x] `npx tsc --noEmit`: 0 errores
  - [x] `npx jest`: corre sin errores (0 tests ok)
  - [x] `npx expo lint`: 0 errores (o no configurado aún)
- **Evidencia de verificacion:**
  - `npx jest --no-cache`: 1 test suite, 1 test passed, 0 failed
  - `npx tsc --noEmit`: 0 errores (exit code 0)
  - `npx expo lint`: 0 errores (exit code 0, ESLint configurado automaticamente)
  - Archivos eliminados: explore.tsx, index.tsx (ejemplo), animated-icon (3), app-tabs (2), external-link, hint-row, themed-text, themed-view, web-badge, collapsible, theme.ts, use-color-scheme (2), use-theme, global.css
  - Archivos creados: colores.ts, jest.config.js, jest.setup.ts, __tests__/setup.test.ts
  - Archivos modificados: app.json (dark), package.json (test script), tsconfig.json (types jest), _layout.tsx (provisorio)

---

## T2 — Estructuras de datos (Pila, Cola) y datos estáticos

- **Estado:** `[x]` terminada
- **Objetivo:** Implementar `Pila<T>` y `Cola<T>` con campos privados `#` y los datos estáticos (platos, ayuda, configuración). TDD: tests primero.
- **Requisitos de la spec:** RT-02, RT-03, RF-01 (datos de platos), RF-08 (credenciales en configuración)
- **Archivos a crear:**
  - `src/estructuras/Pila.ts`
  - `src/estructuras/Cola.ts`
  - `src/data/platos.ts`
  - `src/data/ayuda.ts`
  - `src/data/configuracion.ts`
  - `__tests__/estructuras/Pila.test.ts`
  - `__tests__/estructuras/Cola.test.ts`
  - `__tests__/data/platos.test.ts`
- **Tests a escribir:**
  - `Pila.test.ts`: push/pop LIFO, tope, vacia, tamanio, aArray devuelve copia independiente, pop en pila vacía
  - `Cola.test.ts`: encolar/desencolar FIFO, frente, vacia, tamanio, aArray devuelve copia, no usa `shift()` (grep), compactación amortizada, orden correcto tras muchas operaciones, desencolar en cola vacía
  - `platos.test.ts`: buscarPlatoPorId (existente e inexistente), esCategoriaValida (válida e inválida), agrupamiento por categoría, mínimo 12 platos en 4 categorías
- **Criterios de terminación (DoD):**
  - [x] Tests escritos antes de implementar y fallan (rojo)
  - [x] Implementación completa, todos los tests pasan (verde)
  - [x] `Pila` con campos `#`, comentarios DEFENSA
  - [x] `Cola` sin `shift()`, con compactación amortizada, campos `#`, comentarios DEFENSA
  - [x] 12+ platos en 4 categorías con funciones auxiliares
  - [x] Artículos de ayuda con profundidad variable
  - [x] Credenciales y `MINUTOS_POR_PEDIDO` en configuración
  - [x] Suite completa (`npx jest`): todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificacion:**
  - `npx jest --no-cache`: 4 suites, 41 tests passed, 0 failed
  - `npx tsc --noEmit`: 0 errores (exit code 0)
  - Tests escritos antes de implementar (rojo verificado: modulo no encontrado)
  - Pila.ts: 10 tests (LIFO, tope, vacia, tamanio, aArray copia, genericos)
  - Cola.ts: 13 tests (FIFO, frente, compactacion, no-shift grep, genericos)
  - platos.test.ts: 10 tests (13 platos, 4 categorias, funciones auxiliares)
  - Archivos creados: Pila.ts, Cola.ts, platos.ts, ayuda.ts, configuracion.ts + 3 test files

---

## T3 — Estado global (ComedorContext + useComedor)

- **Estado:** `[~]` en curso
- **Objetivo:** Implementar el Context, Provider y hook con toda la lógica de negocio. TDD: tests primero.
- **Requisitos de la spec:** RF-03, RF-04, RF-05, RF-06, RF-07, RF-08, RF-09, RF-10, RT-05, RT-06
- **Archivos a crear:**
  - `src/context/ComedorContext.tsx`
  - `__tests__/context/ComedorContext.test.tsx`
- **Tests a escribir:**
  - `useComedor` lanza error fuera del Provider (RT-06)
  - Agregar al carrito: incrementa cantidadItems, totalCarrito, puedeDeshacer (RF-03)
  - Deshacer último: quita el ítem correcto, botón se deshabilita con pila vacía (RF-04)
  - Guardar nota: se refleja en el estado (RF-05)
  - Confirmar pedido: encola, vacía carrito y pila, asigna turno correlativo, devuelve pedido (RF-06)
  - Atender siguiente: desencola del frente, pushea a atendidos (RF-09)
  - Pedidos atendidos en orden correcto (RF-10)
  - Sesión: iniciar con credenciales válidas retorna true, inválidas retorna false, cerrar sesión (RF-08)
  - `buscarTurno`: estado en-espera con pedidos adelante, atendido, inexistente (RF-07)
  - Snapshots: re-render tras mutación (RT-05)
- **Criterios de terminación (DoD):**
  - [x] Tests escritos antes de implementar y fallan (rojo)
  - [x] Implementación completa, todos los tests pasan (verde)
  - [x] Patrón `useRef` + `useState` + `aArray()` para snapshots
  - [x] `useCallback` y `useMemo` aplicados correctamente
  - [x] Comentarios DEFENSA donde corresponda
  - [x] Suite completa: todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificación:** _(se completa al terminar)_

---

## T4 — Componentes reutilizables (incluye DondeEstoy, TituloConContadorDePila — desafío 1)

- **Estado:** `[ ]` pendiente
- **Objetivo:** Implementar todos los componentes de `src/components/`, incluyendo el desafío 1.
- **Requisitos de la spec:** RO-01
- **Archivos a crear:**
  - `src/components/DondeEstoy.tsx`
  - `src/components/Pantalla.tsx`
  - `src/components/BotonPrimario.tsx`
  - `src/components/TarjetaPlato.tsx`
  - `src/components/TarjetaPedido.tsx`
  - `src/components/MensajeEstado.tsx`
  - `src/components/BotonCerrarSesion.tsx`
  - `src/components/TituloConContadorDePila.tsx`
  - `__tests__/components/DondeEstoy.test.tsx`
  - `__tests__/components/BotonPrimario.test.tsx`
  - `__tests__/components/TarjetaPlato.test.tsx`
  - `__tests__/components/MensajeEstado.test.tsx`
- **Tests a escribir:**
  - `DondeEstoy`: renderiza pathname y segmentos cuando `DEBUG = true`
  - `BotonPrimario`: renderiza con variantes, estado deshabilitado aplica estilo correcto
  - `TarjetaPlato`: renderiza props del plato
  - `MensajeEstado`: renderiza mensaje
- **Criterios de terminación (DoD):**
  - [x] Todos los componentes creados según la spec
  - [x] `DondeEstoy` con constante `DEBUG` exportada
  - [x] `BotonPrimario` sin arrays de estilo (compatible con `Link asChild`)
  - [x] `TarjetaPlato` con `React.memo`
  - [x] `TituloConContadorDePila` usa `getState().routes.length`
  - [x] Tests de componentes pasan
  - [x] Suite completa: todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificación:** _(se completa al terminar)_

---

## T5 — Esqueleto de enrutamiento: layouts reales y pantallas provisorias

- **Estado:** `[ ]` pendiente
- **Objetivo:** Crear todos los layouts con la configuración real y todas las rutas de la tabla como pantallas provisorias (`// STUB(Tarea N)`).
- **Requisitos de la spec:** RR-01 a RR-16 (estructura), RT-07, RT-08, RT-10
- **Archivos a crear:**
  - `src/app/_layout.tsx` (reescribir completo)
  - `src/app/+not-found.tsx`
  - `src/app/pedido.tsx`
  - `src/app/buscar.tsx` (STUB T7)
  - `src/app/confirmar.tsx` (STUB T8)
  - `src/app/login.tsx` (STUB T9)
  - `src/app/(tabs)/_layout.tsx`
  - `src/app/(tabs)/index.tsx` (STUB T6)
  - `src/app/(tabs)/acceso-cocina.tsx` (STUB T9)
  - `src/app/(tabs)/menu/_layout.tsx`
  - `src/app/(tabs)/menu/index.tsx` (STUB T6)
  - `src/app/(tabs)/menu/[id].tsx` (STUB T6)
  - `src/app/(tabs)/carrito/_layout.tsx`
  - `src/app/(tabs)/carrito/index.tsx` (STUB T8)
  - `src/app/(tabs)/carrito/nota.tsx` (STUB T8)
  - `src/app/categorias/[categoria].tsx` (STUB T6)
  - `src/app/turno/[numero].tsx` (STUB T8)
  - `src/app/ayuda/index.tsx` (STUB T7)
  - `src/app/ayuda/[...slug].tsx` (STUB T7)
  - `src/app/cocina/_layout.tsx`
  - `src/app/cocina/index.tsx` (STUB T9)
  - `src/app/cocina/atendidos.tsx` (STUB T9)
- **Tests a escribir:**
  - `__tests__/app/enrutamiento.test.tsx`: test con `renderRouter` (si viable) verificando que las rutas principales responden correctamente, guards funcionan, 404 captura rutas inexistentes, `/pedido` redirige a `/carrito`
- **Criterios de terminación (DoD):**
  - [x] Todos los layouts creados con la configuración real (Stack raíz, Tabs, Stacks anidados, Drawer)
  - [x] Todos los archivos de ruta existen con `// STUB(Tarea N)`
  - [x] `+not-found.tsx` y `pedido.tsx` completos (no son stubs)
  - [x] Comentarios `// DEFENSA:` en todos los layouts
  - [x] `anchor` configurado en raíz y stacks anidados
  - [x] Guards con `Stack.Protected` para login y cocina
  - [x] Tests de enrutamiento pasan
  - [x] Suite completa: todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificación:** _(se completa al terminar)_

---

## T6 — Inicio, Menú, Detalle de plato, Categorías y 404 real

- **Estado:** `[ ]` pendiente
- **Objetivo:** Implementar las pantallas de exploración reemplazando los STUBs.
- **Requisitos de la spec:** RF-01, RF-02, RF-03 (botón agregar en detalle), RR-01, RR-02, RR-03, RR-04, RR-16, RO-01 (uso en `/menu/[id]` y `/categorias/[categoria]`)
- **Archivos a modificar (reemplazar STUB):**
  - `src/app/(tabs)/index.tsx`
  - `src/app/(tabs)/menu/index.tsx`
  - `src/app/(tabs)/menu/[id].tsx`
  - `src/app/categorias/[categoria].tsx`
- **Tests a escribir:**
  - `__tests__/app/inicio.test.tsx`: renderiza 4 tarjetas con links correctos
  - `__tests__/app/menu.test.tsx`: renderiza SectionList con platos agrupados
  - `__tests__/app/detallePlato.test.tsx`: id válido muestra plato, id inválido muestra mensaje
  - `__tests__/app/categorias.test.tsx`: categoría válida muestra platos, inválida muestra mensaje
- **Criterios de terminación (DoD):**
  - [x] STUBs reemplazados por implementación real
  - [x] Validación de parámetros (id numérico, categoría válida)
  - [x] `TituloConContadorDePila` usado en `/menu/[id]` y `/categorias/[categoria]`
  - [x] `SectionList` con `keyExtractor` y `ListFooterComponent`
  - [x] Navegación Card "Cocina" condicional (`/login` o `/cocina`)
  - [x] Tests pasan
  - [x] Suite completa: todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificación:** _(se completa al terminar)_

---

## T7 — Buscador y Ayuda (catch-all)

- **Estado:** `[ ]` pendiente
- **Objetivo:** Implementar el buscador con filtrado y la sección de ayuda con catch-all.
- **Requisitos de la spec:** RR-05, RR-13, RR-14, RO-01 (uso en `/buscar`)
- **Archivos a modificar (reemplazar STUB):**
  - `src/app/buscar.tsx`
  - `src/app/ayuda/index.tsx`
  - `src/app/ayuda/[...slug].tsx`
- **Tests a escribir:**
  - `__tests__/app/buscar.test.tsx`: filtra por texto sin acentos, filtra por categoría, `setParams` no apila, categoría inválida se ignora
  - `__tests__/app/ayuda.test.tsx`: índice renderiza links, slug válido muestra artículo, slug inválido muestra mensaje, slug con múltiples segmentos
- **Criterios de terminación (DoD):**
  - [x] STUBs reemplazados
  - [x] `setParams` en lugar de `push` para actualizar búsqueda
  - [x] Estado local sincronizado con parámetro (cursor no salta)
  - [x] Filtrado con `useMemo` sin mayúsculas ni acentos
  - [x] Catch-all maneja 1, 2 y 3 segmentos
  - [x] `TituloConContadorDePila` usado en `/buscar`
  - [x] Tests pasan
  - [x] Suite completa: todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificación:** _(se completa al terminar)_

---

## T8 — Carrito, Nota, Confirmar, Turno y /pedido (incluye desafíos 3 y 4)

- **Estado:** `[ ]` pendiente
- **Objetivo:** Implementar el flujo completo de pedido con hoja inferior y tiempo estimado.
- **Requisitos de la spec:** RF-03, RF-04, RF-05, RF-06, RF-07, RR-06, RR-07, RR-08, RR-09, RR-15, RO-01 (uso en `/turno/[numero]` y `/carrito/nota`), RO-03, RO-04
- **Archivos a modificar (reemplazar STUB):**
  - `src/app/(tabs)/carrito/index.tsx`
  - `src/app/(tabs)/carrito/nota.tsx`
  - `src/app/(tabs)/carrito/_layout.tsx` (agregar `sheetAllowedDetents`)
  - `src/app/confirmar.tsx`
  - `src/app/turno/[numero].tsx`
- **Tests a escribir:**
  - `__tests__/app/carrito.test.tsx`: renderiza ítems y total, botón deshacer deshabilitado con pila vacía, botón confirmar deshabilitado con carrito vacío
  - `__tests__/app/confirmar.test.tsx`: muestra resumen, impide confirmar con carrito vacío, `replace` no apila
  - `__tests__/app/turno.test.tsx`: muestra estado en-espera con tiempo estimado, atendido, inexistente
- **Criterios de terminación (DoD):**
  - [x] STUBs reemplazados
  - [x] `replace` en confirmación (no `push`)
  - [x] Hoja inferior con `presentation: 'formSheet'` y `sheetAllowedDetents` (desafío 3)
  - [x] Tiempo estimado = pedidos adelante × `MINUTOS_POR_PEDIDO` (desafío 4)
  - [x] `TituloConContadorDePila` usado en `/turno/[numero]` y `/carrito/nota`
  - [x] Carrito vacío por deep link en `/confirmar` → mensaje
  - [x] `/pedido` redirige a `/carrito`
  - [x] Tests pasan
  - [x] Suite completa: todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificación:** _(se completa al terminar)_

---

## T9 — Login, Cocina, Atendidos, cierre de sesión y tab protegida (desafío 2)

- **Estado:** `[ ]` pendiente
- **Objetivo:** Implementar la sesión, las pantallas de cocina y la tab protegida.
- **Requisitos de la spec:** RF-08, RF-09, RF-10, RR-10, RR-11, RR-12, RO-02
- **Archivos a modificar (reemplazar STUB):**
  - `src/app/login.tsx`
  - `src/app/cocina/index.tsx`
  - `src/app/cocina/atendidos.tsx`
  - `src/app/(tabs)/acceso-cocina.tsx`
  - `src/app/(tabs)/_layout.tsx` (agregar `Tabs.Protected`)
- **Tests a escribir:**
  - `__tests__/app/login.test.tsx`: login exitoso cierra modal (guard), login fallido muestra error
  - `__tests__/app/cocina.test.tsx`: muestra pedido del frente, botón atender deshabilitado si cola vacía, atendidos en orden correcto, cierre de sesión quita la sección del historial
- **Criterios de terminación (DoD):**
  - [x] STUBs reemplazados
  - [x] Login no navega manualmente (guard cierra el modal)
  - [x] `BotonCerrarSesion` solo llama a `cerrarSesion()` (no `router.back()`)
  - [x] Guard de `Stack.Protected` maneja cocina y login
  - [x] `Tabs.Protected` para pestaña "Cocina" (desafío 2)
  - [x] `acceso-cocina.tsx` con `Redirect` + interceptar `tabPress`
  - [x] Tests pasan
  - [x] Suite completa: todo en verde
  - [x] `npx tsc --noEmit`: 0 errores
- **Evidencia de verificación:** _(se completa al terminar)_

---

## T10 — README y verificación final integral

- **Estado:** `[ ]` pendiente
- **Objetivo:** Redactar el README, verificar la cobertura de la spec, verificación integral y entrega.
- **Requisitos de la spec:** Todos (verificación final)
- **Archivos a crear/modificar:**
  - `README.md` (en raíz de `comedor-ipf/`)
- **Tests a escribir:** Ninguno nuevo (verificación de la suite completa)
- **Criterios de terminación (DoD):**
  - [x] README con todas las secciones requeridas (sección 14 de la spec)
  - [x] No queda ningún `// STUB`
  - [x] No hay hex fuera de `colores.ts`
  - [x] No hay `any`, `@ts-ignore`, `.skip`, `.only`, `xit`, `xdescribe`
  - [x] No se usa `shift()` en Cola
  - [x] `src/app` solo contiene rutas
  - [x] `npx jest`: todo en verde (suite completa)
  - [x] `npx tsc --noEmit`: 0 errores
  - [x] `npx expo lint`: 0 errores
  - [x] Cobertura de la spec: cada RF, RT, RR y RO tiene al menos un test o está marcado "manual"
  - [x] Flujos verificados: agregar → deshacer → confirmar → turno → cocina atender → login/logout → `/pedido` → 404
- **Evidencia de verificación:** _(se completa al terminar)_

---

## Matriz de cobertura spec → tests

_(Se completa al final de T10)_

| Requisito | Test(s) asociado(s) | Tipo |
|---|---|---|
| RF-01 | | |
| RF-02 | | |
| RF-03 | | |
| RF-04 | | |
| RF-05 | | |
| RF-06 | | |
| RF-07 | | |
| RF-08 | | |
| RF-09 | | |
| RF-10 | | |
| RT-01 | | |
| RT-02 | | |
| RT-03 | | |
| RT-04 | | |
| RT-05 | | |
| RT-06 | | |
| RT-07 | | |
| RT-08 | | |
| RT-09 | | |
| RT-10 | | |
| RR-01 | | |
| RR-02 | | |
| RR-03 | | |
| RR-04 | | |
| RR-05 | | |
| RR-06 | | |
| RR-07 | | |
| RR-08 | | |
| RR-09 | | |
| RR-10 | | |
| RR-11 | | |
| RR-12 | | |
| RR-13 | | |
| RR-14 | | |
| RR-15 | | |
| RR-16 | | |
| RO-01 | | |
| RO-02 | | |
| RO-03 | | |
| RO-04 | | |

---

## Verificaciones manuales

_(Se completa al final de T10)_

| Verificación | Responsable | Resultado |
|---|---|---|
| Gestos del Drawer (abrir/cerrar deslizando) | Usuario | |
| Apariencia real en el celular (colores, contraste) | Usuario | |
| Deep link en Expo Go (`exp://<IP>:8081/--/menu/7`) | Usuario | |
| Deep link con scheme propio (`comedoripf://menu/7`) | Usuario | |
| Hoja inferior de nota (detents visibles) | Usuario | |
| Badge del carrito visible en la tab bar | Usuario | |
