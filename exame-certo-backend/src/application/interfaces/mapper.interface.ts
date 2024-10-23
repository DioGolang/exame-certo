export interface Mapper<Domain, Entity, Document, Dto> {
  toRegisteredDomainEventDto(domain: Domain): Dto;
  fromEventDtoToDomain(dto: Dto): Promise<Domain>;
  toDomain(entity: Entity): Promise<Domain>;
  toPersistence(domain: Domain): Entity;
  toDocument(domain: Domain): Document;
  documentForDomain(document: Document): Promise<Domain>;
  fromRegisteredEntityEventDtoToDocument(event: Dto): Document;
}
