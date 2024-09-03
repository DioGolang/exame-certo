import { Patient } from "../../entities/patient.entity";
import { Doctor } from "../../entities/doctor.entity";
import { Clinic } from "../../entities/clinic.entity";
import { ExamValues } from "../../value-objects/exam-values.vo";
import { ReferenceValues } from "../../value-objects/reference-values.vo";
import { TUSSCode } from "../../value-objects/tuss-code.vo";
import { CBHPMCode } from "../../value-objects/cbhpm-code.vo";
import { CIEFASCode } from "../../value-objects/ciefas-code.vo";
import { Report } from "../../entities/report.entity";

export interface ExamProps{
  patient: Patient;
  doctor: Doctor;
  clinic: Clinic;
  report: Report;
  date: Date;
  type: string;
  method: string;
  valuesObtained: ExamValues;
  referenceValues: ReferenceValues;
  images: string[];
  TUSSCode: TUSSCode;
  CBHPMCode: CBHPMCode;
  CIEFASCode: CIEFASCode;
  clinicalHistory: string;
  mainComplaint: string;
}