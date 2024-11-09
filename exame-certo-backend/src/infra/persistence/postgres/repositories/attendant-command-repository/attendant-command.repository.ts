import { AttendantCommandRepository } from '../../../../../domain/repositories/attendant-command.repository';
import { AttendantEntity } from '../../entities/attendant.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

class RegisteredAttendantEventDto {}

export class AttendantCommandRepositoryImpl
  implements AttendantCommandRepository
{
  constructor(
    @InjectRepository(AttendantEntity)
    private readonly attendantRepository: Repository<AttendantEntity>,
  ) {}

  async save(attendant: RegisteredAttendantEventDto): Promise<void> {
    const attendantEntity = plainToClass(AttendantEntity, attendant);
    await this.attendantRepository.save(attendantEntity);
  }

  update(entity: RegisteredAttendantEventDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<AttendantEntity> {
    throw new Error('Method not implemented.');
  }
}
