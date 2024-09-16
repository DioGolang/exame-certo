export interface MapperFactory<T, D> {
  mapRelationshipsToDomain(entity: T): Promise<any>;
  mapRelationshipsToPersistence(domain: D): Promise<any>;
}
