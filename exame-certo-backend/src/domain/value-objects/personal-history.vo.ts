export class PersonalHistory {
  pathological: string; // Previous illnesses, surgeries, allergies, medications, etc.
  physiological: string; // Menarche, menopause, eating habits, physical activity, sleep, etc.
  gynecoObstetric?: string; // Pregnancies, births, contraceptive methods, etc.
  lifestyle: string; // Smoking, alcoholism, drug use, etc.

  constructor(
    pathological: string,
    physiological: string,
    lifestyle: string,
    gynecoObstetric?: string,
  ) {
    this.pathological = pathological;
    this.physiological = physiological;
    this.lifestyle = lifestyle;
    this.gynecoObstetric = gynecoObstetric || 'does not apply';
  }
}
