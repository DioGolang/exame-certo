import { BadRequestException } from '@nestjs/common';

export class InvalidProcedureException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidProcedureException');
  }
}
