import { ExamEntity } from '../../entities/exam.entity';
import { Exam } from '../../../../domain/entities/exam.entity';
import { MapperUtils } from '../../../../shared/utils/mapper.utils';

export class ExamMapper {
  public static async toDomain(entity: ExamEntity): Promise<Exam> {
    return MapperUtils.toExamDomain(entity);
  }

  public static toPersistence(domain: Exam): ExamEntity {
    return MapperUtils.toExamPersistence(domain);
  }
}
