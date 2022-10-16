import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Producto,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaProductoController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Persona has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.personaRepository.productos(id).find(filter);
  }

  @post('/personas/{id}/productos', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInPersona',
            exclude: ['Id'],
            optional: ['personaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'Id'>,
  ): Promise<Producto> {
    return this.personaRepository.productos(id).create(producto);
  }

  @patch('/personas/{id}/productos', {
    responses: {
      '200': {
        description: 'Persona.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.personaRepository.productos(id).patch(producto, where);
  }

  @del('/personas/{id}/productos', {
    responses: {
      '200': {
        description: 'Persona.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.personaRepository.productos(id).delete(where);
  }
}
