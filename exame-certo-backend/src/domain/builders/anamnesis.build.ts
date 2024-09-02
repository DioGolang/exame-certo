import { AnamnesisProps } from "../interfaces/props/anamnesis-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Patient } from "../entites/patient.entity";
import { Doctor } from "../entites/doctor.entity";
import { Identification } from "../value-objects/identification.vo";
import { PersonalHistory } from "../value-objects/personal-history.vo";
import { Anamnesis } from "../entites/anamnesis.entity";


export class AnamnesisBuild{
  private _id: string;
  private _props: Partial<AnamnesisProps> = {};

  private constructor() { }


  public static createNew(): AnamnesisBuild{
   const build = new AnamnesisBuild()
    build._id = uuidv4();
    return build;
  }

  public static rehydrate(id:string): AnamnesisBuild{
    const build = new AnamnesisBuild()
    build._id = id;
    return build;
  }

  public withPatient(patient: Patient): AnamnesisBuild{
    this._props.patient = patient;
    return this;
  }

  public withDoctor(doctor: Doctor): AnamnesisBuild{
    this._props.doctor = doctor;
    return this;
  }

  public withIdentification(identification: Identification): AnamnesisBuild{
    this._props.identification = identification;
    return this;
  }

  public withMainComplaint(mainComplaint: string): AnamnesisBuild{
    this._props.mainComplaint = mainComplaint;
    return this;
  }

  public withHistoryOfPresentIllness(historyOfPresentIllness: string): AnamnesisBuild{
    this._props.historyOfPresentIllness = historyOfPresentIllness;
    return this;
  }

  public withReviewOfSystems(reviewOfSystems: string): AnamnesisBuild{
    this._props.reviewOfSystems = reviewOfSystems
    return this;
  }

  public withPastMedicalHistory(pastMedicalHistory: string): AnamnesisBuild{
    this._props.pastMedicalHistory = pastMedicalHistory
    return this;
  }

  public withFamilyHistory(familyHistory: string): AnamnesisBuild{
    this._props.familyHistory = familyHistory;
    return this;
  }

  public withSocialHistory(socialHistory: string): AnamnesisBuild{
    this._props.socialHistory = socialHistory;
    return this;
  }

  public withPersonalHistory(personalHistory: PersonalHistory): AnamnesisBuild{
    this._props.personalHistory = personalHistory;
    return this;
  }

  build(): Anamnesis{
    return new Anamnesis(this._id, this._props as AnamnesisProps)
  }

}