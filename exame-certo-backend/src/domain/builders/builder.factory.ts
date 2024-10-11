import { BaseEntityBuilder } from './entity.builder';
import { BaseEntityProps } from '../interfaces/props/base-entity-props.interface';

export abstract class BuilderFactory<
  TEntity,
  TProps extends BaseEntityProps,
  TBuilder extends BaseEntityBuilder<TEntity, TProps>,
> {
  abstract createBuilder(): TBuilder;
  abstract configureBuilder(builder: TBuilder, data: any): TBuilder;
}
