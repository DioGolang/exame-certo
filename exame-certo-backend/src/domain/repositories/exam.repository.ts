import { Exam } from '../entities/exam.entity';
import { Repository } from '../interfaces/repository.interface';

export interface ExamRepository extends Repository<Exam> {
  save(exam: Exam): Promise<void>;
  update(exam: Exam): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Exam | null>;
  findAll(): Promise<Exam[]>;
}
