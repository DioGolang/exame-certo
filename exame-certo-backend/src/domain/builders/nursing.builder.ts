import { BaseEntityBuilder } from './entity.builder';
import { Nursing } from '../entities/nursing.entity';
import { NursingProps } from '../interfaces/props/nursing-props.interface';
import { Clinic } from '../entities/clinic.entity';
import { Anamnesis } from '../entities/anamnesis.entity';
import { Screening } from '../entities/screening.entity';
import { NursingLevel } from '../enums/nursing-level.enum';

export class NursingBuilder extends BaseEntityBuilder<Nursing, NursingProps> {
  private _clinic: Clinic[] = [];
  private _anamnesis: Anamnesis[] = [];
  private _screening: Screening[] = [];

  withNursingLevel(nursingLevel: NursingLevel): this {
    this._props.nursingLevel = nursingLevel;
    return this;
  }

  withCOREN(COREN: string): this {
    this._props.COREN = COREN;
    return this;
  }

  withClinic(clinic: Clinic[]): this {
    this._clinic = clinic;
    return this;
  }

  withAnamnesis(anamnesis: Anamnesis[]): this {
    this._anamnesis = anamnesis;
    return this;
  }

  withScreening(screening: Screening[]): this {
    this._screening = screening;
    return this;
  }

  async build(): Promise<Nursing> {
    this.validateRequiredProperties();
    const nursing = new Nursing(
      this._id,
      this._props as NursingProps,
      this._passwordHash,
    );
    this.addRelationshipsToEntities(nursing);
    return nursing;
  }

  protected validateRequiredProperties(): void {
    if (
      !this._props.name ||
      !this._props.email ||
      !this._props.address ||
      !this._props.contactInfo
    ) {
      throw new Error('Missing required properties to build Doctor.');
    }
  }
  protected addRelationshipsToEntities(entity: Nursing): void {
    this._clinic.forEach((clinic) => entity.addClinic(clinic));
    this._anamnesis.forEach((anamnesis) => entity.addAnamnesis(anamnesis));
    this._screening.forEach((screening) => entity.addScreening(screening));
  }
}
