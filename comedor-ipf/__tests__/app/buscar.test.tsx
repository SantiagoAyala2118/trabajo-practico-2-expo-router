import React from 'react';
import { create, act } from 'react-test-renderer';
import Buscar from '@/app/buscar';
import { TextInput, Pressable } from 'react-native';
import { PLATOS } from '@/data/platos';

let mockParams = { q: '', categoria: '' };
let mockSetParams = jest.fn();

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => mockParams,
  useRouter: () => ({ setParams: mockSetParams }),
  Stack: {
    Screen: () => null,
  },
  Link: ({ children }: any) => <>{children}</>,
  usePathname: () => '/buscar',
  useSegments: () => [],
  useNavigation: () => ({
    getState: () => ({ routes: [] })
  }),
}));

describe('Buscar', () => {
  beforeEach(() => {
    mockParams = { q: '', categoria: '' };
    mockSetParams.mockClear();
  });

  it('filtra por texto sin acentos', () => {
    mockParams = { q: 'cafe', categoria: '' };
    let component: any;
    act(() => {
      component = create(<Buscar />);
    });
    const root = component.root;
    // Cafe con leche
    const textos = root.findAllByType('Text');
    const encontrado = textos.some((t: any) => 
      t.props.children === 'Cafe con leche' || (Array.isArray(t.props.children) && t.props.children.includes('Cafe con leche'))
    );
    expect(encontrado).toBe(true);
  });

  it('filtra por categoría', () => {
    mockParams = { q: '', categoria: 'bebidas' };
    let component: any;
    act(() => {
      component = create(<Buscar />);
    });
    const root = component.root;
    // Solo debe haber bebidas (ej: Agua mineral 500ml) y no comida
    const textos = root.findAllByType('Text');
    const hayBebida = textos.some((t: any) => t.props.children === 'Agua mineral 500ml');
    const hayComida = textos.some((t: any) => t.props.children === 'Milanesa con papas fritas');
    expect(hayBebida).toBe(true);
    expect(hayComida).toBe(false);
  });

  it('setParams no apila (se usa setParams)', () => {
    let component: any;
    act(() => {
      component = create(<Buscar />);
    });
    const input = component.root.findByType(TextInput);
    act(() => {
      input.props.onChangeText('milanesa');
    });
    expect(mockSetParams).toHaveBeenCalledWith({ q: 'milanesa' });
  });

  it('categoría inválida se ignora', () => {
    mockParams = { q: '', categoria: 'invalida' };
    let component: any;
    act(() => {
      component = create(<Buscar />);
    });
    
    // Deberia mostrar todos los platos, porque invalida se ignora. Vamos a ver si renderiza platos (al menos uno)
    const textos = component.root.findAllByType('Text');
    const hayComida = textos.some((t: any) => t.props.children === 'Milanesa con papas fritas');
    expect(hayComida).toBe(true);
  });
});
