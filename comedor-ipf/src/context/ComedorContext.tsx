// DEFENSA: Patron Provider/Context para el estado global de la app.
// Un unico Context centraliza todo el estado (carrito, pedidos, sesion).
// El ComedorProvider se coloca en el layout raiz y el hook useComedor()
// expone la API. Si se usa fuera del Provider, lanza un error claro.

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pila } from '@/estructuras/Pila';
import { Cola } from '@/estructuras/Cola';
import type { Plato } from '@/data/platos';
import { USUARIO_COCINA, CLAVE_COCINA } from '@/data/configuracion';

// ==================== TIPOS ====================

export interface ItemCarrito {
  idItem: number;    // identificador unico del item en el carrito
  plato: Plato;
}

export interface AccionCarrito {
  tipo: 'AGREGAR_PLATO';
  idItem: number;
}

export interface Pedido {
  numero: number;    // turno correlativo (empieza en 1)
  items: ItemCarrito[];
  nota: string;
  total: number;
}

export type ResultadoTurno =
  | { estado: 'en-espera'; pedidosAdelante: number }
  | { estado: 'atendido' }
  | { estado: 'inexistente' };

// ==================== INTERFAZ DEL CONTEXT ====================

interface ComedorContextAPI {
  // Sesion
  usuario: string | null;
  hayUsuario: boolean;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;

