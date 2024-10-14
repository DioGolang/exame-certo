import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ValidationService } from './validation.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidatorConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly validateService: ValidationService) {}

  async validate(email: string): Promise<boolean> {
    return await this.validateService.emailUnique(email);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Email ${args.value} already in use`;
  }
}
