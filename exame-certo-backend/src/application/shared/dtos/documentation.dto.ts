import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CNSDto } from './cns.dto';
import { RGDto } from './rg.dto';
import { CNHDto } from './cnh.dto';
import { CPFDto } from './cpf.dto';

export class DocumentationDto {
  @ValidateNested()
  @Type(() => CPFDto)
  public readonly cpf: CPFDto;

  @ValidateNested()
  @Type(() => RGDto)
  public readonly rg: RGDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CNHDto)
  public readonly cnh?: CNHDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CNSDto)
  public readonly cns?: CNSDto;
}
