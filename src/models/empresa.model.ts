import {Entity, model, property, hasOne} from '@loopback/repository';
import {Producto} from './producto.model';

@model()
export class Empresa extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  RazonSocial: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @hasOne(() => Producto)
  producto: Producto;

  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
