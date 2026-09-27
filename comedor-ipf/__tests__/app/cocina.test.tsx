import React from 'react';
import { create, act } from 'react-test-renderer';
import CocinaIndex from '@/app/cocina/index';
import CocinaAtendidos from '@/app/cocina/atendidos';
import { BotonPrimario } from '@/components/BotonPrimario';
import { TarjetaPedido } from '@/components/TarjetaPedido';

let mockPedidoEnFrente: any = undefined;
let mockCantidadEnEspera = 0;
let mockAtenderSiguiente = jest.fn();
let mockPedidosAtendidos: any[] = [];

jest.mock('@/context/ComedorContext', () => ({
  useComedor: () => ({
    pedidoEnFrente: mockPedidoEnFrente,
    cantidadEnEspera: mockCantidadEnEspera,
    atenderSiguiente: mockAtenderSiguiente,
    pedidosAtendidos: mockPedidosAtendidos,
  }),
}));

describe('Cocina', () => {
  beforeEach(() => {
    mockPedidoEnFrente = undefined;
    mockCantidadEnEspera = 0;
    mockAtenderSiguiente.mockClear();
    mockPedidosAtendidos = [];
  });

  describe('Index (Pedidos en espera)', () => {
    it('muestra pedido del frente', () => {
      mockPedidoEnFrente = { numero: 1, items: [], total: 1000, nota: 'Sin sal' };
      mockCantidadEnEspera = 1;
      let component: any;
      act(() => {
        component = create(<CocinaIndex />);
      });
      const root = component.root;
      const textos = root.findAllByType('Text');
      const hayTurno = textos.some((t: any) => 
        t.props.children && typeof t.props.children === 'object' && t.props.children.join('') === 'Turno #1'
      );
      expect(hayTurno).toBe(true);
      
      const hayCantidad = textos.some((t: any) => 
        t.props.children === 1 || t.props.children === '1'
      );
      expect(hayCantidad).toBe(true);
    });

    it('botón atender deshabilitado si cola vacía', () => {
      mockPedidoEnFrente = undefined;
      let component: any;
      act(() => {
        component = create(<CocinaIndex />);
      });
      const botones = component.root.findAllByType(BotonPrimario);
      const botonAtender = botones.find((b: any) => b.props.titulo === 'Atender siguiente');
      expect(botonAtender.props.deshabilitado).toBe(true);
    });

    it('llama a atenderSiguiente', () => {
      mockPedidoEnFrente = { numero: 1, items: [], total: 1000, nota: '' };
      let component: any;
      act(() => {
        component = create(<CocinaIndex />);
      });
      const botones = component.root.findAllByType(BotonPrimario);
      const botonAtender = botones.find((b: any) => b.props.titulo === 'Atender siguiente');
      
      act(() => {
        botonAtender.props.onPress();
      });
      
      expect(mockAtenderSiguiente).toHaveBeenCalled();
    });
  });

  describe('Atendidos', () => {
    it('muestra atendidos en orden', () => {
      mockPedidosAtendidos = [
        { numero: 3, items: [], total: 300, nota: '' },
        { numero: 2, items: [], total: 200, nota: '' },
      ];
      let component: any;
      act(() => {
        component = create(<CocinaAtendidos />);
      });
      const root = component.root;
      const textos = root.findAllByType('Text');
      // Filtramos los textos que sean "Turno #N"
      const turnos = textos.filter((t: any) => 
        t.props.children && typeof t.props.children === 'object' && t.props.children[0] === 'Turno #'
      ).map((t: any) => t.props.children[1]);
      
      expect(turnos.length).toBe(2);
      expect(turnos[0]).toBe(3);
      expect(turnos[1]).toBe(2);
    });

    it('muestra mensaje si no hay atendidos', () => {
      mockPedidosAtendidos = [];
      let component: any;
      act(() => {
        component = create(<CocinaAtendidos />);
      });
      const root = component.root;
      const textos = root.findAllByType('Text');
      const hayMensaje = textos.some((t: any) => 
        t.props.children === 'Aún no hay pedidos atendidos.' ||
        (Array.isArray(t.props.children) && t.props.children.includes('Aún no hay pedidos atendidos.'))
      );
      expect(hayMensaje).toBe(true);
    });
  });
});
