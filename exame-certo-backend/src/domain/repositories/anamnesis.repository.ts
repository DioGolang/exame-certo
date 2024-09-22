import { CommandRepository } from './repository.interface';
import { CreateAnamnesisDto } from '../../application/dtos/create-anamnesis.dto';
import { AnamnesisEntity } from '../../infra/persistence/postgres/entities/anamnesis.entity';

export interface AnamnesisRepository
  extends CommandRepository<CreateAnamnesisDto, AnamnesisEntity> {
  save(anamnesis: CreateAnamnesisDto): Promise<void>;
  update(anamnesis: CreateAnamnesisDto): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<AnamnesisEntity | null>;
  findAll(): Promise<AnamnesisEntity[]>;
}
