import { PatientEntity } from "../../entities/patient.entity";
import { Patient } from "../../../../domain/entities/patient.entity";
import { PatientBuilder } from "../../../../domain/builders/patient.builder";
import { Sex } from "../../../../domain/enums/sex.enum";
import { MaritalStatus } from "../../../../domain/enums/marital-status.enum";
import { DocumentationMapper } from "./document.mapper";
import { AnamnesisMapper } from "./anamnesis.mapper";
import { ClinicMapper } from "./clinic.mapper";
import { ExamMapper } from "./exam.mapper";

export class PatientMapper {

  public static async toDomain(entity: PatientEntity): Promise<Patient> {
    const documentation = DocumentationMapper.toDto(entity.documentation);
    const builder = await this.createOrRehydrateBuilder(entity);

    builder
      .withName(entity.name)
      .withLastName(entity.lastName)
      .withEmail(entity.email)
      .withDateOfBirth(entity.dateOfBirth)
      .withSex(entity.sex as Sex)
      .withMaritalStatus(entity.maritalStatus as MaritalStatus)
      .withAddress(entity.address)
      .withContactInfo(entity.contactInfo)
      .withDocumentation(documentation)
      .withSocioeconomicInformation(entity.socioeconomicInformation)
      .withHealthInsurance(entity.healthInsurance);

    return builder.build();
  }

  public static toPersistence(domain: Patient): PatientEntity {
    const entity = new PatientEntity();

    entity.id = domain.id;
    entity.name = domain.name;
    entity.lastName = domain.lastName;
    entity.email = domain.email;
    entity.passwordHash = domain.passwordHash;
    entity.dateOfBirth = domain.dateOfBirth;
    entity.sex = domain.sex;
    entity.maritalStatus = domain.maritalStatus;
    entity.address = domain.address;
    entity.contactInfo = domain.contactInfo;
    entity.socioeconomicInformation = domain.socioeconomicInformation;
    entity.documentation = domain.documentation;
    entity.healthInsurance = domain.healthInsurance;
    entity.anamnesis = domain.anamnesis.map(AnamnesisMapper.toPersistence);
    entity.exams = domain.exams.map(ExamMapper.toPersistence);
    entity.clinics = domain.clinics.map(ClinicMapper.toPersistence);
    entity.createdAt = domain.createdAt || new Date();
    entity.updatedAt = domain.updatedAt || new Date();

    return entity;
  }

  private static async createOrRehydrateBuilder(entity: PatientEntity): Promise<PatientBuilder> {
    if (entity.id) {
      return PatientBuilder.rehydrate(entity.id, entity.passwordHash);
    }
    return PatientBuilder.create(entity.passwordHash);
  }

}
