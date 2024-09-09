import { Anamnesis } from '../../domain/entities/anamnesis.entity';
import { AnamnesisEntity } from '../../infra/database/entities/anamnesis.entity';
import { AnamnesisMapper } from '../../infra/database/repositories/mappers/anamnesis.mapper';
import { ExamMapper } from '../../infra/database/repositories/mappers/exam.mapper';
import { ClinicMapper } from '../../infra/database/repositories/mappers/clinic.mapper';
import { DocumentationMapper } from '../../infra/database/repositories/mappers/document.mapper';
import { Sex } from '../../domain/enums/sex.enum';
import { MaritalStatus } from '../../domain/enums/marital-status.enum';
import { DefaultBuilderFactory } from '../../domain/builders/default-builder.factory';
import { Patient } from '../../domain/entities/patient.entity';
import { PatientEntity } from '../../infra/database/entities/patient.entity';
import { Clinic } from '../../domain/entities/clinic.entity';
import { ClinicEntity } from '../../infra/database/entities/clinic.entity';
import { ExamEntity } from '../../infra/database/entities/exam.entity';
import { Exam } from '../../domain/entities/exam.entity';
import { ReportEntity } from '../../infra/database/entities/report.entity';
import { Doctor } from '../../domain/entities/doctor.entity';
import { DoctorEntity } from '../../infra/database/entities/doctor.entity';
import { Report } from '../../domain/entities/report.entity';

export class MapperUtils {
  private static builderFactory: DefaultBuilderFactory;

  constructor(builderFactory: DefaultBuilderFactory) {
    MapperUtils.builderFactory = builderFactory;
  }

  public static async toAnamnesisDomain(
    entity: AnamnesisEntity,
  ): Promise<Anamnesis> {
    const builder = await this.builderFactory.createAnamnesisBuilder(entity.id);

    const { PatientMapper } = await import(
      '../../infra/database/repositories/mappers/patient.mapper'
    );
    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );
    const { ClinicMapper } = await import(
      '../../infra/database/repositories/mappers/clinic.mapper'
    );

