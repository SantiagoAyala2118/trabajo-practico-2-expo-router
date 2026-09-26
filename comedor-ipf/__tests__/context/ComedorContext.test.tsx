import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { create, act, ReactTestInstance } from 'react-test-renderer';
import { ComedorProvider, useComedor } from '@/context/ComedorContext';
import { PLATOS } from '@/data/platos';

// Componente de test que expone la API del Context a traves de la UI
function ContextTester() {
  const ctx = useComedor();
  const [ultimoPedido, setUltimoPedido] = useState<{ numero: number } | null>(null);
  const [resultadoSesion, setResultadoSesion] = useState<string>('');
  const [resultadoTurno, setResultadoTurno] = useState<string>('');

  return (
    <View>
      <Text testID="usuario">{ctx.usuario ?? 'null'}</Text>
      <Text testID="hayUsuario">{String(ctx.hayUsuario)}</Text>
      <Text testID="cantidadItems">{ctx.cantidadItems}</Text>
      <Text testID="totalCarrito">{ctx.totalCarrito}</Text>
      <Text testID="nota">{ctx.nota}</Text>
      <Text testID="puedeDeshacer">{String(ctx.puedeDeshacer)}</Text>
      <Text testID="cantidadEnEspera">{ctx.cantidadEnEspera}</Text>
      <Text testID="pedidoEnFrente">{ctx.pedidoEnFrente?.numero ?? 'none'}</Text>
      <Text testID="ultimoPedido">{ultimoPedido?.numero ?? 'none'}</Text>
      <Text testID="resultadoSesion">{resultadoSesion}</Text>
      <Text testID="resultadoTurno">{resultadoTurno}</Text>
      <Text testID="pedidosAtendidos">{ctx.pedidosAtendidos.map((p) => p.numero).join(',')}</Text>
      <Text testID="itemsCarrito">{ctx.itemsCarrito.map((i) => i.plato.nombre).join(',')}</Text>

      <Text testID="btnAgregarPlato0" onPress={() => ctx.agregarAlCarrito(PLATOS[0])}>Btn</Text>
      <Text testID="btnAgregarPlato1" onPress={() => ctx.agregarAlCarrito(PLATOS[1])}>Btn</Text>
      <Text testID="btnAgregarPlato3" onPress={() => ctx.agregarAlCarrito(PLATOS[3])}>Btn</Text>
      <Text testID="btnDeshacer" onPress={() => ctx.deshacerUltimo()}>Btn</Text>
      <Text testID="btnGuardarNota" onPress={() => ctx.guardarNota('sin sal')}>Btn</Text>
      <Text testID="btnConfirmar" onPress={() => { setUltimoPedido(ctx.confirmarPedido()); }}>Btn</Text>
      <Text testID="btnIniciarSesionOk" onPress={() => { setResultadoSesion(ctx.iniciarSesion('cocina', '1234') ? 'true' : 'false'); }}>Btn</Text>
      <Text testID="btnIniciarSesionMal" onPress={() => { setResultadoSesion(ctx.iniciarSesion('admin', 'wrong') ? 'true' : 'false'); }}>Btn</Text>
      <Text testID="btnCerrarSesion" onPress={() => ctx.cerrarSesion()}>Btn</Text>
      <Text testID="btnAtender" onPress={() => ctx.atenderSiguiente()}>Btn</Text>
      <Text testID="btnBuscarTurno1" onPress={() => { const r = ctx.buscarTurno(1); setResultadoTurno(r.estado === 'en-espera' ? `en-espera:${r.pedidosAdelante}` : r.estado); }}>Btn</Text>
      <Text testID="btnBuscarTurno2" onPress={() => { const r = ctx.buscarTurno(2); setResultadoTurno(r.estado === 'en-espera' ? `en-espera:${r.pedidosAdelante}` : r.estado); }}>Btn</Text>
      <Text testID="btnBuscarTurno999" onPress={() => { setResultadoTurno(ctx.buscarTurno(999).estado); }}>Btn</Text>
    </View>
  );
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) return <Text testID="errorMsg">{this.state.error?.message}</Text>;
    return this.props.children;
  }
}

let root: ReactTestInstance;

function renderTester() {
  let component: any;
  act(() => {
    component = create(
      <ComedorProvider>
        <ErrorBoundary>
          <ContextTester />
        </ErrorBoundary>
      </ComedorProvider>
    );
  });
  root = component.root;
}

function texto(testID: string): string {
  try { return root.findByProps({ testID }).props.children?.toString() ?? ''; } catch (e) { return ''; }
}

function press(testID: string) {
  act(() => { root.findByProps({ testID }).props.onPress(); });
}

// =========================== TESTS ===========================

describe('ComedorContext - useComedor fuera del Provider (RT-06)', () => {
  it('lanza error si se usa fuera del Provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    function Componente() { useComedor(); return null; }
    let testRoot: any;
    act(() => {
      testRoot = create(<ErrorBoundary><Componente /></ErrorBoundary>);
    });
    expect(testRoot.root.findByProps({ testID: 'errorMsg' }).props.children).toBe('useComedor debe usarse dentro de un ComedorProvider');
    consoleSpy.mockRestore();
  });
});

describe('ComedorContext - estado inicial', () => {
  it('comienza sin usuario', () => { renderTester(); expect(texto('usuario')).toBe('null'); expect(texto('hayUsuario')).toBe('false'); });
  it('comienza con carrito vacio', () => { renderTester(); expect(texto('cantidadItems')).toBe('0'); expect(texto('totalCarrito')).toBe('0'); });
  it('comienza sin poder deshacer', () => { renderTester(); expect(texto('puedeDeshacer')).toBe('false'); });
  it('comienza sin pedidos en espera', () => { renderTester(); expect(texto('cantidadEnEspera')).toBe('0'); expect(texto('pedidoEnFrente')).toBe('none'); });
  it('comienza con nota vacia', () => { renderTester(); expect(texto('nota')).toBe(''); });
});

