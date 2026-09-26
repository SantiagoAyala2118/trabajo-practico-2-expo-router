import React from 'react';
import { create, act } from 'react-test-renderer';
import { TarjetaPlato } from '@/components/TarjetaPlato';
import { PLATOS } from '@/data/platos';

describe('TarjetaPlato', () => {
  it('renderiza props del plato', () => {
    const plato = PLATOS[0];
    let component: any;
    act(() => {
      component = create(<TarjetaPlato plato={plato} onPress={() => {}} />);
    });
    const root = component.root;
    
    const nombre = root.findByProps({ testID: 'tarjeta-plato-nombre' });
    expect(nombre.props.children).toBe(plato.nombre);
    
    const precio = root.findByProps({ testID: 'tarjeta-plato-precio' });
    expect(precio.props.children.join('')).toContain(plato.precio.toString());
  });
});
