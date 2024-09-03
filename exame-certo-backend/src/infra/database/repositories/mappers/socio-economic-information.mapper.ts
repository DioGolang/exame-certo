import { SocioEconomicInformationDto } from "../../../../application/dtos/socio-economic-information.dto";
import { SocioEconomicInformation } from "../../../../domain/value-objects/socio-economic-information.vo";

export class SocioEconomicInformationMapper{

   static dto(SocioEconInfo: SocioEconomicInformation): SocioEconomicInformationDto {
    return {
      profession: SocioEconInfo.profession,
      educationLevel: SocioEconInfo.educationLevel,
      housingConditions: SocioEconInfo.housingConditions,
      incomeLevel: SocioEconInfo.incomeLevel,
      socialSupport: SocioEconInfo.socialSupport,
    };
  }
}