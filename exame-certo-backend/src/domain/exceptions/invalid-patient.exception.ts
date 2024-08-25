import { BadRequestException } from "@nestjs/common";

export class InvalidPatientException extends BadRequestException{
  constructor(message: string) {
    super(message, "InvalidPatientException");
  }

}