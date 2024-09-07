import { Anamnesis } from "../../domain/entities/anamnesis.entity";
import { AnamnesisEntity } from "../../infra/database/entities/anamnesis.entity";
import { AnamnesisBuilder } from "../../domain/builders/anamnesisBuilder";
import { BuilderFactory } from "../../domain/builders/builder.factory";
import { PatientEntity } from "../../infra/database/entities/patient.entity";
import { Patient } from "../../domain/entities/patient.entity";
import { AnamnesisMapper } from "../../infra/database/repositories/mappers/anamnesis.mapper";
import { ExamMapper } from "../../infra/database/repositories/mappers/exam.mapper";
import { ClinicMapper } from "../../infra/database/repositories/mappers/clinic.mapper";
import { DocumentationMapper } from "../../infra/database/repositories/mappers/document.mapper";
import { Sex } from "../../domain/enums/sex.enum";
import { MaritalStatus } from "../../domain/enums/marital-status.enum";
import { DefaultBuilderFactory } from "../../domain/builders/default-builder.factory";


export class MapperUtils{

  private static builderFactory: DefaultBuilderFactory;

  constructor(builderFactory: DefaultBuilderFactory) {
    MapperUtils.builderFactory = builderFactory;
  }

  public static async toAnamnesisDomain(entity: AnamnesisEntity): Promise<Anamnesis> {
    const builder = await this.builderFactory.createAnamnesisBuilder(entity.id);

    const { PatientMapper } = await import("../../infra/database/repositories/mappers/patient.mapper");
    builder
      .withPatient(await PatientMapper.toDomain(entity.patient))
      .withIdentification(entity.identification)
      .withMainComplaint(entity.mainComplaint)
      .withHistoryOfPresentIllness(entity.historyOfPresentIllness)
      .withReviewOfSystems(entity.reviewOfSystems)
      .withPastMedicalHistory(entity.pastMedicalHistory)
      .withFamilyHistory(entity.familyHistory)
      .withSocialHistory(entity.socialHistory)
      .withPersonalHistory(entity.personalHistory);

    return builder.build();
  }

  public static toAnamnesisPersistence(domain: Anamnesis): AnamnesisEntity {
    const entity = new AnamnesisEntity();
    entity.id = domain.id;
    // entity.patient = domain.patient;
    // entity.doctor = domain.doctor;
    //entity.clinic = domain.clinic;
    entity.identification = domain.identification;
    entity.mainComplaint = domain.mainComplaint;
    entity.historyOfPresentIllness = domain.historyOfPresentIllness;
    entity.reviewOfSystems = domain.reviewOfSystems;
    entity.pastMedicalHistory = domain.pastMedicalHistory;
    entity.familyHistory = domain.familyHistory;
    entity.socialHistory = domain.socialHistory;
    entity.personalHistory = domain.personalHistory;
    return entity;
  }


  public static async toPatientDomain(entity: PatientEntity): Promise<Patient> {
    const documentation = DocumentationMapper.toDto(entity.documentation);
    const builder = await this.builderFactory.createPatientBuilder(entity.id, entity.passwordHash);

    const { AnamnesisMapper } = await import("../../infra/database/repositories/mappers/anamnesis.mapper");


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

    if (entity.anamnesis) {
      const anamnesisPromises = entity.anamnesis.map(anamnesis => AnamnesisMapper.toDomain(anamnesis));
      const anamnesisArray = await Promise.all(anamnesisPromises);
      builder.withAnamnesis(anamnesisArray);
    }
    // if (entity.exams) {
    //   entity.exams.forEach(exam => builder.addExam(ExamMapper.toDomain(exam)));
    // }
    // if (entity.clinics) {
    //   entity.clinics.forEach(clinic => builder.addClinic(ClinicMapper.toDomain(clinic)));
    // }

    return builder.build();
  }

  public static toPatientPersistence(domain: Patient): PatientEntity {
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

}