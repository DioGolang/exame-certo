import { PatientEntity } from "../../entities/patient.entity";
import { Patient } from "../../../../domain/entites/patient.entity";
import { Email } from "../../../../domain/value-objects/email.vo";

export class PatientMapper {

  public static toDomain(entity: PatientEntity): Patient {
    return new Patient(
      entity.id,
      entity.name,
      entity.lastName,
      new Email(entity.email),
      entity.passwordHash,
      entity.dateOfBirth,
      entity.sex,
      entity.maritalStatus,
      entity.address,
      entity.contactInfo,
      entity.socioeconomicInformation,
      entity.documentation,
      entity.healthInsurance
    );
  }

  public static toPersistence(domain: Patient): PatientEntity {
     const entity = new PatientEntity();
  //   entity.id = domain.id;
  //   entity.tenant_id = domain.tenantId;
  //   entity.name = domain.name;
  //   entity.lastName = domain.lastName;
  //   entity.email = domain.email;
  //   entity.passwordHash = domain.passwordHash;
  //   entity.dateOfBirth = domain.dateOfBirth;
  //   entity.sex = domain.sex;
  //   entity.maritalStatus = domain.maritalStatus;
  //   entity.address = domain.address;
  //   entity.contactInfo = domain.contactInfo;
  //   entity.socioeconomicInformation = domain.socioeconomicInformation;
  //   entity.documentation = domain.documentation;
  //   entity.healthInsurance = domain.healthInsurance;
    return entity;
   }
}