  // Carrito
  itemsCarrito: ItemCarrito[];
  totalCarrito: number;
  cantidadItems: number;
  nota: string;
  guardarNota: (texto: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;

  // Pedidos
  confirmarPedido: () => Pedido;
  pedidosEnEspera: Pedido[];
  pedidoEnFrente: Pedido | undefined;
  cantidadEnEspera: number;
  atenderSiguiente: () => void;
  pedidosAtendidos: Pedido[];
  buscarTurno: (numero: number) => ResultadoTurno;
}

// ==================== CONTEXT ====================

const ComedorContext = createContext<ComedorContextAPI | null>(null);

// DEFENSA: Custom Hook que lanza error si se usa fuera del Provider.
// Esto evita bugs silenciosos: si un componente intenta acceder al estado
// sin estar envuelto en ComedorProvider, el error es inmediato y claro.
export function useComedor(): ComedorContextAPI {
  const context = useContext(ComedorContext);
  if (context === null) {
    throw new Error('useComedor debe usarse dentro de un ComedorProvider');
  }
  return context;
}

// ==================== PROVIDER ====================

export function ComedorProvider({ children }: { children: React.ReactNode }) {
  // --- Sesion ---
  const [usuario, setUsuario] = useState<string | null>(null);
  const hayUsuario = usuario !== null;

  // --- Carrito ---
  const [itemsCarrito, setItemsCarrito] = useState<ItemCarrito[]>([]);
  const [nota, setNota] = useState<string>('');

  // DEFENSA: Patron de snapshots con useRef + useState para estructuras mutables.
  // Las instancias de Pila y Cola son mutables (llamar push/pop cambia su estado
  // interno sin que React se entere). Por eso las guardamos en useRef (estable
  // entre renders) y despues de cada operacion actualizamos un useState con
  // una COPIA obtenida con aArray(). La interfaz solo lee esos snapshots.
  // Mutar un objeto en un ref NO dispara re-render; actualizar un state SI.

  // Pila de deshacer (acciones del carrito)
  const pilaDeshacer = useRef(new Pila<AccionCarrito>());
  const [snapshotDeshacer, setSnapshotDeshacer] = useState<AccionCarrito[]>([]);

  // Cola de pedidos en espera
  const colaPedidos = useRef(new Cola<Pedido>());
  const [snapshotPedidos, setSnapshotPedidos] = useState<Pedido[]>([]);

  // Pila de pedidos atendidos
  const pilaAtendidos = useRef(new Pila<Pedido>());
  const [snapshotAtendidos, setSnapshotAtendidos] = useState<Pedido[]>([]);

  // Contador correlativo de turnos y de items
  const contadorTurnos = useRef(0);
  const contadorItems = useRef(0);

  // --- Valores derivados ---
  const totalCarrito = useMemo(
    () => itemsCarrito.reduce((sum, item) => sum + item.plato.precio, 0),
    [itemsCarrito]
  );

  const cantidadItems = itemsCarrito.length;

  const puedeDeshacer = snapshotDeshacer.length > 0;

  const pedidoEnFrente = useMemo(
    () => (snapshotPedidos.length > 0 ? snapshotPedidos[0] : undefined),
    [snapshotPedidos]
  );

  const cantidadEnEspera = snapshotPedidos.length;

  // Pedidos atendidos: del tope a la base (ultimo atendido primero)
  const pedidosAtendidos = useMemo(
    () => [...snapshotAtendidos].reverse(),
    [snapshotAtendidos]
  );

  // --- Funciones de sesion ---
  const iniciarSesion = useCallback((user: string, clave: string): boolean => {
    if (user === USUARIO_COCINA && clave === CLAVE_COCINA) {
      setUsuario(user);
      return true;
    }
    return false;
  }, []);

  const cerrarSesion = useCallback(() => {
    setUsuario(null);
  }, []);

  // --- Funciones de carrito ---
  const guardarNota = useCallback((texto: string) => {
    setNota(texto);
  }, []);

  const agregarAlCarrito = useCallback((plato: Plato) => {
    contadorItems.current += 1;
    const idItem = contadorItems.current;

    const nuevoItem: ItemCarrito = { idItem, plato };
    setItemsCarrito((prev) => [...prev, nuevoItem]);

    // Registrar la accion en la pila de deshacer
    pilaDeshacer.current.push({ tipo: 'AGREGAR_PLATO', idItem });
    setSnapshotDeshacer(pilaDeshacer.current.aArray());
  }, []);

  const deshacerUltimo = useCallback(() => {
    if (pilaDeshacer.current.vacia) return;

    const accion = pilaDeshacer.current.pop();
    setSnapshotDeshacer(pilaDeshacer.current.aArray());

    if (accion) {
      setItemsCarrito((prev) => prev.filter((item) => item.idItem !== accion.idItem));
    }
  }, []);

  // --- Funciones de pedidos ---
  const confirmarPedido = useCallback((): Pedido => {
    contadorTurnos.current += 1;

    const pedido: Pedido = {
      numero: contadorTurnos.current,
      items: [...itemsCarrito],
      nota,
      total: itemsCarrito.reduce((sum, item) => sum + item.plato.precio, 0),
    };

    // Encolar el pedido
    colaPedidos.current.encolar(pedido);
    setSnapshotPedidos(colaPedidos.current.aArray());

    // Vaciar carrito, nota y pila de deshacer
    setItemsCarrito([]);
    setNota('');
    pilaDeshacer.current = new Pila<AccionCarrito>();
    setSnapshotDeshacer([]);

    return pedido;
  }, [itemsCarrito, nota]);

  const atenderSiguiente = useCallback(() => {
    if (colaPedidos.current.vacia) return;

    const pedido = colaPedidos.current.desencolar();
    setSnapshotPedidos(colaPedidos.current.aArray());

    if (pedido) {
      pilaAtendidos.current.push(pedido);
      setSnapshotAtendidos(pilaAtendidos.current.aArray());
    }
  }, []);

  const buscarTurno = useCallback((numero: number): ResultadoTurno => {
    // Buscar en pedidos en espera
    const pedidosEspera = colaPedidos.current.aArray();
    const indiceEnEspera = pedidosEspera.findIndex((p) => p.numero === numero);
    if (indiceEnEspera !== -1) {
      return { estado: 'en-espera', pedidosAdelante: indiceEnEspera };
    }

    // Buscar en pedidos atendidos
    const atendidos = pilaAtendidos.current.aArray();
    const estaAtendido = atendidos.some((p) => p.numero === numero);
    if (estaAtendido) {
      return { estado: 'atendido' };
    }

    return { estado: 'inexistente' };
  }, []);

  // --- Valor del Context (memoizado para evitar re-renders innecesarios) ---
  const value = useMemo<ComedorContextAPI>(
    () => ({
      usuario,
      hayUsuario,
      iniciarSesion,
      cerrarSesion,
      itemsCarrito,
      totalCarrito,
      cantidadItems,
      nota,
      guardarNota,
      agregarAlCarrito,
      deshacerUltimo,
      puedeDeshacer,
      confirmarPedido,
      pedidosEnEspera: snapshotPedidos,
      pedidoEnFrente,
      cantidadEnEspera,
      atenderSiguiente,
      pedidosAtendidos,
      buscarTurno,
    }),
    [
      usuario,
      hayUsuario,
      iniciarSesion,
      cerrarSesion,
      itemsCarrito,
      totalCarrito,
      cantidadItems,
      nota,
      guardarNota,
      agregarAlCarrito,
      deshacerUltimo,
      puedeDeshacer,
      confirmarPedido,
      snapshotPedidos,
      pedidoEnFrente,
      cantidadEnEspera,
      atenderSiguiente,
      pedidosAtendidos,
      buscarTurno,
    ]
  );

  return (
    <ComedorContext.Provider value={value}>
      {children}
    </ComedorContext.Provider>
  );
}
