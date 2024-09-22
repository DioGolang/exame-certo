import { CommandRepository } from './repository.interface';
import { CreateExameDto } from '../../application/dtos/create-exam.dto';
import { ExamEntity } from '../../infra/persistence/postgres/entities/exam.entity';

export interface ExamRepository
  extends CommandRepository<CreateExameDto, ExamEntity> {
  save(exam: CreateExameDto): Promise<void>;
  update(exam: CreateExameDto): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ExamEntity | null>;
  findAll(): Promise<ExamEntity[]>;
}
