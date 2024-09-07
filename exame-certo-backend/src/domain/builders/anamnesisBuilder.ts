import { AnamnesisProps } from "../interfaces/props/anamnesis-props.interface";
import { v4 as uuidv4 } from 'uuid';
import { Patient } from "../entities/patient.entity";
import { Doctor } from "../entities/doctor.entity";
import { Identification } from "../value-objects/identification.vo";
import { PersonalHistory } from "../value-objects/personal-history.vo";
import { Anamnesis } from "../entities/anamnesis.entity";
import { Clinic } from "../entities/clinic.entity";


export class AnamnesisBuilder {
  private readonly _id: string;
  private _props: Partial<AnamnesisProps> = {};

  private constructor(id?: string) {
    this._id = id || uuidv4();
  }


  public static create(): AnamnesisBuilder{
   return new AnamnesisBuilder();
  }

  public static rehydrate(id:string): AnamnesisBuilder{
    return new AnamnesisBuilder(id);
  }

  public withPatient(patient: Patient): AnamnesisBuilder{
    this._props.patient = patient;
    return this;
  }

  public withDoctor(doctor: Doctor): AnamnesisBuilder{
    this._props.doctor = doctor;
    return this;
  }

  public withClinic(clinic: Clinic): AnamnesisBuilder{
    this._props.clinic = clinic;
    return this;
  }

  public withIdentification(identification: Identification): AnamnesisBuilder{
    this._props.identification = identification;
    return this;
  }

  public withMainComplaint(mainComplaint: string): AnamnesisBuilder{
    this._props.mainComplaint = mainComplaint;
    return this;
  }

  public withHistoryOfPresentIllness(historyOfPresentIllness: string): AnamnesisBuilder{
    this._props.historyOfPresentIllness = historyOfPresentIllness;
    return this;
  }

  public withReviewOfSystems(reviewOfSystems: string): AnamnesisBuilder{
    this._props.reviewOfSystems = reviewOfSystems
    return this;
  }

  public withPastMedicalHistory(pastMedicalHistory: string): AnamnesisBuilder{
    this._props.pastMedicalHistory = pastMedicalHistory
    return this;
  }

  public withFamilyHistory(familyHistory: string): AnamnesisBuilder{
    this._props.familyHistory = familyHistory;
    return this;
  }

  public withSocialHistory(socialHistory: string): AnamnesisBuilder{
    this._props.socialHistory = socialHistory;
    return this;
  }

  public withPersonalHistory(personalHistory: PersonalHistory): AnamnesisBuilder{
    this._props.personalHistory = personalHistory;
    return this;
  }

  build(): Anamnesis{
    return new Anamnesis(this._id, this._props as AnamnesisProps)
  }

}