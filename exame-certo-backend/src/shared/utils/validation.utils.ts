
export class ValidationUtils {

  static checkField(field: string, errorMessage: string, errors: string[]): void {
    if (!field || field.trim() === '') {
      errors.push(errorMessage);
    }
  }

  static checkDateField(field: Date, errorMessage: string, errors: string[]): void {
    if (!field) {
      errors.push(errorMessage);
    }
  }

  static checkPassword(password: string, errors: string[]): void {
    if (!password || password.trim() === '') {
      errors.push('Password is required');
    }
  }

}