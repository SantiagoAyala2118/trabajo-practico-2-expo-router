// Articulos de ayuda del comedor, indexados por ruta (slug)
// La profundidad es variable: "horarios" (1 nivel), "pagos/efectivo" (2 niveles),
// "pedidos/turnos" (2 niveles), etc.

export interface ArticuloAyuda {
  titulo: string;
  contenido: string;
}

// Mapa de articulos de ayuda: la clave es la ruta (slug) que se usa en la URL
// Por ejemplo, /ayuda/pagos/efectivo busca la clave "pagos/efectivo"
export const ARTICULOS_AYUDA: Record<string, ArticuloAyuda> = {
  'horarios': {
    titulo: 'Horarios del comedor',
    contenido:
      'El comedor funciona de lunes a viernes. Desayuno de 7:30 a 9:00. Almuerzo de 12:00 a 14:00. El kiosco permanece abierto de 7:30 a 17:00.',
  },
  'pagos/efectivo': {
    titulo: 'Pago en efectivo',
    contenido:
      'Podes pagar en efectivo directamente en la caja del comedor al retirar tu pedido. Se aceptan billetes y monedas.',
  },
  'pagos/tarjeta': {
    titulo: 'Pago con tarjeta',
    contenido:
      'Aceptamos tarjetas de debito y credito. El cobro se realiza al retirar el pedido en la caja.',
  },
  'pedidos/turnos': {
    titulo: 'Como funcionan los turnos',
    contenido:
      'Al confirmar tu pedido recibis un numero de turno. Los pedidos se atienden en orden de llegada (FIFO). Podes consultar el estado de tu turno en cualquier momento.',
  },
  'pedidos/cancelar': {
    titulo: 'Cancelar un pedido',
    contenido:
      'Una vez confirmado, el pedido no se puede cancelar desde la app. Acercate a la ventanilla del comedor para consultar.',
  },
  'menu/categorias': {
    titulo: 'Categorias del menu',
    contenido:
      'El menu esta organizado en 4 categorias: Desayuno, Almuerzo, Bebidas y Kiosco. Podes filtrar por categoria desde el buscador.',
  },
};

// Lista de slugs disponibles para generar el indice de ayuda
export const SLUGS_AYUDA = Object.keys(ARTICULOS_AYUDA);

// Busca un articulo por su slug (ruta)
// El slug puede llegar como array de segmentos desde la URL catch-all
export function buscarArticuloAyuda(slug: string): ArticuloAyuda | undefined {
  return ARTICULOS_AYUDA[slug];
}
