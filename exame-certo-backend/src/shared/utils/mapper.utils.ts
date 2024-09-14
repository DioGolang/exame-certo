import { Anamnesis } from '../../domain/entities/anamnesis.entity';
import { AnamnesisEntity } from '../../infra/database/entities/anamnesis.entity';
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
import { AddressMapper } from '../../infra/database/repositories/mappers/address.mapper';

type Mapper<T> = {
  toPersistence(domain: T): any;
};

export class MapperUtils {
  private static builderFactory: DefaultBuilderFactory;

  constructor(builderFactory: DefaultBuilderFactory) {
    MapperUtils.builderFactory = builderFactory;
  }

  public static async toAnamnesisDomain(
    entity: AnamnesisEntity,
  ): Promise<Anamnesis> {
    const builder = await this.builderFactory.createAnamnesisBuilder(entity.id);

    // const { PatientMapper } = await import(
    //   '../../application/mappers/patient.mapper'
    // );
    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );
    // const { ClinicMapper } = await import(
    //   '../../infra/database/repositories/mappers/clinic.mapper'
    // );

    builder
      // .withPatient(await PatientMapper.toDomain(entity.patient))
      // .withClinic(await ClinicMapper.toDomain(entity.clinic))
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

  public static async toAnamnesisPersistence(
    domain: Anamnesis,
  ): Promise<AnamnesisEntity> {
    const entity = new AnamnesisEntity();
    // const { PatientMapper } = await import(
    //   '../../application/mappers/patient.mapper'
    // );
    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );
    // const { ClinicMapper } = await import(
    //   '../../infra/database/repositories/mappers/clinic.mapper'
    // );
    entity.id = domain.id;
    // entity.patient = await PatientMapper.toPersistence(domain.patient);
    entity.doctor = await DoctorMapper.toPersistence(domain.doctor);
    // entity.clinic = await ClinicMapper.toPersistence(domain.clinic);
    entity.identification = domain.identification;
    entity.mainComplaint = domain.mainComplaint;
    entity.historyOfPresentIllness = domain.historyOfPresentIllness;
    entity.reviewOfSystems = domain.reviewOfSystems;
    entity.pastMedicalHistory = domain.pastMedicalHistory;
    entity.familyHistory = domain.familyHistory;
    entity.socialHistory = domain.socialHistory;
    entity.personalHistory = domain.personalHistory;
    entity.medicines = domain.medicines;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }

  public static async toPatientDomain(entity: PatientEntity): Promise<Patient> {
    const { DocumentationMapper } = await import(
      '../../infra/database/repositories/mappers/document.mapper'
    );
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
      .withSocioeconomicInformation(entity.socioeconomicInformation);
    if (entity.healthInsurance) builder.withCreatedAt(entity.createdAt);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
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

  public static async toPatientPersistence(
    domain: Patient,
  ): Promise<PatientEntity> {
    const entity = new PatientEntity();
    // const { ClinicMapper } = await import(
    //   '../../infra/database/repositories/mappers/clinic.mapper'
    // );
    const { ExamMapper } = await import(
      '../../infra/database/repositories/mappers/exam.mapper'
    );
    const { AnamnesisMapper } = await import(
      '../../infra/database/repositories/mappers/anamnesis.mapper'
    );
    entity.id = domain.id;
    entity.name = domain.name;
    entity.lastName = domain.lastName;
    entity.email = domain.email;
    entity.dateOfBirth = domain.dateOfBirth;
    entity.sex = domain.sex;
    entity.maritalStatus = domain.maritalStatus;
    entity.address = domain.address;
    entity.contactInfo = domain.contactInfo;
    entity.socioeconomicInformation = domain.socioeconomicInformation;
    entity.documentation = domain.documentation;
    entity.healthInsurance = domain.healthInsurance;
    entity.anamnesis = await Promise.all(
      domain.anamnesis.map(AnamnesisMapper.toPersistence),
    );
    entity.exams = await Promise.all(
      domain.exams.map(ExamMapper.toPersistence),
    );
    // entity.clinics = await Promise.all(
    //   domain.clinics.map(ClinicMapper.toPersistence),
    // );
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }

  public static async toClinicDomain(entity: ClinicEntity): Promise<Clinic> {
    const builder = await this.builderFactory.createClinicBuilder(entity.id);
    const addressDto = AddressMapper.toDto(entity.address);

    builder
      .withName(entity.name)
      .withEmail(entity.email)
      .withAddress(addressDto)
      .withContactInfo(entity.contactInfo);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
    if (entity.anamnesis) {
      const anamnesisArray = await this.mapAnamnesis(entity.anamnesis);
      builder.withAnamnesis(anamnesisArray);
    }
    if (entity.exams) {
      const examArray = await this.mapExams(entity.exams);
      builder.withExams(examArray);
    }
    if (entity.patients) {
      const patientsArray = await this.mapPatients(entity.patients);
      builder.withPatients(patientsArray);
    }
    if (entity.doctors) {
      const DoctorsArray = await this.mapDoctors(entity.doctors);
      builder.withDoctors(DoctorsArray);
    }
    return builder.build();
  }

  public static async toClinicPersistence(
    domain: Clinic,
  ): Promise<ClinicEntity> {
    const entity = new ClinicEntity();
    // const { PatientMapper } = await import(
    //   '../../application/mappers/patient.mapper'
    // );
    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );
    const { ExamMapper } = await import(
      '../../infra/database/repositories/mappers/exam.mapper'
    );
    const { AnamnesisMapper } = await import(
      '../../infra/database/repositories/mappers/anamnesis.mapper'
    );
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.address = domain.address;
    entity.contactInfo = domain.contactInfo;
    entity.anamnesis = await Promise.all(
      domain.anamnesis.map(AnamnesisMapper.toPersistence),
    );
    entity.exams = await Promise.all(
      domain.exams.map(ExamMapper.toPersistence),
    );
    entity.doctors = await Promise.all(
      domain.doctors.map(DoctorMapper.toPersistence),
    );
    // entity.patients = await Promise.all(
    //   domain.patients.map(PatientMapper.toPersistence),
    // );
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
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
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);

    if (entity.anamnesis) {
      const anamnesisArray = await this.mapAnamnesis(entity.anamnesis);
      builder.withAnamnesis(anamnesisArray);
    }
    if (entity.exams) {
      const examsArray = await this.mapExams(entity.exams);
      builder.withExams(examsArray);
    }
    if (entity.reports) {
      const reportsArray = await this.mapReports(entity.reports);
      builder.withReport(reportsArray);
    }
    if (entity.clinics) {
      const clinicsArray = await this.mapClinics(entity.clinics);
      builder.withClinics(clinicsArray);
    }

    return builder.build();
  }

  public static async toDoctorPersistence(
    domain: Doctor,
  ): Promise<DoctorEntity> {
    const entity = new DoctorEntity();
    // const { ClinicMapper } = await import(
    //   '../../infra/database/repositories/mappers/clinic.mapper'
    // );
    const { ReportMapper } = await import(
      '../../infra/database/repositories/mappers/report.mapper'
    );
    const { ExamMapper } = await import(
      '../../infra/database/repositories/mappers/exam.mapper'
    );
    const { AnamnesisMapper } = await import(
      '../../infra/database/repositories/mappers/anamnesis.mapper'
    );
    entity.id = domain.id;
    entity.name = domain.name;
    entity.email = domain.email;
    entity.contactInfo = domain.contactInfo;
    entity.professionalAddress = domain.professionalAddress;
    entity.registrationNumber = domain.registrationNumber;
    entity.specialization = domain.specialization;
    entity.anamnesis = await Promise.all(
      domain.anamnesis.map(AnamnesisMapper.toPersistence),
    );
    entity.reports = await Promise.all(
      domain.reports.map(ReportMapper.toPersistence),
    );
    // entity.clinics = await Promise.all(
    //   domain.clinics.map(ClinicMapper.toPersistence),
    // );
    entity.exams = await Promise.all(
      domain.exams.map(ExamMapper.toPersistence),
    );
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
    return entity;
  }

  public static async toExamDomain(entity: ExamEntity): Promise<Exam> {
    const builder = await this.builderFactory.createExamBuilder(entity.id);
    // const { PatientMapper } = await import(
    //   '../../application/mappers/patient.mapper'
    // );
    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );
    // const { ClinicMapper } = await import(
    //   '../../infra/database/repositories/mappers/clinic.mapper'
    // );

    builder
      // .withPatient(await PatientMapper.toDomain(entity.patient))
      // .withClinic(await ClinicMapper.toDomain(entity.clinic))
      .withDoctor(await DoctorMapper.toDomain(entity.doctor))
      .withDate(entity.date)
      .withType(entity.type)
      .withMethod(entity.method)
      .withValuesObtained(entity.valuesObtained)
      .withReferenceValues(entity.referenceValues)
      .withImages(entity.images)
      .withTUSSCode(entity.TUSSCode)
      .withCBHPMCode(entity.CBHPMCode)
      .withCIEFASCode(entity.CIEFASCode)
      .withClinicalHistory(entity.clinicalHistory)
      .withMainComplaint(entity.mainComplaint);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
    if (entity.reports) {
      const reportsArray = await this.mapReports(entity.reports);
      builder.withReports(reportsArray);
    }

    return builder.build();
  }

  public static async toExamPersistence(domain: Exam): Promise<ExamEntity> {
    const entity = new ExamEntity();

    // const { PatientMapper } = await import(
    //   '../../application/mappers/patient.mapper'
    // );
    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );
    // const { ClinicMapper } = await import(
    //   '../../infra/database/repositories/mappers/clinic.mapper'
    // );
    const { ReportMapper } = await import(
      '../../infra/database/repositories/mappers/report.mapper'
    );

    entity.id = domain.id;
    // entity.patient = await PatientMapper.toPersistence(domain.patient);
    entity.doctor = await DoctorMapper.toPersistence(domain.doctor);
    // entity.clinic = await ClinicMapper.toPersistence(domain.clinic);
    entity.reports = await Promise.all(
      domain.reports.map(ReportMapper.toPersistence),
    );
    entity.date = domain.date;
    entity.type = domain.type;
    entity.method = domain.method;
    entity.valuesObtained = domain.valuesObtained;
    entity.referenceValues = domain.referenceValues;
    entity.images = domain.images;
    entity.TUSSCode = domain.tussCode;
    entity.CBHPMCode = domain.cbhpmCode;
    entity.CIEFASCode = domain.ciefasCode;
    entity.clinicalHistory = domain.clinicalHistory;
    entity.mainComplaint = domain.mainComplaint;
    if (domain.createdAt) entity.createdAt = domain.createdAt;
    if (domain.updatedAt) entity.updatedAt = domain.updatedAt;
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
      .withCID10(entity.CID10)
      .withJustification(entity.justification)
      .withConduct(entity.conduct)
      .withHypothesis(entity.hypothesis)
      .withAdditionalInformation(entity.additionalInformation)
      .withSignature(entity.signature)
      .withPrognosis(entity.prognosis)
      .withRestStartDate(entity.restStartDate)
      .withRestDuration(entity.restDuration)
      .withTherapeuticConduct(entity.therapeuticConduct)
      .withClinicalEvolution(entity.clinicalEvolution)
      .withHealthConsequences(entity.healthConsequences)
      .withConsultationReason(entity.consultationReason)
      .withIllnessHistory(entity.illnessHistory);
    if (entity.createdAt) builder.withCreatedAt(entity.createdAt);
    if (entity.updatedAt) builder.withUpdatedAt(entity.updatedAt);
    if (entity.exams) {
      const examArray = await this.mapExams(entity.exams);
      builder.withExam(examArray);
    }
    return builder.build();
  }

  public static async toReportPersistence(
    domain: Report,
  ): Promise<ReportEntity> {
    const entity = new ReportEntity();
    const { DoctorMapper } = await import(
      '../../infra/database/repositories/mappers/doctor.mapper'
    );
    const { ExamMapper } = await import(
      '../../infra/database/repositories/mappers/exam.mapper'
    );
    entity.id = domain.id;
    entity.doctor = await DoctorMapper.toPersistence(domain.doctor);
    entity.date = domain.date;
    entity.diagnosis = domain.diagnosis;
    entity.CID10 = domain.CID10;
    entity.justification = domain.justification;
    entity.conduct = domain.conduct;
    entity.hypothesis = domain.hypothesis;
    entity.additionalInformation = domain.additionalInformation;
    entity.signature = domain.signature;
    entity.prognosis = domain.prognosis;
    entity.restStartDate = domain.restStartDate;
    entity.restDuration = domain.restDuration;
    entity.therapeuticConduct = domain.therapeuticConduct;
    entity.clinicalEvolution = domain.clinicalEvolution;
    entity.healthConsequences = domain.healthConsequences;
    entity.consultationReason = domain.consultationReason;
    entity.illnessHistory = domain.illnessHistory;
    entity.exams = await Promise.all(
      domain.exams.map(ExamMapper.toPersistence),
    );
    if (entity.createdAt) entity.createdAt = domain.createdAt;
    if (entity.updatedAt) entity.updatedAt = domain.updatedAt;
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
      '../../infra/database/repositories/mappers/reports.mapper',
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

  private static async mapPatientsToPersistence(
    patients: Patient[],
  ): Promise<PatientEntity[]> {
    const mappedEntities: PatientEntity[] = [];
    for (const patient of patients) {
      const mappedEntity = await MapperUtils.mapToPersistence<Patient>(
        patient,
        '../../infra/database/repositories/mappers/patient.mapper',
        new PatientEntity(),
      );
      mappedEntities.push(mappedEntity);
    }

    return mappedEntities;
  }

  public static async mapEntitiesToDomain<T, U>(
    entities: T[],
    mapperPath: string,
  ): Promise<U[]> {
    const { default: Mapper } = await import(mapperPath);
    const domainPromises = entities.map((entity) => Mapper.toDomain(entity));
    return Promise.all(domainPromises);
  }
  private static async mapToPersistence<T>(
    domain: T,
    mapperPath: string,
    entity: any,
  ): Promise<any> {
    const { default: Mapper }: { default: Mapper<T> } = await import(
      mapperPath
    );
    entity.id = domain['id'];
    entity[domain.constructor.name.toLowerCase()] =
      Mapper.toPersistence(domain);
    return entity;
  }

  private static getMapperPath(entityName: string): string | undefined {
    const mapperPathMap: { [key: string]: string } = {
      anamnesis: '../../infra/database/repositories/mappers/anamnesis.mapper',
      clinic: '../../infra/database/repositories/mappers/clinic.mapper',
      exam: '../../infra/database/repositories/mappers/exam.mapper',
      doctor: '../../infra/database/repositories/mappers/doctor.mapper',
      report: '../../infra/database/repositories/mappers/reports.mapper',
      patient: '../../infra/database/repositories/mappers/patient.mapper',
    };
    return mapperPathMap[entityName.toLowerCase()];
  }
}
