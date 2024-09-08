import { MapperUtils } from '../../../../shared/utils/mapper.utils';
import { ReportEntity } from '../../entities/report.entity';

export class ReportMapper {
  public static async toDomain(entity: ReportEntity): Promise<Report> {
    return MapperUtils.toReportDomain(entity);
  }

  public static toPersistence(domain: Report): ReportEntity {
    return MapperUtils.toReportPersistence(domain);
  }
}
