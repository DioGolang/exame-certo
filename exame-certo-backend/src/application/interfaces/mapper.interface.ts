export interface Mapper<Domain, Entity, Document, Dto> {
  toCreateClinicEventDto(domain: Domain): Dto;
  toDomain(entity: Entity): Domain;
  toPersistence(domain: Domain): Entity;
  toDocument(domain: Domain): Document;
}
