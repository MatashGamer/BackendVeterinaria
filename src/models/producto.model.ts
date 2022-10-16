import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Producto extends Entity {
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
  Id_Empresa: string;

  @property({
    type: 'string',
    required: true,
  })
  Precio: string;

  @property({
    type: 'string',
    required: true,
  })
  Imagen: string;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  Total: number;

  @belongsTo(() => Persona)
  personaId: string;

  @property({
    type: 'string',
  })
  empresaId?: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
