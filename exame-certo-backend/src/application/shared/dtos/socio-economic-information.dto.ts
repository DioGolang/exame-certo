import { IsString } from 'class-validator';

export class SocioEconomicInformationDto {
  @IsString()
  public readonly profession: string;

  @IsString()
  public readonly educationLevel: string;

  @IsString()
  public readonly housingConditions: string;

  @IsString()
  public readonly incomeLevel: string;

  @IsString()
  public readonly socialSupport: string;
}
