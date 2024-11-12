import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NursingCommandRepository } from '../../../../../domain/repositories/nursing-command.repository';
import { NursingEntity } from '../../entities/nursing.entity';

class RegisteredNursingEventDto {}

export class NursingCommandRepositoryImpl implements NursingCommandRepository {
  constructor(
    @InjectRepository(NursingEntity)
    private readonly nursingRepository: Repository<NursingEntity>,
  ) {}

  async save(nursing: RegisteredNursingEventDto): Promise<void> {
    await this.nursingRepository.save(nursing);
  }

  update(entity: RegisteredNursingEventDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<NursingEntity> {
    throw new Error('Method not implemented.');
  }
}
