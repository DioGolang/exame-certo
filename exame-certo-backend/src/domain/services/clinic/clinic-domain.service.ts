import { Inject, Injectable } from '@nestjs/common';
import { BuilderFactory } from '../../builders/builder.factory';
import { CreateClinicDto } from '../../../application/clinic/dto/create-clinic.dto';
import { Clinic } from '../../entities/clinic.entity';
import { ClinicEntity } from '../../../infra/persistence/postgres/entities/clinic.entity';

@Injectable()
export class ClinicDomainService {
  constructor(
    @Inject('BuilderFactory')
    private readonly clinicBuilderFactory: BuilderFactory,
  ) {}

  async createClinic(clinicDto: CreateClinicDto): Promise<Clinic> {
    const clinicBuilder = await this.clinicBuilderFactory.createClinicBuilder(
      undefined,
      clinicDto.password,
    );
    return clinicBuilder
      .withName(clinicDto.name)
      .withEmail(clinicDto.email)
      .withAddress(clinicDto.address)
      .withContactInfo(clinicDto.contactInfo)
      .build();
  }

  async rehydrateClinic(clinicEntity: ClinicEntity): Promise<Clinic> {
    const clinicBuilder = await this.clinicBuilderFactory.createClinicBuilder(
      clinicEntity.id,
      clinicEntity.password,
    );

    const clinic = clinicBuilder
      .withName(clinicEntity.name)
      .withEmail(clinicEntity.email)
      .withAddress(clinicEntity.address)
      .withContactInfo(clinicEntity.contactInfo)
      .build();

    return clinic;
  }
}
