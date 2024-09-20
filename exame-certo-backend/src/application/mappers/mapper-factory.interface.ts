export interface MapperFactory<TPersistence, TDomain> {
  mapRelationshipsToDomain(entity: TPersistence): Promise<any>;
  mapRelationshipsToPersistence(domain: TDomain): Promise<any>;
}
