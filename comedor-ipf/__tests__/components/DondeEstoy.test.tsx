import React from 'react';
import { create, act } from 'react-test-renderer';
import { DondeEstoy } from '@/components/DondeEstoy';

jest.mock('expo-router', () => ({
  usePathname: () => '/menu/123',
  useSegments: () => ['(tabs)', 'menu', '[id]'],
}));

describe('DondeEstoy', () => {
  it('renderiza pathname y segmentos cuando DEBUG = true', () => {
    let component: any;
    act(() => {
      component = create(<DondeEstoy />);
    });
    const root = component.root;
    try {
      const container = root.findByProps({ testID: 'donde-estoy' });
      const text = JSON.stringify(component.toJSON());
      expect(text).toContain('/menu/123');
      expect(text).toContain('(tabs)');
      expect(text).toContain('[id]');
    } catch (e) {
      throw e;
    }
  });
});
