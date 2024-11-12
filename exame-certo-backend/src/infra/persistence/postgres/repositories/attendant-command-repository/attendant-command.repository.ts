import { AttendantCommandRepository } from '../../../../../domain/repositories/attendant-command.repository';
import { AttendantEntity } from '../../entities/attendant.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisteredAttendantEventDto } from '../../../../../application/attendant/dto/registered-attendant-event.dto';

export class AttendantCommandRepositoryImpl
  implements AttendantCommandRepository
{
  constructor(
    @InjectRepository(AttendantEntity)
    private readonly attendantRepository: Repository<AttendantEntity>,
  ) {}

  async save(attendant: RegisteredAttendantEventDto): Promise<void> {
    console.log('AttendantCommandRepositoryImpl.save', attendant);
    await this.attendantRepository.save(attendant);
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
