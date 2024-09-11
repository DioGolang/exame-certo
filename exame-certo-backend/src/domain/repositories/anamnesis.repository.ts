import { Repository } from '../interfaces/repository.interface';
import { Anamnesis } from '../entities/anamnesis.entity';

export interface AnamnesisRepository extends Repository<Anamnesis> {
  save(anamnesis: Anamnesis): Promise<void>;
  update(anamnesis: Anamnesis): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Anamnesis | null>;
  findAll(): Promise<Anamnesis[]>;
}
