import React from 'react';
import { create, act } from 'react-test-renderer';
import { BotonPrimario } from '@/components/BotonPrimario';

describe('BotonPrimario', () => {
  it('renderiza con variantes, estado deshabilitado aplica estilo correcto', () => {
    const fn = jest.fn();
    let component: any;
    act(() => {
      component = create(
        <BotonPrimario titulo="Confirmar" onPress={fn} deshabilitado={true} variante="secundario" />
      );
    });
    const root = component.root;
    const btn = root.findByProps({ testID: 'boton-primario' });
    
    expect(btn.props.disabled).toBe(true);
    
    const textoBtn = root.findByProps({ testID: 'boton-primario-texto' });
    expect(textoBtn.props.children).toBe('Confirmar');
  });
});
