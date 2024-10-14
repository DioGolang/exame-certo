import { registerDecorator, ValidationOptions } from 'class-validator';
import { FieldValidatorConstraint } from './field.validator';

export function UniqueField(
  targetName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [targetName],
      validator: FieldValidatorConstraint,
    });
  };
}
