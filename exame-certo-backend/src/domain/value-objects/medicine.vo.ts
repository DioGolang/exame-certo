import { MedicineDto } from '../../application/shared/dtos/medicine.dto';
import { ViaAdministration } from '../enums/via-administration';

export class Medicine {
  readonly name: string;
  readonly dosage: string;
  readonly frequency: string;
  readonly viaAdministration: ViaAdministration;
  readonly duration: string;
  readonly observations: string;
  readonly prescriptionDate: Date;

  constructor(
    name: string,
    dosage: string,
    frequency: string,
    viaAdministration: ViaAdministration,
    duration: string,
    observations: string,
    prescriptionDate: Date,
  ) {
    this.validate();
    this.name = name;
    this.dosage = dosage;
    this.frequency = frequency;
    this.viaAdministration = viaAdministration;
    this.duration = duration;
    this.observations = observations;
    this.prescriptionDate = prescriptionDate;
  }

  static fromDto(medicineDto: MedicineDto): Medicine {
    return new Medicine(
      medicineDto.name,
      medicineDto.dosage,
      medicineDto.frequency,
      medicineDto.viaAdministration as ViaAdministration,
      medicineDto.duration,
      medicineDto.observations,
      medicineDto.prescriptionDate,
    );
  }

  validate(): void {
    const errors: string[] = [];
    if (!this.name) {
      errors.push('Name is required');
    }
    if (!this.dosage) {
      errors.push('Dosage is required');
    }
    if (!this.frequency) {
      errors.push('Frequency is required');
    }
    if (!this.viaAdministration) {
      errors.push('Via administration is required');
    }
    if (!this.duration) {
      errors.push('Duration is required');
    }
    if (!this.observations) {
      errors.push('Observations is required');
    }
    if (!this.prescriptionDate) {
      errors.push('Prescription date is required');
    }
    if (errors.length > 0) {
      throw new Error(errors.join('; '));
    }
  }
}
