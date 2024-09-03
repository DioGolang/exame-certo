import { EducationLevel } from "../../domain/enums/education-level.enum";
import { IncomeLevel } from "../../domain/enums/income-level.enum";

export class SocioEconomicInformationDto {
  profession: string;
  educationLevel: string;
  housingConditions: string;
  incomeLevel: string;
  socialSupport: string;
}