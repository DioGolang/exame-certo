import { BadRequestException } from '@nestjs/common';

export class InvalidNursingException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidNursingException');
  }
}
