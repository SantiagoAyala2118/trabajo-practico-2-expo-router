import React from 'react';
import { create, act } from 'react-test-renderer';
import AyudaIndex from '@/app/ayuda/index';
import AyudaArticulo from '@/app/ayuda/[...slug]';
import { TituloConContadorDePila } from '@/components/TituloConContadorDePila';

let mockSlug: string[] = [];

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ slug: mockSlug }),
  Stack: {
    Screen: () => null,
  },
  Link: ({ children }: any) => <>{children}</>,
  usePathname: () => '/ayuda',
  useSegments: () => [],
  useNavigation: () => ({
    getState: () => ({ routes: [] })
  }),
}));

describe('Ayuda', () => {
  it('índice renderiza links', () => {
    let component: any;
    act(() => {
      component = create(<AyudaIndex />);
    });
    const root = component.root;
    const textos = root.findAllByType('Text');
    const hayHorarios = textos.some((t: any) => t.props.children === 'Horarios del comedor');
    expect(hayHorarios).toBe(true);
  });

  it('slug válido muestra artículo', () => {
    mockSlug = ['horarios'];
    let component: any;
    act(() => {
      component = create(<AyudaArticulo />);
    });
    const root = component.root;
    const tituloComponent = root.findByType(TituloConContadorDePila);
    expect(tituloComponent.props.titulo).toBe('Horarios del comedor');
  });

  it('slug inválido muestra mensaje', () => {
    mockSlug = ['inexistente'];
    let component: any;
    act(() => {
      component = create(<AyudaArticulo />);
    });
    const textos = component.root.findAllByType('Text');
    const encontrado = textos.some((t: any) => 
      t.props.children === 'El artículo de ayuda "inexistente" no existe.' || 
      (Array.isArray(t.props.children) && t.props.children.includes('El artículo de ayuda "inexistente" no existe.'))
    );
    expect(encontrado).toBe(true);
  });

  it('slug con múltiples segmentos', () => {
    mockSlug = ['pagos', 'efectivo'];
    let component: any;
    act(() => {
      component = create(<AyudaArticulo />);
    });
    const root = component.root;
    const tituloComponent = root.findByType(TituloConContadorDePila);
    expect(tituloComponent.props.titulo).toBe('Pago en efectivo');
  });
});
