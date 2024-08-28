import { Patient } from "./patient.entity";
import { Doctor } from "./doctor.entity";
import { Identification } from "../value-objects/identification.vo";
import { PersonalHistory } from "../value-objects/personal-history.vo";

//QUEIXA PRINCIPAL E DURAÇÃO (Q.D.)
//HISTÓRIA DA MOLÉSTIA ATUAL (H.M.A.)
//HISTÓRIA MÉDICA PREGRESSA (ANTECEDENTES PESSOAIS)
//HISTÓRIA FAMILIAR (ANTECEDENTES FAMILIARES)
//INTERROGATÓRIO SOBRE OS DIVERSOS APARELHOS ( I.D.A.):
//AP: Antecedentes fisiológicos

export class Anamnesis {

  constructor(
    private readonly _id: string | null,
    private readonly _tenantId: string,
    private readonly _patient: Patient,
    private readonly _doctor: Doctor,
    private readonly _date: Date,
    private readonly _identification: Identification,
    private readonly _mainComplaint: string,
    private readonly _historyOfPresentIllness: string,
    private readonly _reviewOfSystems: string,
    private readonly _pastMedicalHistory: string,
    private readonly _familyHistory: string,
    private readonly _socialHistory: string,
    private readonly _personalHistory: PersonalHistory,
  ) { }

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

}