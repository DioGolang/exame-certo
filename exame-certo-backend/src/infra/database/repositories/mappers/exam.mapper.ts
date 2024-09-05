import { ExamEntity } from "../../entities/exam.entity";
import { Exam } from "../../../../domain/entities/exam.entity";
import { ExamBuilder } from "../../../../domain/builders/examBuilder";

export class ExamMapper{
    public static async toDomain(entity: ExamEntity): Promise<Exam> {
        const builder = await this.createOrRehydrateBuilder(entity);
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

    public static toPersistence(domain: Exam): ExamEntity {
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

    private static async createOrRehydrateBuilder(entity: ExamEntity): Promise<ExamBuilder> {
        if (entity.id) {
            return  ExamBuilder.rehydrate(entity.id);
        }
        return ExamBuilder.create();
    }
}