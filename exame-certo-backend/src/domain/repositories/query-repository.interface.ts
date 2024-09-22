export interface QueryRepository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
}
