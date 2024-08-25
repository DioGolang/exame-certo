import { EducationLevel } from "../enums/education-level.enum";
import { IncomeLevel } from "../enums/income-level.enum";
import { SocioEconomicInformationDto } from "../../application/dtos/socio-economic-information.dto";

export class SocioEconomicInformation {
 public readonly profession: string;
 public readonly educationLevel: EducationLevel;
 public readonly housingConditions: string; // Condições de moradia (ex: tipo de habitação, número de pessoas na residência)
 public readonly incomeLevel: IncomeLevel;
 public readonly socialSupport: string; // Suporte social (ex: rede de apoio, acesso a serviços públicos)

  constructor(
    profession: string,
    educationLevel: EducationLevel,
    housingConditions: string,
    incomeLevel: IncomeLevel,
    socialSupport?: string
  ) {
    this.profession = profession;
    this.educationLevel = educationLevel;
    this.housingConditions = housingConditions;
    this.incomeLevel = incomeLevel;
    this.socialSupport = socialSupport || 'Não informado';
  }

  static fromDto(socioEconimicInformation: SocioEconomicInformationDto): SocioEconomicInformation{
    return new SocioEconomicInformation(
      socioEconimicInformation.profession,
      socioEconimicInformation.educationLevel,
      socioEconimicInformation.housingConditions,
      socioEconimicInformation.incomeLevel,
      socioEconimicInformation.socialSupport
    )

  }
}
