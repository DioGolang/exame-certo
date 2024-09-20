export class ClinicSyncFailedEvent {
  constructor(
    public readonly clinicId: string,
    public readonly error: string,
  ) {}
}
