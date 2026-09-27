import React from 'react';
import { create, act } from 'react-test-renderer';
import Confirmar from '@/app/confirmar';
import { PLATOS } from '@/data/platos';
import { BotonPrimario } from '@/components/BotonPrimario';

let mockItemsCarrito: any[] = [];
let mockTotalCarrito = 0;
const mockConfirmarPedido = jest.fn(() => ({ numero: 123 }));
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock('@/context/ComedorContext', () => ({
  useComedor: () => ({
    itemsCarrito: mockItemsCarrito,
    totalCarrito: mockTotalCarrito,
    nota: 'Sin sal',
    confirmarPedido: mockConfirmarPedido,
  }),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
    back: mockBack,
  }),
  Stack: {
    Screen: () => null,
  },
}));

describe('Confirmar', () => {
  beforeEach(() => {
    mockItemsCarrito = [];
    mockTotalCarrito = 0;
    mockConfirmarPedido.mockClear();
    mockReplace.mockClear();
    mockBack.mockClear();
  });

  it('muestra resumen', () => {
    mockItemsCarrito = [
      { idItem: 1, plato: PLATOS[0] }, // Cafe con leche
    ];
    let component: any;
    act(() => {
      component = create(<Confirmar />);
    });
    const root = component.root;
    const textos = root.findAllByType('Text');
    const hayPlato = textos.some((t: any) => t.props.children === 'Cafe con leche');
    const hayNota = textos.some((t: any) => t.props.children === 'Sin sal');
    expect(hayPlato).toBe(true);
    expect(hayNota).toBe(true);
  });

  it('impide confirmar con carrito vacío', () => {
    mockItemsCarrito = [];
    let component: any;
    act(() => {
      component = create(<Confirmar />);
    });
    const root = component.root;
    const textos = root.findAllByType('Text');
    const encontrado = textos.some((t: any) => 
      t.props.children === 'No puedes confirmar un pedido vacío.' || 
      (Array.isArray(t.props.children) && t.props.children.includes('No puedes confirmar un pedido vacío.'))
    );
    expect(encontrado).toBe(true);
    
    // Intentamos presionar el botón volver (es el único primario si está vacío)
    const botones = component.root.findAllByType(BotonPrimario);
    act(() => {
      botones[0].props.onPress();
    });
    expect(mockBack).toHaveBeenCalled();
  });

  it('replace no apila al confirmar', () => {
    mockItemsCarrito = [
      { idItem: 1, plato: PLATOS[0] },
    ];
    let component: any;
    act(() => {
      component = create(<Confirmar />);
    });
    const botones = component.root.findAllByType(BotonPrimario);
    const botonConfirmar = botones.find((b: any) => b.props.titulo === 'Confirmar y Generar Turno');
    
    act(() => {
      botonConfirmar.props.onPress();
    });
    
    expect(mockConfirmarPedido).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledWith('/turno/123');
  });
});
