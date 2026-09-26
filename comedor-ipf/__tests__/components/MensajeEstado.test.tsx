import React from 'react';
import { create } from 'react-test-renderer';
import { MensajeEstado } from '@/components/MensajeEstado';

describe('MensajeEstado', () => {
  it('renderiza mensaje', () => {
    const component = create(<MensajeEstado mensaje="No hay resultados" />);
    const root = component.root;
    const texto = root.findByProps({ testID: 'mensaje-estado-texto' });
    expect(texto.props.children).toBe('No hay resultados');
  });
});
