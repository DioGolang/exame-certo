import { Clinic } from '../../../domain/entities/clinic.entity';
import { CreateClinicEventDto } from '../dto/create-clinic-event.dto';

export class ClinicMapper {
  static toCreateClinicEventDto(clinic: Clinic): CreateClinicEventDto {
    return {
      id: clinic.id,
      password: clinic.password,
      name: clinic.name,
      email: clinic.email,
      address: clinic.address,
      contactInfo: clinic.contactInfo,
      createdAt: clinic.createdAt,
      updatedAt: clinic.updatedAt,
    };
  }
}
