import { Inject, Injectable } from '@nestjs/common';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { UuidGenerator } from '../../interfaces/uuid-generator.interface';
import { Attendant } from '../../entities/attendant.entity';
import { AttendantBuilder } from '../../builders/attendant.build';
import { AttendantProps } from '../../interfaces/props/attendant-props.interface';
import { BuilderFactory } from '../../factories/build/builder.factory';
import { RegisterAttendantCommand } from '../../../application/attendant/commands/register-attendant.command';

@Injectable()
export class AttendantDomainService {
  constructor(
    @Inject('AttendantBuilderFactory')
    private readonly attendantBuilderFactory: BuilderFactory<
      Attendant,
      AttendantProps,
      AttendantBuilder
    >,
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
    @Inject('UuidGenerator')
    private readonly uuidGeneratorService: UuidGenerator,
  ) {}

  async RegisterAttendant(
    registerAttendantCommand: RegisterAttendantCommand,
  ): Promise<Attendant> {
    const id = this.uuidGeneratorService.generate();
    const passwordHash = await this.passwordHash.hash(
      registerAttendantCommand.registerAttendantDto.password,
    );
    const attendant = this.attendantBuilderFactory.createBuilder();
    return attendant
      .withId(id)
      .withPasswordHash(passwordHash)
      .withName(registerAttendantCommand.registerAttendantDto.name)
      .withEmail(registerAttendantCommand.registerAttendantDto.email)
      .withAddress(registerAttendantCommand.registerAttendantDto.address)
      .withDepartment(registerAttendantCommand.registerAttendantDto.department)
      .withContactInfo(
        registerAttendantCommand.registerAttendantDto.contactInfo,
      )
      .withCreatedAt(new Date())
      .withUpdatedAt(new Date())
      .build();
  }
}
