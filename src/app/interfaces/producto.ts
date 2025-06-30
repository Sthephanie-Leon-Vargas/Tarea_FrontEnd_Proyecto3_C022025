import {ICategoria} from './categoria';

export interface IProducto{
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  cantidadStock?: number;
  categoria?: ICategoria;
}