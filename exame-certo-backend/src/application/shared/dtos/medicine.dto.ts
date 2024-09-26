import { IsEnum, IsString } from 'class-validator';
import { ViaAdministration } from '../../../domain/enums/via-administration';

export class MedicineDto {
  @IsString()
  public readonly name: string;

  @IsString()
  public readonly dosage: string;

  @IsString()
  public readonly frequency: string;

  @IsEnum(ViaAdministration)
  public readonly viaAdministration: ViaAdministration;

  @IsString()
  public readonly duration: string;

  @IsString()
  public readonly observations: string;

  @IsString()
  public readonly prescriptionDate: Date;
}
