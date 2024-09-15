import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../../../domain/builders/builder.factory';

@Injectable()
export abstract class BaseMapper<DomainEntity, PersistenceEntity> {
  protected constructor(
    @Inject('BuilderFactory') protected readonly builder: BuilderFactory,
  ) {}

  abstract toDomain(entity: PersistenceEntity): Promise<DomainEntity>;
  abstract toPersistence(domain: DomainEntity): Promise<PersistenceEntity>;

  protected static setCommonFieldsToPersistence(
    entity: any,
    domain: any,
    properties: string[] = ['id', 'createdAt', 'updatedAt'],
  ) {
    properties.forEach((prop) => {
      if (domain[prop]) entity[prop] = domain[prop];
    });
  }
  protected static setFieldsToPersistence(
    entity: any,
    domain: any,
    properties: string[],
  ) {
    properties.forEach((prop) => {
      if (domain[prop]) entity[prop] = domain[prop];
    });
  }
}
