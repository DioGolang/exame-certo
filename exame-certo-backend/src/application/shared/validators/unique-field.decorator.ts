import { registerDecorator, ValidationOptions } from 'class-validator';
import { UniqueFieldConstraint } from './unique-field.validator';

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
      validator: UniqueFieldConstraint,
    });
  };
}
