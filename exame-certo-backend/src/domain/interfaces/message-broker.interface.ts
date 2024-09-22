
export interface MessageBroker {
  publish(pattern: string, payload: any): void;
}