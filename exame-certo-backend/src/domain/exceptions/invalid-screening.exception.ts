import { BadRequestException } from '@nestjs/common';

export class InvalidScreeningException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidScreeningException');
  }
}
