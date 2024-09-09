import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { ReportEntity } from '../../entities/report.entity';
import { Report } from '../../../../domain/entities/report.entity';

export class ReportMapper {
  public static async toDomain(entity: ReportEntity): Promise<Report> {
    return MapperUtils.toReportDomain(entity);
  }

  public static async toPersistence(domain: Report): Promise<ReportEntity> {
    return MapperUtils.toReportPersistence(domain);
  }
}
