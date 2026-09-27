import React from 'react';
import { create, act } from 'react-test-renderer';
import CategoriaLista from '@/app/categorias/[categoria]';

// Mocks
let mockCategoria = 'desayuno';

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ categoria: mockCategoria }),
  Link: ({ children }: any) => <>{children}</>,
  Stack: {
    Screen: () => null,
  },
  usePathname: () => '/categorias/desayuno',
  useSegments: () => [],
  useNavigation: () => ({
    getState: () => ({ routes: [] })
  }),
}));

describe('CategoriaLista', () => {
  it('categoría válida muestra platos', () => {
    mockCategoria = 'desayuno';
    let component: any;
    act(() => {
      component = create(<CategoriaLista />);
    });
    
    // En lugar de JSON.stringify, buscamos el texto o componente
    const root = component.root;
    // Buscamos si existe algun componente de texto con "Cafe con leche" o usamos findAllByType
    const textos = root.findAllByType('Text');
    const encontrado = textos.some((t: any) => t.props.children === 'Cafe con leche' || (Array.isArray(t.props.children) && t.props.children.includes('Cafe con leche')));
    expect(encontrado).toBe(true);
  });

  it('categoría inválida muestra mensaje', () => {
    mockCategoria = 'invalida';
    let component: any;
    act(() => {
      component = create(<CategoriaLista />);
    });
    
    const root = component.root;
    const textos = root.findAllByType('Text');
    const encontrado = textos.some((t: any) => t.props.children === 'La categoría ingresada no existe.' || (Array.isArray(t.props.children) && t.props.children.includes('La categoría ingresada no existe.')));
    expect(encontrado).toBe(true);
  });
});
