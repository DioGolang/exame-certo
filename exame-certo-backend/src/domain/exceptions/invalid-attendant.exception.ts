import { BadRequestException } from '@nestjs/common';

export class InvalidAttendantException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidAttendantException');
  }
}
