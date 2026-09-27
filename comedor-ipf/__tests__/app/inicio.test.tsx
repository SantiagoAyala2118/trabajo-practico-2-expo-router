import React from 'react';
import { create, act } from 'react-test-renderer';
import InicioTab from '@/app/(tabs)/index';
import { ComedorProvider } from '@/context/ComedorContext';

jest.mock('expo-router', () => ({
  Link: ({ children, href }: any) => <>{children}</>,
  usePathname: () => '/',
  useSegments: () => [],
}));

describe('InicioTab', () => {
  it('renderiza 4 tarjetas con links correctos', () => {
    let component: any;
    act(() => {
      component = create(
        <ComedorProvider>
          <InicioTab />
        </ComedorProvider>
      );
    });
    const root = component.root;

    // Verificar las 4 tarjetas (pressables con testIDs)
    expect(root.findByProps({ testID: 'card-menu' })).toBeDefined();
    expect(root.findByProps({ testID: 'card-buscar' })).toBeDefined();
    expect(root.findByProps({ testID: 'card-ayuda' })).toBeDefined();
    expect(root.findByProps({ testID: 'card-cocina' })).toBeDefined();
  });
});