    builder
      .withPatient(await PatientMapper.toDomain(entity.patient))
      .withClinic(await ClinicMapper.toDomain(entity.clinic))
      .withDoctor(await DoctorMapper.toDomain(entity.doctor))
      .withIdentification(entity.identification)
      .withMainComplaint(entity.mainComplaint)
      .withHistoryOfPresentIllness(entity.historyOfPresentIllness)
      .withReviewOfSystems(entity.reviewOfSystems)
      .withPastMedicalHistory(entity.pastMedicalHistory)
      .withFamilyHistory(entity.familyHistory)
      .withSocialHistory(entity.socialHistory)
      .withPersonalHistory(entity.personalHistory)
      .withMedications(entity.medicines);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);

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
    const builder = await this.builderFactory.createPatientBuilder(
      entity.id,
      entity.passwordHash,
    );

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
      const anamnesisArray = await this.mapAnamnesis(entity.anamnesis);
      builder.withAnamnesis(anamnesisArray);
    }
    if (entity.exams) {
      const examArray = await this.mapExams(entity.exams);
      builder.withExams(examArray);
    }
    if (entity.clinics) {
      const clinicArray = await this.mapClinics(entity.clinics);
      builder.withClinics(clinicArray);
    }
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

  public static async toClinicDomain(entity: ClinicEntity): Promise<Clinic> {
    const builder = await this.builderFactory.createClinicBuilder(entity.id);

    builder
      .withName(entity.name)
      .withEmail(entity.email)
      .withAddress(entity.address)
      .withContactInfo(entity.contactInfo);

    return builder.build();
  }

  public static toClinicPersistence(domain: Clinic): ClinicEntity {
    const entity = new ClinicEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.address = domain.address;
    entity.contactInfo = domain.contactInfo;
    return entity;
  }

  public static async toDoctorDomain(entity: DoctorEntity): Promise<Doctor> {
    const builder = await this.builderFactory.createDoctorBuilder(entity.id);

    builder
      .withName(entity.name)
      .withEmail(entity.email)
      .withContactInfo(entity.contactInfo)
      .withProfessionalAddress(entity.professionalAddress)
      .withRegistrationNumber(entity.registrationNumber)
      .withSpecialization(entity.specialization);
    if (entity.anamnesis) {
      const anamnesisArray = await this.mapAnamnesis(entity.anamnesis);
      builder.withAnamnesis(anamnesisArray);
    }

    return builder.build();
  }

  public static toDoctorPersistence(domain: Doctor): DoctorEntity {
    const entity = new DoctorEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.contactInfo = domain.contactInfo;
    entity.professionalAddress = domain.professionalAddress;
    entity.registrationNumber = domain.registrationNumber;
    entity.specialization = domain.specialization;
    entity.anamnesis = domain.anamnesis.map(AnamnesisMapper.toPersistence);
    return entity;
  }

  public static async toExamDomain(entity: ExamEntity): Promise<Exam> {
    const builder = await this.builderFactory.createExamBuilder(entity.id);

    builder
      // .withPatient(entity.patient)
      // .withDoctor(entity.doctor)
      // .withClinic(entity.clinic)
      //.withReport(entity.report)
      .withDate(entity.date)
      .withType(entity.type)
      .withMethod(entity.method)
      .withValuesObtained(entity.valuesObtained)
      .withReferenceValues(entity.referenceValues)
      .withImages(entity.images)
      .withTUSSCode(entity.tussCode)
      .withCBHPMCode(entity.cbhpmCode)
      .withCIEFASCode(entity.ciefasCode)
      .withClinicalHistory(entity.clinicalHistory)
      .withMainComplaint(entity.mainComplaint);
    return builder.build();
  }

  public static toExamPersistence(domain: Exam): ExamEntity {
    const entity = new ExamEntity();
    entity.id = domain.id;
    // entity.patient = domain.patient;
    // entity.doctor = domain.doctor;
    // entity.clinic = domain.clinic;
    //entity.report = domain.report;
    entity.date = domain.date;
    entity.type = domain.type;
    entity.method = domain.method;
    entity.valuesObtained = domain.valuesObtained;
    entity.referenceValues = domain.referenceValues;
    entity.images = domain.images;
    entity.tussCode = domain.tussCode;
    entity.cbhpmCode = domain.cbhpmCode;
    entity.ciefasCode = domain.ciefasCode;
    entity.clinicalHistory = domain.clinicalHistory;
    entity.mainComplaint = domain.mainComplaint;
    return entity;
  }

  public static async toReportDomain(entity: ReportEntity): Promise<Report> {
    const builder = await this.builderFactory.createReportBuilder(entity.id);

    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );

    builder
      .withDoctor(await DoctorMapper.toDomain(entity.doctor))
      .withDate(entity.date)
      .withDiagnosis(entity.diagnosis)
      // .withCID10(entity.cid10)
      .withJustification(entity.justification)
      .withConduct(entity.conduct)
      .withHypothesis(entity.hypothesis)
      .withAdditionalInformation(entity.additionalInformation)
      .withSignature(entity.signature)
      .withPrognosis(entity.prognosis)
      .withRestStartDate(entity.rest_start_date)
      .withRestDuration(entity.rest_duration)
      .withTherapeuticConduct(entity.therapeutic_conduct)
      .withClinicalEvolution(entity.clinical_evolution)
      .withHealthConsequences(entity.health_consequences)
      .withConsultationReason(entity.consultation_reason)
      .withIllnessHistory(entity.illness_history);
    // if (entity.exams) {
    //   const examArray = await this.mapAnamnesis(entity.exams);
    //   builder.withExam(examArray);
    // }
    return builder.build();
  }

  public static toReportPersistence(domain: Report): ReportEntity {
    const entity = new ReportEntity();
    entity.id = domain.id;
    //entity.doctor = domain.doctor;
    entity.date = domain.date;
    entity.diagnosis = domain.diagnosis;
    // entity.cid10 = domain.cid10;
    entity.justification = domain.justification;
    entity.conduct = domain.conduct;
    entity.hypothesis = domain.hypothesis;
    entity.additionalInformation = domain.additionalInformation;
    entity.signature = domain.signature;
    entity.prognosis = domain.prognosis;
    entity.rest_start_date = domain.rest_start_date;
    entity.rest_duration = domain.rest_duration;
    entity.therapeutic_conduct = domain.therapeutic_conduct;
    entity.clinical_evolution = domain.clinical_evolution;
    entity.health_consequences = domain.health_consequences;
    entity.consultation_reason = domain.consultation_reason;
    entity.illness_history = domain.illness_history;
    // entity.exams = domain.exams.map(ExamMapper.toPersistence);
    return entity;
  }

  private static async mapAnamnesis(
    anamnesisEntities: AnamnesisEntity[],
  ): Promise<Anamnesis[]> {
    return MapperUtils.mapEntitiesToDomain<AnamnesisEntity, Anamnesis>(
      anamnesisEntities,
      '../../infra/database/repositories/mappers/anamnesis.mapper',
    );
  }

  private static async mapClinics(
    clinicEntities: ClinicEntity[],
  ): Promise<Clinic[]> {
    return MapperUtils.mapEntitiesToDomain<ClinicEntity, Clinic>(
      clinicEntities,
      '../../infra/database/repositories/mappers/clinic.mapper',
    );
  }

  private static async mapExams(examEntities: ExamEntity[]): Promise<Exam[]> {
    return MapperUtils.mapEntitiesToDomain<ExamEntity, Exam>(
      examEntities,
      '../../infra/database/repositories/mappers/exam.mapper',
    );
  }

  private static async mapDoctors(
    doctorEntities: DoctorEntity[],
  ): Promise<Doctor[]> {
    return MapperUtils.mapEntitiesToDomain<DoctorEntity, Doctor>(
      doctorEntities,
      '../../infra/database/repositories/mappers/doctor.mapper',
    );
  }

  private static async mapReports(
    reportEntities: ReportEntity[],
  ): Promise<Report[]> {
    return MapperUtils.mapEntitiesToDomain<ReportEntity, Report>(
      reportEntities,
      '../../infra/database/repositories/mappers/report.mapper',
    );
  }

  private static async mapPatients(
    patientEntities: PatientEntity[],
  ): Promise<Patient[]> {
    return MapperUtils.mapEntitiesToDomain<PatientEntity, Patient>(
      patientEntities,
      '../../infra/database/repositories/mappers/patient.mapper',
    );
  }

  private static async mapEntitiesToDomain<T, U>(
    entities: T[],
    mapperPath: string,
  ): Promise<U[]> {
    const { default: Mapper } = await import(mapperPath);
    const domainPromises = entities.map((entity) => Mapper.toDomain(entity));
    return Promise.all(domainPromises);
  }
}
