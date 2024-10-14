export interface UniqueValidationStrategy {
  isUniqueEmail(email: string): Promise<boolean>;
}
