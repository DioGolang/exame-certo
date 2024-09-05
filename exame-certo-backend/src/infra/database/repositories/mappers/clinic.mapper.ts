import { ClinicEntity } from "../../entities/clinic.entity";
import { Clinic } from "../../../../domain/entities/clinic.entity";
import { ClinicBuilder } from "../../../../domain/builders/clinic.builder";

export class ClinicMapper{
  public static async toDomain(entity: ClinicEntity): Promise<Clinic> {
    const builder = await this.createOrRehydrateBuilder(entity);
    builder
      .withName(entity.name)
      .withEmail(entity.email)
      .withAddress(entity.address)
      .withContactInfo(entity.contactInfo)
    return builder.build();
  }

  public static toPersistence(domain: Clinic): ClinicEntity {
    const entity = new ClinicEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.address = domain.address;
    entity.contactInfo = domain.contactInfo;
    return entity;
  }

  private static async createOrRehydrateBuilder(entity: ClinicEntity): Promise<ClinicBuilder> {
    if (entity.id) {
      return ClinicBuilder.rehydrate(entity.id);
    }
    return ClinicBuilder.create();
  }
}