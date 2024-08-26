import { Address } from '../value-objects/address.vo';
import { ContactInfo } from '../value-objects/contact-info.vo';
import { Doctor } from '../entites/doctor.entity';
import { Patient } from '../entites/patient.entity';
import { Exam } from '../entites/exam.entity';
import { IHasher } from '../interfaces/hasher.interface';
import { Clinic } from '../entites/clinic.entity';
import { ClinicValidationService } from '../services/validation/clinic-validation.service';
import { ClinicBuilder } from './clinic.builder';
import { InvalidClinicException } from '../exceptions/invalid-clinic.exception';

describe('ClinicBuilder', () => {
  let hasher: IHasher;
  let validator: ClinicValidationService;

  beforeEach(() => {
    hasher = {
      hash: jest.fn().mockResolvedValue('clinic_password_hash'),
      compare: jest.fn().mockResolvedValue(true),
    };

    validator = {
      validate: jest.fn(),
    } as unknown as ClinicValidationService;
  });

  it('should build a Clinic instance with the provided properties', async () => {
    const address = new Address('123 Street', '34', 'City', 'State', '12345', 'Brazil');
    const contactInfo = new ContactInfo('123-456-7890', '123-456-7891', '123-456-7896', '123-456-7890', 'email@example.com');
    const doctors: Doctor[] = [];
    const patients: Patient[] = [];
    const exams: Exam[] = [];

    const clinic = await new ClinicBuilder(validator, hasher)
      .withId('clinic_id')
      .withName('Clinic Name')
      .withEmail('clinic@example.com')
      .withPassword('clinic_password')
      .withAddress(address)
      .withContactInfo(contactInfo)
      .withDoctors(doctors)
      .withPatients(patients)
      .withExam(exams)
      .build();

    expect(clinic).toBeInstanceOf(Clinic);
    expect(clinic.id).toBe('clinic_id');
    expect(clinic.name).toBe('Clinic Name');
    expect(clinic.email).toBe('clinic@example.com');
    expect(clinic.address).toEqual(address);
    expect(clinic.contactInfo).toEqual(contactInfo);
    expect(clinic.doctors).toEqual(doctors);
    expect(clinic.patients).toEqual(patients);
    expect(clinic.exams).toEqual(exams);

    expect(hasher.hash).toHaveBeenCalledWith('clinic_password');
    expect(clinic.password).toBe('clinic_password_hash');

    expect(validator.validate).toHaveBeenCalledWith(clinic);
  });

  it('should throw an error if validation fails', async () => {
    validator.validate = jest.fn(() => {
      throw new InvalidClinicException('Validation failed');
    });

    const address = new Address('123 Street', '34', 'City', 'State', '12345', 'Brazil');
    const contactInfo = new ContactInfo('123-456-7890', '123-456-7891', '123-456-7896', '123-456-7890', 'email@example.com');

    await expect(
      new ClinicBuilder(validator, hasher)
        .withId('clinic_id')
        .withName('Clinic Name')
        .withEmail('clinic@example.com')
        .withAddress(address)
        .withContactInfo(contactInfo)
        .build(),
    ).rejects.toThrow('Validation failed');
  });

  it('should throw an error if name is invalid', async () => {
    jest.spyOn(validator, 'validate').mockImplementation(() => {
      throw new InvalidClinicException('Name is required');
    });

    const address = new Address('123 Street', '34', 'City', 'State', '12345', 'Brazil');
    const contactInfo = new ContactInfo('123-456-7890', '123-456-7891', '123-456-7896', '123-456-7890', 'email@example.com');

    await expect(
      new ClinicBuilder(validator, hasher)
        .withId('clinic_id')
        .withName('')
        .withEmail('clinic@example.com')
        .withAddress(address)
        .withContactInfo(contactInfo)
        .build(),
    ).rejects.toThrow('Name is required');
  });

  it('should throw an error if email is invalid', async () => {
    jest.spyOn(validator, 'validate').mockImplementation(() => {
      throw new InvalidClinicException('Email is required');
    });

    const address = new Address('123 Street', '34', 'City', 'State', '12345', 'Brazil');
    const contactInfo = new ContactInfo('123-456-7890', '123-456-7891', '123-456-7896', '123-456-7890', 'email@example.com');

    await expect(
      new ClinicBuilder(validator, hasher)
        .withId('clinic_id')
        .withName('Clinic Name')
        .withEmail('')
        .withAddress(address)
        .withContactInfo(contactInfo)
        .build(),
    ).rejects.toThrow('Email is required');
  });

});
