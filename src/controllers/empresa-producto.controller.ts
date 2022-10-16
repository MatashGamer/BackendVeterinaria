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
  Empresa,
  Producto,
} from '../models';
import {EmpresaRepository} from '../repositories';

export class EmpresaProductoController {
  constructor(
    @repository(EmpresaRepository) protected empresaRepository: EmpresaRepository,
  ) { }

  @get('/empresas/{id}/producto', {
    responses: {
      '200': {
        description: 'Empresa has one Producto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Producto),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto> {
    return this.empresaRepository.producto(id).get(filter);
  }

  @post('/empresas/{id}/producto', {
    responses: {
      '200': {
        description: 'Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empresa.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInEmpresa',
            exclude: ['Id'],
            optional: ['empresaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'Id'>,
  ): Promise<Producto> {
    return this.empresaRepository.producto(id).create(producto);
  }

  @patch('/empresas/{id}/producto', {
    responses: {
      '200': {
        description: 'Empresa.Producto PATCH success count',
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
    return this.empresaRepository.producto(id).patch(producto, where);
  }

  @del('/empresas/{id}/producto', {
    responses: {
      '200': {
        description: 'Empresa.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.empresaRepository.producto(id).delete(where);
  }
}
