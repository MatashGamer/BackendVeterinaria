import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Producto} from '../models';
import {ProductoRepository} from './producto.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.Id,
  EmpresaRelations
> {

  public readonly producto: HasOneRepositoryFactory<Producto, typeof Empresa.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Empresa, dataSource);
    this.producto = this.createHasOneRepositoryFactoryFor('producto', productoRepositoryGetter);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
  }
}
