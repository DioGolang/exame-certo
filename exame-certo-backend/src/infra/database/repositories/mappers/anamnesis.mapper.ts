import { AnamnesisEntity } from "../../entities/anamnesis.entity";
import { Anamnesis } from "../../../../domain/entities/anamnesis.entity";
import { MapperUtils } from "../../../../shared/utils/mapper.utils";

export class AnamnesisMapper {
  public static async toDomain(entity: AnamnesisEntity): Promise<Anamnesis> {
    return MapperUtils.toAnamnesisDomain(entity);
  }

  public static toPersistence(domain: Anamnesis): AnamnesisEntity {
    return MapperUtils.toAnamnesisPersistence(domain);
  }

}