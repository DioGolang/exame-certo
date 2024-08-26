import { BadRequestException } from "@nestjs/common";

export class InvalidDoctorException extends BadRequestException{
  constructor(message: string) {
    super(message, "InvalidDoctorException");
  }
}