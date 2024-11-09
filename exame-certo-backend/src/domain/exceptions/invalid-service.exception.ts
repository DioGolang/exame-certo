import { BadRequestException } from '@nestjs/common';

export class InvalidServiceException extends BadRequestException {
  constructor(message: string) {
    super(message, 'InvalidServiceException');
  }
}
