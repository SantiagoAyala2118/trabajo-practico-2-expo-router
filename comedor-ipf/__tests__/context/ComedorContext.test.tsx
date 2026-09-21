import { renderHook, act } from '@testing-library/react-native';
import React from 'react';
import { ComedorProvider, useComedor } from '@/context/ComedorContext';
import { PLATOS } from '@/data/platos';

// Wrapper para renderHook que incluye el Provider
function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(ComedorProvider, null, children);
}

describe('ComedorContext', () => {
  describe('useComedor fuera del Provider', () => {
    it('lanza error si se usa fuera del Provider (RT-06)', () => {
      // Suprimir el error de consola esperado
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => {
        renderHook(() => useComedor());
      }).toThrow('useComedor debe usarse dentro de un ComedorProvider');
      consoleSpy.mockRestore();
    });
  });

  describe('estado inicial', () => {
    it('comienza sin usuario', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });
      expect(result.current.usuario).toBeNull();
      expect(result.current.hayUsuario).toBe(false);
    });

    it('comienza con carrito vacio', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });
      expect(result.current.itemsCarrito).toEqual([]);
      expect(result.current.totalCarrito).toBe(0);
      expect(result.current.cantidadItems).toBe(0);
    });

    it('comienza sin poder deshacer', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });
      expect(result.current.puedeDeshacer).toBe(false);
    });

    it('comienza sin pedidos en espera', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });
      expect(result.current.pedidosEnEspera).toEqual([]);
      expect(result.current.cantidadEnEspera).toBe(0);
      expect(result.current.pedidoEnFrente).toBeUndefined();
    });

    it('comienza con nota vacia', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });
      expect(result.current.nota).toBe('');
    });
  });

  describe('carrito (RF-03)', () => {
    it('agregarAlCarrito agrega un item y actualiza cantidadItems y totalCarrito', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });
      const plato = PLATOS[0]; // Cafe con leche, $1500

      act(() => {
        result.current.agregarAlCarrito(plato);
      });

      expect(result.current.cantidadItems).toBe(1);
      expect(result.current.totalCarrito).toBe(plato.precio);
      expect(result.current.itemsCarrito[0].plato).toEqual(plato);
    });

    it('agregarAlCarrito habilita puedeDeshacer', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[0]);
      });

      expect(result.current.puedeDeshacer).toBe(true);
    });

    it('agregar multiples platos suma los precios', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[0]); // 1500
        result.current.agregarAlCarrito(PLATOS[3]); // 5500
      });

      expect(result.current.cantidadItems).toBe(2);
      expect(result.current.totalCarrito).toBe(PLATOS[0].precio + PLATOS[3].precio);
    });
  });

  describe('deshacer (RF-04)', () => {
    it('deshacerUltimo quita el ultimo item agregado', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[0]);
        result.current.agregarAlCarrito(PLATOS[1]);
      });

      act(() => {
        result.current.deshacerUltimo();
      });

      expect(result.current.cantidadItems).toBe(1);
      expect(result.current.itemsCarrito[0].plato).toEqual(PLATOS[0]);
    });

    it('deshacer todos los items deja el carrito vacio y puedeDeshacer false', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[0]);
      });

      act(() => {
        result.current.deshacerUltimo();
      });

      expect(result.current.cantidadItems).toBe(0);
      expect(result.current.puedeDeshacer).toBe(false);
    });

    it('deshacerUltimo con pila vacia no hace nada', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.deshacerUltimo(); // no deberia romper
      });

      expect(result.current.cantidadItems).toBe(0);
    });
  });

  describe('nota (RF-05)', () => {
    it('guardarNota guarda el texto', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.guardarNota('sin sal');
      });

      expect(result.current.nota).toBe('sin sal');
    });
  });

  describe('confirmar pedido (RF-06)', () => {
    it('confirmarPedido encola el pedido, vacia carrito y asigna turno', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[0]);
        result.current.agregarAlCarrito(PLATOS[1]);
        result.current.guardarNota('sin sal');
      });

      let pedido: ReturnType<typeof result.current.confirmarPedido>;
      act(() => {
        pedido = result.current.confirmarPedido();
      });

      // El pedido tiene turno 1 (primer pedido)
      expect(pedido!.numero).toBe(1);
      expect(pedido!.items).toHaveLength(2);
      expect(pedido!.nota).toBe('sin sal');
      expect(pedido!.total).toBe(PLATOS[0].precio + PLATOS[1].precio);

      // El carrito quedo vacio
      expect(result.current.cantidadItems).toBe(0);
      expect(result.current.totalCarrito).toBe(0);
      expect(result.current.nota).toBe('');
      expect(result.current.puedeDeshacer).toBe(false);

      // Hay un pedido en espera
      expect(result.current.cantidadEnEspera).toBe(1);
    });

    it('turnos son correlativos', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[0]);
      });
      let p1: ReturnType<typeof result.current.confirmarPedido>;
      act(() => {
        p1 = result.current.confirmarPedido();
      });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[1]);
      });
      let p2: ReturnType<typeof result.current.confirmarPedido>;
      act(() => {
        p2 = result.current.confirmarPedido();
      });

      expect(p1!.numero).toBe(1);
      expect(p2!.numero).toBe(2);
    });
  });

  describe('sesion (RF-08)', () => {
    it('iniciarSesion con credenciales validas retorna true', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      let exito: boolean;
      act(() => {
        exito = result.current.iniciarSesion('cocina', '1234');
      });

      expect(exito!).toBe(true);
      expect(result.current.usuario).toBe('cocina');
      expect(result.current.hayUsuario).toBe(true);
    });

    it('iniciarSesion con credenciales invalidas retorna false', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      let exito: boolean;
      act(() => {
        exito = result.current.iniciarSesion('admin', 'wrong');
      });

      expect(exito!).toBe(false);
      expect(result.current.usuario).toBeNull();
      expect(result.current.hayUsuario).toBe(false);
    });

    it('cerrarSesion limpia el usuario', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.iniciarSesion('cocina', '1234');
      });

      act(() => {
        result.current.cerrarSesion();
      });

      expect(result.current.usuario).toBeNull();
      expect(result.current.hayUsuario).toBe(false);
    });
  });

  describe('atender pedido (RF-09)', () => {
    it('atenderSiguiente desencola el pedido del frente', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      // Confirmar dos pedidos
      act(() => {
        result.current.agregarAlCarrito(PLATOS[0]);
      });
      act(() => {
        result.current.confirmarPedido();
      });

      act(() => {
        result.current.agregarAlCarrito(PLATOS[1]);
      });
      act(() => {
        result.current.confirmarPedido();
      });

      expect(result.current.cantidadEnEspera).toBe(2);

      // Atender el primero
      act(() => {
        result.current.atenderSiguiente();
      });

      expect(result.current.cantidadEnEspera).toBe(1);
      expect(result.current.pedidoEnFrente?.numero).toBe(2); // el segundo ahora es el frente
    });

    it('atenderSiguiente con cola vacia no hace nada', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => {
        result.current.atenderSiguiente(); // no deberia romper
      });

      expect(result.current.cantidadEnEspera).toBe(0);
    });
  });

  describe('pedidos atendidos (RF-10)', () => {
    it('pedidosAtendidos muestra el ultimo atendido primero', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      // Confirmar y atender dos pedidos
      act(() => { result.current.agregarAlCarrito(PLATOS[0]); });
      act(() => { result.current.confirmarPedido(); });
      act(() => { result.current.agregarAlCarrito(PLATOS[1]); });
      act(() => { result.current.confirmarPedido(); });

      act(() => { result.current.atenderSiguiente(); }); // turno 1
      act(() => { result.current.atenderSiguiente(); }); // turno 2

      // El ultimo atendido (turno 2) debe estar primero
      expect(result.current.pedidosAtendidos[0].numero).toBe(2);
      expect(result.current.pedidosAtendidos[1].numero).toBe(1);
    });
  });

  describe('buscarTurno (RF-07)', () => {
    it('devuelve en-espera con pedidos adelante', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => { result.current.agregarAlCarrito(PLATOS[0]); });
      act(() => { result.current.confirmarPedido(); }); // turno 1
      act(() => { result.current.agregarAlCarrito(PLATOS[1]); });
      act(() => { result.current.confirmarPedido(); }); // turno 2

      const estado = result.current.buscarTurno(2);
      expect(estado.estado).toBe('en-espera');
      if (estado.estado === 'en-espera') {
        expect(estado.pedidosAdelante).toBe(1); // turno 1 esta adelante
      }
    });

    it('devuelve atendido para un turno ya atendido', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      act(() => { result.current.agregarAlCarrito(PLATOS[0]); });
      act(() => { result.current.confirmarPedido(); }); // turno 1
      act(() => { result.current.atenderSiguiente(); });

      const estado = result.current.buscarTurno(1);
      expect(estado.estado).toBe('atendido');
    });

    it('devuelve inexistente para un turno que no existe', () => {
      const { result } = renderHook(() => useComedor(), { wrapper });

      const estado = result.current.buscarTurno(999);
      expect(estado.estado).toBe('inexistente');
    });
  });
});
