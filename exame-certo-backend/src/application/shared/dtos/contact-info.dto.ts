import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ContactInfoDto {
  @IsString()
  public readonly phone: string;

  @IsString()
  public readonly emergencyPhone: string;

  @IsString()
  public readonly emergencyPhone2: string;

  @IsString()
  public readonly emergencyPhone3: string;

  @IsEmail()
  public readonly email: string;

  @IsOptional()
  @IsString()
  public readonly extension?: string;

  @IsOptional()
  @IsString()
  public readonly extension2?: string;

  @IsOptional()
  @IsString()
  public readonly extension3?: string;
}
