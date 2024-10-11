import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UuidGenerator } from '../../../domain/interfaces/uuid-generator.interface';

@Injectable()
export class UuidGeneratorService implements UuidGenerator {
  generate(): string {
    return uuidv4();
  }
}
