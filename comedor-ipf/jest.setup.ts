// Setup de Jest para el proyecto Comedor IPF
// Mocks necesarios para que las dependencias de React Native funcionen en el entorno de testing

// Mock de react-native-worklets para Jest
// Reanimated v4 usa react-native-worklets que necesita un mock manual
// porque intenta acceder a modulos nativos que no existen en el entorno de test
jest.mock('react-native-worklets', () => ({
  NativeWorklets: {
    getInstance: jest.fn(() => ({
      createSharedValue: jest.fn(),
      createShareableRef: jest.fn(),
    })),
  },
  isWorklet: jest.fn(() => false),
  defaultUnpacker: jest.fn(),
}));

// Mock de react-native-reanimated para Jest
// Ahora que worklets esta mockeado, podemos importar el mock de reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return {
    ...Reanimated,
    default: {
      ...Reanimated.default,
    },
  };
});

// Mock de react-native-gesture-handler para Jest
// Gesture Handler usa componentes nativos que no estan disponibles en Jest
import 'react-native-gesture-handler/jestSetup';
