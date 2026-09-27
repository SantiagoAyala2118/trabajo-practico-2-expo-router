import React from 'react';
import { create, act } from 'react-test-renderer';
import CarritoIndex from '@/app/(tabs)/carrito/index';
import { PLATOS } from '@/data/platos';
import { BotonPrimario } from '@/components/BotonPrimario';

let mockItemsCarrito: any[] = [];
let mockTotalCarrito = 0;
let mockPuedeDeshacer = false;
const mockDeshacer = jest.fn();

jest.mock('@/context/ComedorContext', () => ({
  useComedor: () => ({
    itemsCarrito: mockItemsCarrito,
    totalCarrito: mockTotalCarrito,
    nota: '',
    puedeDeshacer: mockPuedeDeshacer,
    deshacerUltimo: mockDeshacer,
  }),
}));

jest.mock('expo-router', () => ({
  Stack: {
    Screen: () => null,
  },
  Link: ({ children }: any) => <>{children}</>,
  usePathname: () => '/carrito',
  useSegments: () => [],
  useNavigation: () => ({
    getState: () => ({ routes: [] })
  }),
}));

describe('Carrito', () => {
  beforeEach(() => {
    mockItemsCarrito = [];
    mockTotalCarrito = 0;
    mockPuedeDeshacer = false;
    mockDeshacer.mockClear();
  });

  it('renderiza ítems y total', () => {
    mockItemsCarrito = [
      { idItem: 1, plato: PLATOS[0] }, // Cafe con leche 1200
    ];
    mockTotalCarrito = 1200;
    let component: any;
    act(() => {
      component = create(<CarritoIndex />);
    });
    
    const root = component.root;
    const textos = root.findAllByType('Text');
    const hayPlato = textos.some((t: any) => t.props.children === 'Cafe con leche');
    const hayTotal = textos.some((t: any) => 
      t.props.children && typeof t.props.children === 'object' && t.props.children.join('') === 'Total: $1200.00'
      || (Array.isArray(t.props.children) && t.props.children.join('').includes('Total: $1200.00'))
    );
    
    expect(hayPlato).toBe(true);
    expect(hayTotal).toBe(true);
  });

  it('botón deshacer deshabilitado con pila vacía', () => {
    mockPuedeDeshacer = false;
    let component: any;
    act(() => {
      component = create(<CarritoIndex />);
    });
    const botones = component.root.findAllByType(BotonPrimario);
    const botonDeshacer = botones.find((b: any) => b.props.titulo === 'Deshacer último');
    expect(botonDeshacer.props.deshabilitado).toBe(true);
  });

  it('botón confirmar deshabilitado con carrito vacío', () => {
    mockItemsCarrito = [];
    let component: any;
    act(() => {
      component = create(<CarritoIndex />);
    });
    const botones = component.root.findAllByType(BotonPrimario);
    const botonConfirmar = botones.find((b: any) => b.props.titulo === 'Confirmar pedido');
    expect(botonConfirmar.props.deshabilitado).toBe(true);
  });
});
