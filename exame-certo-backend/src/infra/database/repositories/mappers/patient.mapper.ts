import { PatientEntity } from "../../entities/patient.entity";
import { Patient } from "../../../../domain/entities/patient.entity";
import { PatientBuilder } from "../../../../domain/builders/patient.builder";
import { Hasher } from "../../../../domain/interfaces/hasher.interface";
import { Sex } from "../../../../domain/enums/sex.enum";
import { MaritalStatus } from "../../../../domain/enums/marital-status.enum";
import { AddressDto } from "../../../../application/dtos/address.dto";
import { ContactInfoDto } from "../../../../application/dtos/contact-info.dto";
import { DocumentationDto } from "../../../../application/dtos/documentation.dto";
import { SocioEconomicInformationDto } from "../../../../application/dtos/socio-economic-information.dto";

export class PatientMapper {
  public static async toDomain(entity: PatientEntity, hasher: Hasher): Promise<Patient> {
    const address = this.mapAddress(entity);
    const contactInfo = this.mapContactInfo(entity);
    const documentation = this.mapDocumentation(entity);
    const socioeconomicInformation = this.mapSocioeconomicInformation(entity);

    let builder: PatientBuilder;

    if (entity.id) {
      builder = PatientBuilder.rehydrate(entity.id, hasher, entity.passwordHash);
    } else {
      builder = await PatientBuilder.create(hasher, entity.passwordHash);
    }

    builder
      .withName(entity.name)
      .withLastName(entity.lastName)
      .withEmail(entity.email)
      .withDateOfBirth(entity.dateOfBirth)
      .withSex(entity.sex as Sex)
      .withMaritalStatus(entity.maritalStatus as MaritalStatus)
      .withAddress(address)
      .withContactInfo(contactInfo)
      .withDocumentation(documentation)
      .withSocioeconomicInformation(socioeconomicInformation)
      .withHealthInsurance(entity.healthInsurance);

    return builder.build();
  }

  public static toPersistence(domain: Patient): PatientEntity {
    const entity = new PatientEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.lastName = domain.lastName;
    entity.email = domain.email;
    entity.passwordHash = domain.passwordHash;
    entity.dateOfBirth = domain.dateOfBirth;
    entity.sex = domain.sex;
    entity.maritalStatus = domain.maritalStatus;
    entity.address = domain.address;
    entity.contactInfo = domain.contactInfo;
    entity.socioeconomicInformation = domain.socioeconomicInformation;
    entity.documentation = domain.documentation;
    entity.healthInsurance = domain.healthInsurance;
    return entity;
  }

  private static mapAddress(entity: PatientEntity): AddressDto {
    return {
      street: entity.address.street,
      num: entity.address.num,
      city: entity.address.city,
      state: entity.address.state,
      postalCode: entity.address.postalCode,
      country: entity.address.country,
      complement: entity.address.complement
    };
  }

  private static mapContactInfo(entity: PatientEntity): ContactInfoDto {
    return {
      phone: entity.contactInfo.phone,
      emergencyPhone: entity.contactInfo.emergencyPhone,
      emergencyPhone2: entity.contactInfo.emergencyPhone2,
      emergencyPhone3: entity.contactInfo.emergencyPhone3,
      email: entity.contactInfo.email,
      extension: entity.contactInfo.extension,
      extension2: entity.contactInfo.extension2,
      extension3: entity.contactInfo.extension3,
    };
  }

  private static mapDocumentation(entity: PatientEntity): DocumentationDto {
    return {
      cpf: entity.documentation.cpf.toString(),
      rg: entity.documentation.rg.toString(),
      cnh: entity.documentation.cnh.toString(),
      cnsNumber: entity.documentation.cnsNumber.toString(),
    };
  }

  private static mapSocioeconomicInformation(entity: PatientEntity): SocioEconomicInformationDto {
    return {
      profession: entity.socioeconomicInformation.profession,
      educationLevel: entity.socioeconomicInformation.educationLevel,
      housingConditions: entity.socioeconomicInformation.housingConditions,
      incomeLevel: entity.socioeconomicInformation.incomeLevel,
      socialSupport: entity.socioeconomicInformation.socialSupport,
    };
  }
}
