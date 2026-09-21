// Paleta institucional del Comedor IPF (tema oscuro verde)
// Todos los colores de la app salen de aca. No usar hex sueltos en ningun otro archivo.

export const colores = {
  fondo: '#051F20',       // Fondo de pantallas, headers
  superficie: '#0B2B26',  // Tarjetas, tab bar, drawer, modales
  borde: '#163832',       // Bordes, separadores, botones deshabilitados
  primario: '#235347',    // Botones primarios, elementos activos
  acento: '#8EB69B',      // CTA destacados, iconos, textos secundarios
  textoClaro: '#DAF1DE',  // Texto principal sobre fondos oscuros
  negro: '#000000',       // Texto sobre fondos claros (acento / textoClaro), sombras
} as const;

// Constantes de espaciado (en puntos)
export const espaciado = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// Radios de borde
export const radios = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  redondo: 9999,
} as const;
