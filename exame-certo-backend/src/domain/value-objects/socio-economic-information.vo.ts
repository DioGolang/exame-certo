
enum IncomeLevel {
  HIGH = "renda mensal domiciliar superior a 10 salários",
  HIGH_AVERAGE = "renda mensal domiciliar entre quatro a 10 salários",
  AVERAGE = "renda mensal domiciliar entre três salários e quatro salários",
  LOW_AVERAGE = "renda mensal domiciliar entre  dois salários e três salários",
  LOW = "renda mensal domiciliar entre um salário e dois salários",
  VERY_LOW = "renda mensal domiciliar igual ou menor salário mínimo",
  NotInformed = 'Não Informado'
}

enum EducationLevel {
  Elementary = 'Ensino Fundamental',
  Middle = 'Ensino Médio',
  HigherEducation = 'Ensino Superior',
  Postgraduate = 'Pós-graduação',
  NotInformed = 'Não Informado'
}

export class SocioEconomicInformation {
  profession: string;
  educationLevel: EducationLevel;
  housingConditions: string; // Condições de moradia (ex: tipo de habitação, número de pessoas na residência)
  incomeLevel: IncomeLevel;
  socialSupport: string; // Suporte social (ex: rede de apoio, acesso a serviços públicos)

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
}
