import { Identification } from '../value-objects/identification.vo';
import { PersonalHistory } from '../value-objects/personal-history.vo';
import { InvalidAnamnesisException } from '../exceptions/invalid-anamnesis.exception';
import { AnamnesisProps } from '../interfaces/props/anamnesis-props.interface';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { Clinic } from './clinic.entity';
import { ValidationUtils } from '../../shared/utils/validation.utils';

//QUEIXA PRINCIPAL E DURAÇÃO (Q.D.) -
//HISTÓRIA DA MOLÉSTIA ATUAL (H.M.A.) -
//HISTÓRIA MÉDICA PREGRESSA (ANTECEDENTES PESSOAIS) -
//HISTÓRIA FAMILIAR (ANTECEDENTES FAMILIARES) -
//INTERROGATÓRIO SOBRE OS DIVERSOS APARELHOS ( I.D.A.) -
//AP: Antecedentes fisiológicos

export class Anamnesis {
  private readonly _id: string;
  private readonly _props: Readonly<AnamnesisProps>;

  constructor(id: string, props: AnamnesisProps) {
    this._id = id;
    this._props = { ...props };
    this.validate();
  }

  private validate(): void {
    const errors: string[] = [];
    ValidationUtils.checkField(
      this._props.mainComplaint,
      'Main complaint is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.historyOfPresentIllness,
      'History of present illness is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.reviewOfSystems,
      'Review of systems is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.pastMedicalHistory,
      'Past medical history is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.familyHistory,
      'Family history is required',
      errors,
    );
    ValidationUtils.checkField(
      this._props.socialHistory,
      'Social history is required',
      errors,
    );

    if (errors.length > 0) {
      throw new InvalidAnamnesisException(errors.join('; '));
    }
  }

  get id(): string {
    return this._id;
  }

  get date(): Date {
    return this._props.date;
  }

  get patient(): Patient {
    return this._props.patient;
  }

  get doctor(): Doctor {
    return this._props.doctor;
  }

  get clinic(): Clinic {
    return this._props.clinic;
  }

  get identification(): Identification {
    return this._props.identification;
  }

  get mainComplaint(): string {
    return this._props.mainComplaint;
  }

  get historyOfPresentIllness(): string {
    return this._props.historyOfPresentIllness;
  }

  get reviewOfSystems(): string {
    return this._props.reviewOfSystems;
  }

  get pastMedicalHistory(): string {
    return this._props.pastMedicalHistory;
  }

  get familyHistory(): string {
    return this._props.familyHistory;
  }

  get socialHistory(): string {
    return this._props.socialHistory;
  }

  get personalHistory(): PersonalHistory {
    return this._props.personalHistory;
  }
}
