import { AnamnesisEntity } from '../../entities/anamnesis.entity';
import { Anamnesis } from '../../../../domain/entities/anamnesis.entity';
import { Injectable } from '@nestjs/common';
import { BaseMapper } from './base.mapper';

@Injectable()
export class AnamnesisMapper extends BaseMapper<Anamnesis, AnamnesisEntity> {
  public async toDomain(entity: AnamnesisEntity): Promise<Anamnesis> {
    const builder = await this.builder.createAnamnesisBuilder(entity.id);

    builder
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

  public async toPersistence(domain: Anamnesis): Promise<AnamnesisEntity> {
    const entity = new AnamnesisEntity();
    BaseMapper.setCommonFieldsToPersistence(domain, entity);
    BaseMapper.setFieldsToPersistence(domain, entity, [
      'identification',
      'mainComplaint',
      'historyOfPresentIllness',
      'reviewOfSystems',
      'pastMedicalHistory',
      'familyHistory',
      'socialHistory',
      'personalHistory',
      'medications',
    ]);
    return entity;
  }
}
