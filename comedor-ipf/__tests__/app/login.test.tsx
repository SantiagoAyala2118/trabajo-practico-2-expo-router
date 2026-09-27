import React from 'react';
import { create, act } from 'react-test-renderer';
import LoginModal from '@/app/login';
import { TextInput } from 'react-native';
import { BotonPrimario } from '@/components/BotonPrimario';

let mockIniciarSesion = jest.fn();
let mockReplace = jest.fn();

jest.mock('@/context/ComedorContext', () => ({
  useComedor: () => ({
    iniciarSesion: mockIniciarSesion,
  }),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    replace: mockReplace,
    back: jest.fn(),
  }),
  Stack: {
    Screen: () => null,
  },
}));

describe('Login', () => {
  beforeEach(() => {
    mockIniciarSesion.mockClear();
    mockReplace.mockClear();
  });

  it('login fallido muestra error', () => {
    mockIniciarSesion.mockReturnValue(false);
    let component: any;
    act(() => {
      component = create(<LoginModal />);
    });
    const root = component.root;
    
    // Simular escritura
    const inputs = root.findAllByType(TextInput);
    act(() => {
      inputs[0].props.onChangeText('admin');
      inputs[1].props.onChangeText('wrong');
    });

    const botones = root.findAllByType(BotonPrimario);
    const botonIngresar = botones.find((b: any) => b.props.titulo === 'Ingresar');
    
    act(() => {
      botonIngresar.props.onPress();
    });

    expect(mockIniciarSesion).toHaveBeenCalledWith('admin', 'wrong');
    
    const textos = root.findAllByType('Text');
    const hayError = textos.some((t: any) => t.props.children === 'Credenciales inválidas. (Pista: cocina / 1234)');
    expect(hayError).toBe(true);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('login exitoso cierra modal (guard)', () => {
    mockIniciarSesion.mockReturnValue(true);
    let component: any;
    act(() => {
      component = create(<LoginModal />);
    });
    const root = component.root;
    
    const inputs = root.findAllByType(TextInput);
    act(() => {
      inputs[0].props.onChangeText('cocina');
      inputs[1].props.onChangeText('1234');
    });

    const botones = root.findAllByType(BotonPrimario);
    const botonIngresar = botones.find((b: any) => b.props.titulo === 'Ingresar');
    
    act(() => {
      botonIngresar.props.onPress();
    });

    expect(mockIniciarSesion).toHaveBeenCalledWith('cocina', '1234');
    
    // No debe navegar manualmente
    expect(mockReplace).not.toHaveBeenCalled();
    
    // No debe mostrar error
    const textos = root.findAllByType('Text');
    const hayError = textos.some((t: any) => t.props.children === 'Credenciales inválidas. (Pista: cocina / 1234)');
    expect(hayError).toBe(false);
  });
});
