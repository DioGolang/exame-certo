export interface UniqueValidationStrategy {
  uniqueEmail(email: string): Promise<boolean>;
}
