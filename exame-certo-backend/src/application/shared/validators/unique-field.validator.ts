import { Inject, Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UniqueValidationStrategy } from '../../interfaces/unique-validation-strategy.interface';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueFieldConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject('UniqueValidationStrategy')
    private readonly strategies: {
      [key: string]: UniqueValidationStrategy;
    },
  ) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [validateFunction, methodName] = args.constraints;
    const strategy = this.strategies[validateFunction];

    if (strategy && methodName && typeof strategy[methodName] === 'function') {
      return await strategy[methodName](value);
    }
    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} ${args.value} já está em uso.`;
  }
}
