import { Signature } from "../value-objects/signature.vo";
import { AdditionalInformation } from "../value-objects/additional-information.vo";
import { CID10 } from "../value-objects/cid.vo";
import { Exam } from "./exam.entity";
import { Doctor } from "./doctor.entity";


export class Report {

  constructor(
   private readonly _id: string | null,
   private readonly _tenantId: string,
   private readonly _exams: Exam[],
   private readonly _doctor: Doctor,
   private readonly _date: Date,
   private readonly _diagnosis: string,
   private readonly _cid_10: CID10[],
   private readonly _justification: string,
   private readonly _conduct: string,
   private readonly _hypothesis: string,
   private readonly _additionalInformation: AdditionalInformation,
   private readonly _signature: Signature,
   private readonly _prognosis: string,
   private readonly _rest_start_date: Date,
   private readonly _rest_duration: Date,
   private readonly _therapeutic_conduct: string,
   private readonly _clinical_evolution: string,
   private readonly _health_consequences: string,
   private readonly _consultation_reason: string,
   private readonly _illness_history: string,
  ) { }

  get id(): string{
    return this._id;
  }


  get date(): Date{
    return this._date;
  }

  get diagnosis(): string{
    return this._diagnosis;
  }

  get cid_10(): CID10[]{
    return this._cid_10;
  }

  get justification(): string{
    return this._justification;
  }

  get conduct(): string{
    return this._conduct;
  }

  get hypothesis(): string{
    return this._hypothesis;
  }

  get additionalInformation(): AdditionalInformation{
    return this._additionalInformation;
  }

  get signature(): Signature{
    return this._signature;
  }

  get prognosis(): string{
    return this._prognosis;
  }

  get rest_start_date(): Date{
    return this._rest_start_date;
  }

  get rest_duration(): Date{
    return this._rest_duration;
  }

  get therapeutic_conduct(): string{
    return this._therapeutic_conduct;
  }

  get clinical_evolution(): string{
    return this._clinical_evolution;
  }

  get health_consequences(): string{
    return this._health_consequences;
  }

  get consultation_reason(): string{
    return this._consultation_reason;
  }

  get illness_history(): string{
    return this._illness_history;
  }

}
