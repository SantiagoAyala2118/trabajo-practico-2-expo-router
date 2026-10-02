# Comedor IPF - Sistema de Pedidos y Turnos

¡Bienvenido al sistema de pedidos y turnos del Comedor IPF! Una aplicación móvil moderna desarrollada con React Native, Expo Router y TypeScript, diseñada para gestionar los pedidos de los empleados y el flujo de la cocina.

## 📦 Funcionalidades Principales

### Para el Usuario
- **Exploración del Menú**: Visualiza los platos agrupados por categorías (Desayunos, Almuerzos, Bebidas, Postres).
- **Búsqueda Avanzada**: Encuentra platos rápidamente por nombre o usando chips de categorías rápidas.
- **Detalle de Plato**: Visualiza descripciones detalladas y precios de cada opción.
- **Carrito Inteligente**: Añade platos, deshace errores al instante (pila de acciones) y agrega notas especiales para la cocina.
- **Gestión de Turnos**: Confirmación de pedido con tiempo de espera estimado en tiempo real.

### Para la Cocina
- **Acceso Protegido**: Pestaña protegida por autenticación.
- **Gestión de Pedidos en Tiempo Real**: Cola de pedidos pendientes, donde el personal puede "Atender al siguiente" en orden estricto de llegada.
- **Historial de Atendidos**: Visualización de los pedidos ya completados.

## 🛠️ Tecnologías y Estructuras de Datos

- **React Native & Expo Router**: Navegación basada en el sistema de archivos (file-based routing) con layouts anidados (Tabs, Stack, Drawer).
- **TypeScript Estricto**: 100% type-safe sin uso de `any` ni `@ts-ignore`.
- **Estructuras Clásicas**:
  - **Pila (Stack)**: Implementada para la función "Deshacer último" del carrito y para el registro de rutas recorridas.
  - **Cola (Queue)**: Implementada optimizada a O(1) para la cola de preparación de la cocina.
- **Estado Global Eficiente**: Gestión centralizada mediante Context API con snapshots (referencias mutables sincronizadas con React).

## 🚀 Cómo ejecutar el proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el entorno de desarrollo:
   ```bash
   npx expo start
   ```

3. Ejecutar los tests unitarios:
   ```bash
   npm test
   ```

## 👩‍💻 Creado para
Trabajo Práctico 2 - Instituto Politécnico Formosa
