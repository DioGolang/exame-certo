import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueEmailValidatorConstraint } from './unique-email.validator';

export function UniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidatorConstraint,
    });
  };
}
