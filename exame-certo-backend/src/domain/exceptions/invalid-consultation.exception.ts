import { BadRequestException } from '@nestjs/common';

export class InvalidConsultationException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidConsultationException');
  }
}
