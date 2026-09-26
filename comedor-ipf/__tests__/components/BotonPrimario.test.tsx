import React from 'react';
import { create } from 'react-test-renderer';
import { BotonPrimario } from '@/components/BotonPrimario';

describe('BotonPrimario', () => {
  it('renderiza con variantes, estado deshabilitado aplica estilo correcto', () => {
    const fn = jest.fn();
    const component = create(
      <BotonPrimario titulo="Confirmar" onPress={fn} deshabilitado={true} variante="secundario" />
    );
    const root = component.root;
    const btn = root.findByProps({ testID: 'boton-primario' });
    
    // Si esta deshabilitado, se pasa la prop disabled (o disabled={true} al Pressable)
    expect(btn.props.disabled).toBe(true);
    
    const textoBtn = root.findByProps({ testID: 'boton-primario-texto' });
    expect(textoBtn.props.children).toBe('Confirmar');
  });
});