describe('ComedorContext - carrito (RF-03)', () => {
  it('agregarAlCarrito agrega un item y actualiza cantidadItems y totalCarrito', () => { renderTester(); press('btnAgregarPlato0'); expect(texto('cantidadItems')).toBe('1'); expect(texto('totalCarrito')).toBe(String(PLATOS[0].precio)); });
  it('agregarAlCarrito habilita puedeDeshacer', () => { renderTester(); press('btnAgregarPlato0'); expect(texto('puedeDeshacer')).toBe('true'); });
  it('agregar multiples platos suma los precios', () => { renderTester(); press('btnAgregarPlato0'); press('btnAgregarPlato3'); expect(texto('cantidadItems')).toBe('2'); expect(texto('totalCarrito')).toBe(String(PLATOS[0].precio + PLATOS[3].precio)); });
});

describe('ComedorContext - deshacer (RF-04)', () => {
  it('deshacerUltimo quita el ultimo item agregado', () => { renderTester(); press('btnAgregarPlato0'); press('btnAgregarPlato1'); press('btnDeshacer'); expect(texto('cantidadItems')).toBe('1'); expect(texto('itemsCarrito')).toBe(PLATOS[0].nombre); });
  it('deshacer todos los items deja carrito vacio y puedeDeshacer false', () => { renderTester(); press('btnAgregarPlato0'); press('btnDeshacer'); expect(texto('cantidadItems')).toBe('0'); expect(texto('puedeDeshacer')).toBe('false'); });
  it('deshacerUltimo con pila vacia no hace nada', () => { renderTester(); press('btnDeshacer'); expect(texto('cantidadItems')).toBe('0'); });
});

describe('ComedorContext - nota (RF-05)', () => {
  it('guardarNota guarda el texto', () => { renderTester(); press('btnGuardarNota'); expect(texto('nota')).toBe('sin sal'); });
});

describe('ComedorContext - confirmar pedido (RF-06)', () => {
  it('confirmarPedido encola el pedido, vacia carrito y asigna turno', () => { renderTester(); press('btnAgregarPlato0'); press('btnAgregarPlato1'); press('btnGuardarNota'); press('btnConfirmar'); expect(texto('ultimoPedido')).toBe('1'); expect(texto('cantidadItems')).toBe('0'); expect(texto('totalCarrito')).toBe('0'); expect(texto('nota')).toBe(''); expect(texto('puedeDeshacer')).toBe('false'); expect(texto('cantidadEnEspera')).toBe('1'); });
  it('turnos son correlativos', () => { renderTester(); press('btnAgregarPlato0'); press('btnConfirmar'); expect(texto('ultimoPedido')).toBe('1'); press('btnAgregarPlato1'); press('btnConfirmar'); expect(texto('ultimoPedido')).toBe('2'); });
});

describe('ComedorContext - sesion (RF-08)', () => {
  it('iniciarSesion con credenciales validas retorna true', () => { renderTester(); press('btnIniciarSesionOk'); expect(texto('resultadoSesion')).toBe('true'); expect(texto('usuario')).toBe('cocina'); expect(texto('hayUsuario')).toBe('true'); });
  it('iniciarSesion con credenciales invalidas retorna false', () => { renderTester(); press('btnIniciarSesionMal'); expect(texto('resultadoSesion')).toBe('false'); expect(texto('usuario')).toBe('null'); expect(texto('hayUsuario')).toBe('false'); });
  it('cerrarSesion limpia el usuario', () => { renderTester(); press('btnIniciarSesionOk'); press('btnCerrarSesion'); expect(texto('usuario')).toBe('null'); expect(texto('hayUsuario')).toBe('false'); });
});

describe('ComedorContext - atender pedido (RF-09)', () => {
  it('atenderSiguiente desencola el pedido del frente', () => { renderTester(); press('btnAgregarPlato0'); press('btnConfirmar'); press('btnAgregarPlato1'); press('btnConfirmar'); expect(texto('cantidadEnEspera')).toBe('2'); press('btnAtender'); expect(texto('cantidadEnEspera')).toBe('1'); expect(texto('pedidoEnFrente')).toBe('2'); });
  it('atenderSiguiente con cola vacia no hace nada', () => { renderTester(); press('btnAtender'); expect(texto('cantidadEnEspera')).toBe('0'); });
});

describe('ComedorContext - pedidos atendidos (RF-10)', () => {
  it('pedidosAtendidos muestra el ultimo atendido primero', () => { renderTester(); press('btnAgregarPlato0'); press('btnConfirmar'); press('btnAgregarPlato1'); press('btnConfirmar'); press('btnAtender'); press('btnAtender'); expect(texto('pedidosAtendidos')).toBe('2,1'); });
});

describe('ComedorContext - buscarTurno (RF-07)', () => {
  it('devuelve en-espera con pedidos adelante', () => { renderTester(); press('btnAgregarPlato0'); press('btnConfirmar'); press('btnAgregarPlato1'); press('btnConfirmar'); press('btnBuscarTurno2'); expect(texto('resultadoTurno')).toBe('en-espera:1'); });
  it('devuelve atendido para un turno ya atendido', () => { renderTester(); press('btnAgregarPlato0'); press('btnConfirmar'); press('btnAtender'); press('btnBuscarTurno1'); expect(texto('resultadoTurno')).toBe('atendido'); });
  it('devuelve inexistente para un turno que no existe', () => { renderTester(); press('btnBuscarTurno999'); expect(texto('resultadoTurno')).toBe('inexistente'); });
});
