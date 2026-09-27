import React from 'react';
import { create, act } from 'react-test-renderer';
import MenuDetalle from '@/app/(tabs)/menu/[id]';
import { ComedorProvider } from '@/context/ComedorContext';

// Mocks
let mockId = '1';

jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: mockId }),
  Stack: {
    Screen: () => null,
  },
  usePathname: () => '/menu/1',
  useSegments: () => [],
  useNavigation: () => ({
    getState: () => ({ routes: [] })
  }),
}));

describe('MenuDetalle', () => {
  it('id válido muestra plato', () => {
    mockId = '1';
    let component: any;
    act(() => {
      component = create(
        <ComedorProvider>
          <MenuDetalle />
        </ComedorProvider>
      );
    });
    const root = component.root;
    // Buscamos algo que confirme que es un plato válido (por ejemplo, el texto del TituloConContadorDePila)
    expect(JSON.stringify(component.toJSON())).toContain('Cafe con leche');
  });

  it('id inválido muestra mensaje', () => {
    mockId = '999';
    let component: any;
    act(() => {
      component = create(
        <ComedorProvider>
          <MenuDetalle />
        </ComedorProvider>
      );
    });
    
    expect(JSON.stringify(component.toJSON())).toContain('El plato que buscas no existe.');
  });
});
