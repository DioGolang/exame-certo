import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbConfig } from '../../../../config/mongodb.config';
import { Clinic, ClinicSchema } from '../../../mongodb/schemas/clinic.schema';
import {
  Address,
  AddressSchema,
} from '../../../mongodb/schemas/address.schema';
import {
  AdditionalInformation,
  AdditionalInformationSchema,
} from '../../../mongodb/schemas/additional-information.schema';
import {
  CBHPMCode,
  CBHPMCodeSchema,
} from '../../../mongodb/schemas/cbhpm-code.schema';
import { CID10, CID10Schema } from '../../../mongodb/schemas/cid.schema';
import {
  CIEFASCode,
  CIEFASCodeSchema,
} from '../../../mongodb/schemas/ciefas-code.schema';
import {
  ContactInfo,
  ContactInfoSchema,
} from '../../../mongodb/schemas/contact-info.schema';
import {
  Documentation,
  DocumentationSchema,
} from '../../../mongodb/schemas/documentation.schema';
import {
  Identification,
  IdentificationSchema,
} from '../../../mongodb/schemas/identification.schema';
import {
  Medicine,
  MedicineSchema,
} from '../../../mongodb/schemas/medicine.schema';
import {
  PersonalHistory,
  PersonalHistorySchema,
} from '../../../mongodb/schemas/personal-history.schema';
import {
  ReferenceValues,
  ReferenceValuesSchema,
} from '../../../mongodb/schemas/reference-values.schema';
import {
  Signature,
  SignatureSchema,
} from '../../../mongodb/schemas/signature.schema';
import {
  SocioEconomicInformation,
  SocioEconomicInformationSchema,
} from '../../../mongodb/schemas/socio-economic-information.schema';
import {
  TUSSCode,
  TUSSCodeSchema,
} from '../../../mongodb/schemas/tuss-code.schema';
import { Doctor, DoctorSchema } from '../../../mongodb/schemas/doctor.schema';
import {
  Patient,
  PatientSchema,
} from '../../../mongodb/schemas/patient.schema';
import {
  DoctorClinic,
  DoctorClinicSchema,
} from '../../../mongodb/schemas/doctor-clinic.schema';
import {
  PatientClinic,
  PatientClinicSchema,
} from '../../../mongodb/schemas/patient-clinic.schema';
import { Exam, ExamSchema } from '../../../mongodb/schemas/exam.schema';
import { Report, ReportSchema } from '../../../mongodb/schemas/report.schema';
import {
  ExamReport,
  ExamReportSchema,
} from '../../../mongodb/schemas/exam-report.schema';
import {
  Attendant,
  AttendantSchema,
} from '../../../mongodb/schemas/attendant.schema';
import {
  Consultation,
  ConsultationSchema,
} from '../../../mongodb/schemas/consultation.schema';
import {
  Nursing,
  NursingSchema,
} from '../../../mongodb/schemas/nursing.schema';
import {
  Service,
  ServiceSchema,
} from '../../../mongodb/schemas/service.schema';
import {
  Procedure,
  ProcedureSchema,
} from '../../../mongodb/schemas/procedure.schema';
import {
  Scheduling,
  SchedulingSchema,
} from '../../../mongodb/schemas/scheduling.schema';
import { Screening, ScreeningSchema } from '../../../mongodb/schemas/screening.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(mongodbConfig.uri),
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
      { name: ContactInfo.name, schema: ContactInfoSchema },
      { name: AdditionalInformation.name, schema: AdditionalInformationSchema },
      { name: CBHPMCode.name, schema: CBHPMCodeSchema },
      { name: CID10.name, schema: CID10Schema },
      { name: CIEFASCode.name, schema: CIEFASCodeSchema },
      { name: TUSSCode.name, schema: TUSSCodeSchema },
      { name: Documentation.name, schema: DocumentationSchema },
      { name: Identification.name, schema: IdentificationSchema },
      { name: Medicine.name, schema: MedicineSchema },
      { name: PersonalHistory.name, schema: PersonalHistorySchema },
      { name: ReferenceValues.name, schema: ReferenceValuesSchema },
      { name: Signature.name, schema: SignatureSchema },
      {
        name: SocioEconomicInformation.name,
        schema: SocioEconomicInformationSchema,
      },
      { name: Clinic.name, schema: ClinicSchema },
      { name: Doctor.name, schema: DoctorSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: DoctorClinic.name, schema: DoctorClinicSchema },
      { name: PatientClinic.name, schema: PatientClinicSchema },
      { name: Exam.name, schema: ExamSchema },
      { name: Report.name, schema: ReportSchema },
      { name: ExamReport.name, schema: ExamReportSchema },
      { name: Attendant.name, schema: AttendantSchema },
      { name: Consultation.name, schema: ConsultationSchema },
      { name: Nursing.name, schema: NursingSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Procedure.name, schema: ProcedureSchema },
      { name: Scheduling.name, schema: SchedulingSchema },
      { name: Screening.name, schema: ScreeningSchema },
    ]),
  ],
  providers: [],
  exports: [],
})
export class MongodbConfigModule {}
