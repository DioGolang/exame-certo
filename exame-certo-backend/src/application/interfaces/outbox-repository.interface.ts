export interface OutboxRepository {
  save(event: any): Promise<void>;
}
