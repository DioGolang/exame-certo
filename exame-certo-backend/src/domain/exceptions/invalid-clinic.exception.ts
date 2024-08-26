import { BadRequestException } from "@nestjs/common";

export class InvalidClinicException extends BadRequestException{
  constructor(message: string) {
    super(message, 'InvalidClinicException');
  }
}