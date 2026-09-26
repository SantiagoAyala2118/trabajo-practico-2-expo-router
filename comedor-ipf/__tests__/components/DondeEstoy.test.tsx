import React from 'react';
import { create } from 'react-test-renderer';
import { DondeEstoy } from '@/components/DondeEstoy';

jest.mock('expo-router', () => ({
  usePathname: () => '/menu/123',
  useSegments: () => ['(tabs)', 'menu', '[id]'],
}));

describe('DondeEstoy', () => {
  it('renderiza pathname y segmentos cuando DEBUG = true', () => {
    const component = create(<DondeEstoy />);
    const root = component.root;
    try {
      const container = root.findByProps({ testID: 'donde-estoy' });
      const text = JSON.stringify(container.props.children);
      expect(text).toContain('/menu/123');
      expect(text).toContain('(tabs)');
      expect(text).toContain('[id]');
    } catch (e) {
      // Si DEBUG es false, quizas retorne null. Pero en test asumimos que lo vemos si falla la asercion.
      throw e;
    }
  });
});
