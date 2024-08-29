import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";
import { Identification } from "../value-objects/identification.vo";
import { PersonalHistory } from "../value-objects/personal-history.vo";
import { InvalidPatientException } from "../exceptions/invalid-patient.exception";
import { InvalidAnamnesisException } from "../exceptions/invalid-anamnesis.exception";

//QUEIXA PRINCIPAL E DURAÇÃO (Q.D.)
//HISTÓRIA DA MOLÉSTIA ATUAL (H.M.A.)
//HISTÓRIA MÉDICA PREGRESSA (ANTECEDENTES PESSOAIS)
//HISTÓRIA FAMILIAR (ANTECEDENTES FAMILIARES)
//INTERROGATÓRIO SOBRE OS DIVERSOS APARELHOS ( I.D.A.):
//AP: Antecedentes fisiológicos

export class Anamnesis {

  constructor(
    private _id: string | null,
    private readonly _date: Date,
    private readonly _patient: Patient,
    private readonly _doctor: Doctor,
    private readonly _identification: Identification,
    private readonly _mainComplaint: string,
    private readonly _historyOfPresentIllness: string,
    private readonly _reviewOfSystems: string,
    private readonly _pastMedicalHistory: string,
    private readonly _familyHistory: string,
    private readonly _socialHistory: string,
    private readonly _personalHistory: PersonalHistory,
  ) {
    this.validate();
  }

  get id(): string {
    return this._id
  }


  get date(): Date{
    return this._date
  }

  get identification(): Identification{
    return this._identification
  }

  get mainComplaint(): string{
    return this._mainComplaint
  }

  get historyOfPresentIllness(): string{
    return this._historyOfPresentIllness
  }

  get reviewOfSystems(): string{
    return this._reviewOfSystems
  }

  get pastMedicalHistory(): string{
    return this._pastMedicalHistory
  }

  get familyHistory(): string{
    return this._familyHistory
  }

  get socialHistory(): string{
    return this._socialHistory
  }

  get personalHistory(): PersonalHistory{
    return this._personalHistory
  }

  //validate
  private checkField(field: string, errorMessage: string, errors: string[]): void {
    if (!field || field.trim() === '') {
      errors.push(errorMessage);
    }
  }

  private validate(): void {
    const errors: string[] = [];
    this.checkField(this._mainComplaint, 'Main complaint is required', errors);
    this.checkField(this._historyOfPresentIllness, 'History of present illness is required', errors);
    this.checkField(this._reviewOfSystems, 'Review of systems is required', errors);
    this.checkField(this._pastMedicalHistory, 'Past medical history is required', errors);
    this.checkField(this._familyHistory, 'Family history is required', errors);
    this.checkField(this._socialHistory, 'Social history is required', errors);

    if (errors.length > 0 ){
      throw new InvalidAnamnesisException(errors.join("; "));
    }
  }

}