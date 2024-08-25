import { EducationLevel } from "../../domain/enums/education-level.enum";
import { IncomeLevel } from "../../domain/enums/income-level.enum";

export class SocioEconomicInformationDto {
  profession: string;
  educationLevel: EducationLevel;
  housingConditions: string;
  incomeLevel: IncomeLevel;
  socialSupport: string;
}