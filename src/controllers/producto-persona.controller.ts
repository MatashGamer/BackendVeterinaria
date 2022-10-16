import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Persona,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoPersonaController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Producto.prototype.Id,
  ): Promise<Persona> {
    return this.productoRepository.persona(id);
  }
}
