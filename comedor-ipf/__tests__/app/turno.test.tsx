import React from 'react';
import { create, act } from 'react-test-renderer';
import Turno from '@/app/turno/[numero]';
import { MINUTOS_POR_PEDIDO } from '@/data/configuracion';

let mockNumero = '1';
let mockResultado: any = { estado: 'en-espera', pedidosAdelante: 2 };

jest.mock('@/context/ComedorContext', () => ({
  useComedor: () => ({
    buscarTurno: () => mockResultado,
  }),
}));

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ numero: mockNumero }),
  Stack: {
    Screen: () => null,
  },
  usePathname: () => '/turno/1',
  useSegments: () => [],
  useNavigation: () => ({
    getState: () => ({ routes: [] })
  }),
}));

describe('Turno', () => {
  it('muestra estado en-espera con tiempo estimado', () => {
    mockNumero = '1';
    mockResultado = { estado: 'en-espera', pedidosAdelante: 2 };
    let component: any;
    act(() => {
      component = create(<Turno />);
    });
    const root = component.root;
    const textos = root.findAllByType('Text');
    const hayAdelante = textos.some((t: any) => 
      t.props.children === 2 || t.props.children === '2'
    );
    const tiempoEstimado = 2 * MINUTOS_POR_PEDIDO;
    const hayTiempo = textos.some((t: any) => 
      t.props.children === `${tiempoEstimado} minutos` ||
      (Array.isArray(t.props.children) && t.props.children.join('').includes(`${tiempoEstimado} minutos`))
    );
    expect(hayAdelante).toBe(true);
    expect(hayTiempo).toBe(true);
  });

  it('muestra estado atendido', () => {
    mockNumero = '1';
    mockResultado = { estado: 'atendido' };
    let component: any;
    act(() => {
      component = create(<Turno />);
    });
    const root = component.root;
    const textos = root.findAllByType('Text');
    const hayAtendido = textos.some((t: any) => t.props.children === '¡Listo para retirar!');
    expect(hayAtendido).toBe(true);
  });

  it('muestra estado inexistente', () => {
    mockNumero = '999';
    mockResultado = undefined;
    let component: any;
    act(() => {
      component = create(<Turno />);
    });
    const root = component.root;
    const textos = root.findAllByType('Text');
    const hayInexistente = textos.some((t: any) => 
      t.props.children === 'El número de turno ingresado no es válido o no existe.' || 
      (Array.isArray(t.props.children) && t.props.children.includes('El número de turno ingresado no es válido o no existe.'))
    );
    expect(hayInexistente).toBe(true);
  });
});
