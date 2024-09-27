import { IsEnum, IsString } from 'class-validator';
import { EducationLevel } from '../../../domain/enums/education-level.enum';
import { IncomeLevel } from '../../../domain/enums/income-level.enum';

export class SocioEconomicInformationDto {
  @IsString()
  public readonly profession: string;

  @IsEnum(EducationLevel)
  public readonly educationLevel: EducationLevel;

  @IsString()
  public readonly housingConditions: string;

  @IsEnum(IncomeLevel)
  public readonly incomeLevel: IncomeLevel;

  @IsString()
  public readonly socialSupport: string;
}
