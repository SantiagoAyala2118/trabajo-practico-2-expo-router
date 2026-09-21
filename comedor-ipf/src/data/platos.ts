// Categorias del menu del comedor
// Se usa 'as const' para que TypeScript infiera los valores literales
// y se pueda derivar el tipo Categoria automaticamente.
export const CATEGORIAS = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'] as const;

// Tipo derivado de las categorias (solo acepta los 4 valores validos)
export type Categoria = typeof CATEGORIAS[number];

// Nombres de categoria para mostrar en la UI
export const NOMBRES_CATEGORIA: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};

// Interfaz que define la estructura de un plato del menu
// DEFENSA: el id es numerico. Los parametros de URL llegan como texto (string),
// por eso hay que convertirlos con Number() antes de comparar.
export interface Plato {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

// Lista de platos del comedor (minimo 12, al menos 2 por categoria)
// Precios en pesos argentinos (realistas)
export const PLATOS: Plato[] = [
  // Desayuno (3 platos)
  {
    id: 1,
    nombre: 'Cafe con leche',
    precio: 1500,
    descripcion: 'Cafe con leche caliente servido en taza grande',
    categoria: 'desayuno',
  },
  {
    id: 2,
    nombre: 'Medialunas x3',
    precio: 2000,
    descripcion: 'Tres medialunas de manteca recien horneadas',
    categoria: 'desayuno',
  },
  {
    id: 3,
    nombre: 'Tostado de jamon y queso',
    precio: 2800,
    descripcion: 'Tostado de jamon cocido y queso en pan de miga',
    categoria: 'desayuno',
  },

  // Almuerzo (4 platos)
  {
    id: 4,
    nombre: 'Milanesa con papas fritas',
    precio: 5500,
    descripcion: 'Milanesa de carne con guarnicion de papas fritas',
    categoria: 'almuerzo',
  },
  {
    id: 5,
    nombre: 'Fideos con salsa bolognesa',
    precio: 4800,
    descripcion: 'Fideos tirabuzones con salsa de carne y tomate',
    categoria: 'almuerzo',
  },
  {
    id: 6,
    nombre: 'Ensalada cesar',
    precio: 4200,
    descripcion: 'Lechuga, pollo grillado, crutones y aderezo cesar',
    categoria: 'almuerzo',
  },
  {
    id: 7,
    nombre: 'Hamburguesa completa',
    precio: 5000,
    descripcion: 'Hamburguesa con queso, lechuga, tomate y papas',
    categoria: 'almuerzo',
  },

  // Bebidas (3 platos)
  {
    id: 8,
    nombre: 'Agua mineral 500ml',
    precio: 800,
    descripcion: 'Botella de agua mineral sin gas',
    categoria: 'bebidas',
  },
  {
    id: 9,
    nombre: 'Gaseosa 500ml',
    precio: 1200,
    descripcion: 'Gaseosa de linea en botella de 500ml',
    categoria: 'bebidas',
  },
  {
    id: 10,
    nombre: 'Jugo de naranja',
    precio: 1800,
    descripcion: 'Jugo de naranja natural exprimido',
    categoria: 'bebidas',
  },

  // Kiosco (3 platos)
  {
    id: 11,
    nombre: 'Alfajor triple',
    precio: 1500,
    descripcion: 'Alfajor de tres capas banado en chocolate',
    categoria: 'kiosco',
  },
  {
    id: 12,
    nombre: 'Barra de cereal',
    precio: 900,
    descripcion: 'Barra de cereal con frutas y miel',
    categoria: 'kiosco',
  },
  {
    id: 13,
    nombre: 'Galletitas surtidas',
    precio: 1100,
    descripcion: 'Paquete de galletitas dulces surtidas',
    categoria: 'kiosco',
  },
];

// Busca un plato por su id numerico
// Devuelve undefined si el id no existe o es NaN
export function buscarPlatoPorId(id: number): Plato | undefined {
  if (isNaN(id)) return undefined;
  return PLATOS.find((plato) => plato.id === id);
}

// DEFENSA: Type guard que verifica si un string es una Categoria valida.
// Se usa para validar los parametros de URL que llegan como texto.
// La sintaxis 'valor is Categoria' le dice a TypeScript que, si la funcion
// retorna true, el parametro se puede tratar como tipo Categoria.
export function esCategoriaValida(valor: string): valor is Categoria {
  return (CATEGORIAS as readonly string[]).includes(valor);
}

// Agrupa los platos por categoria
// Devuelve un objeto donde cada clave es una categoria y el valor es un
// arreglo con los platos de esa categoria
export function platosPorCategoria(): Record<Categoria, Plato[]> {
  const agrupados: Record<Categoria, Plato[]> = {
    desayuno: [],
    almuerzo: [],
    bebidas: [],
    kiosco: [],
  };

  for (const plato of PLATOS) {
    agrupados[plato.categoria].push(plato);
  }

  return agrupados;
}
