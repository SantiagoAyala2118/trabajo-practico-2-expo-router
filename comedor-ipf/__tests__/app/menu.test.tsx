import React from 'react';
import { create, act } from 'react-test-renderer';
import MenuIndex from '@/app/(tabs)/menu/index';
import { SectionList, Text } from 'react-native';

jest.mock('expo-router', () => ({
  Link: ({ children }: any) => <>{children}</>,
  usePathname: () => '/',
  useSegments: () => [],
}));

describe('MenuIndex', () => {
  it('renderiza SectionList con platos agrupados', () => {
    let component: any;
    act(() => {
      component = create(<MenuIndex />);
    });
    
    const list = component.root.findByType(SectionList);
    expect(list).toBeDefined();
    
    const secciones = list.props.sections;
    expect(secciones.length).toBeGreaterThan(0);
    // Verificamos que al menos la primera sección tenga datos
    expect(secciones[0].data.length).toBeGreaterThan(0);
  });
});
