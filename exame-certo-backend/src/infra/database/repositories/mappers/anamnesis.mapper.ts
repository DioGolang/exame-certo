import { AnamnesisEntity } from "../../entities/anamnesis.entity";
import { Anamnesis } from "../../../../domain/entities/anamnesis.entity";
import { AnamnesisBuilder } from "../../../../domain/builders/anamnesisBuilder";

export class AnamnesisMapper {
  public static toDomain(entity: AnamnesisEntity): Anamnesis {
    const builder = this.createOrRehydrateBuilder(entity);
    builder
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

  public static toPersistence(domain: Anamnesis): AnamnesisEntity {
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

  private static createOrRehydrateBuilder(entity: AnamnesisEntity): AnamnesisBuilder {
    if (entity.id) {
      return AnamnesisBuilder.rehydrate(entity.id);
    }
    return AnamnesisBuilder.create();
  }
}