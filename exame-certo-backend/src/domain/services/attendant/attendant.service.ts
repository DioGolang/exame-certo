import { Inject, Injectable } from '@nestjs/common';
import { PasswordHash } from '../../../application/interfaces/hasher.interface';
import { UuidGenerator } from '../../interfaces/uuid-generator.interface';
import { Attendant } from '../../entities/attendant.entity';
import { AttendantBuilder } from '../../builders/attendant.build';

@Injectable()
export class AttendantService {
  constructor(
    @Inject('PasswordHash')
    private readonly passwordHash: PasswordHash,
    @Inject('UuidGenerator')
    private readonly uuidGeneratorService: UuidGenerator,
  ) {}

  // async hiredAttendant(): Promise<Attendant> {
  //   const id = this.uuidGeneratorService.generate();
  //   const passwordHash = await this.passwordHash.hash('123456');
  //   const attendant = new AttendantBuilder();
  //   return attendant.build();
  // }
}
