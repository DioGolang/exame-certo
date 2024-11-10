import { Inject, Injectable } from '@nestjs/common';
import { Nursing } from '../../entities/nursing.entity';
import { NursingProps } from '../../interfaces/props/nursing-props.interface';
import { BuilderFactory } from '../../factories/build/builder.factory';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { UuidGenerator } from '../../interfaces/uuid-generator.interface';
import { NursingBuilder } from '../../builders/nursing.builder';
import { RegisterNursingCommand } from '../../../application/nursing/commands/register-nursing.command';

@Injectable()
export class NursingDomainService {
  constructor(
    @Inject('NursingBuilderFactory')
    private readonly nursingBuilderFactory: BuilderFactory<
      Nursing,
      NursingProps,
      NursingBuilder
    >,
    @Inject('UuidGenerator')
    private readonly uuidGeneratorService: UuidGenerator,
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
  ) {}

  async registerNursing(
    registerNursingCommand: RegisterNursingCommand,
  ): Promise<Nursing> {
    const id = this.uuidGeneratorService.generate();
    const passwordHash = await this.passwordHash.hash(
      registerNursingCommand.registerNursingDto.password,
    );
    const nursingBuilder = this.nursingBuilderFactory.createBuilder();
    return nursingBuilder
      .withId(id)
      .withPasswordHash(passwordHash)
      .withName(registerNursingCommand.registerNursingDto.name)
      .withEmail(registerNursingCommand.registerNursingDto.email)
      .withAddress(registerNursingCommand.registerNursingDto.address)
      .withContactInfo(registerNursingCommand.registerNursingDto.contactInfo)
      .withCOREN(registerNursingCommand.registerNursingDto.COREN)
      .withNursingLevel(registerNursingCommand.registerNursingDto.nursingLevel)
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .build();
  }
}
