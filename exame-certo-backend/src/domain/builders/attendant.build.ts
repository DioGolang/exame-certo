import { Scheduling } from '../entities/scheduling.entity';
import { BaseEntityBuilder } from './entity.builder';
import { Attendant } from '../entities/attendant.entity';
import { AttendantProps } from '../interfaces/props/attendant-props.interface';

export class AttendantBuilder extends BaseEntityBuilder<
  Attendant,
  AttendantProps
> {
  private scheduling: Scheduling[] = [];

  withName(name: string): this {
    this._props.name = name;
    return this;
  }

  withDepartment(department: string): this {
    this._props.department = department;
    return this;
  }
  public async build(): Promise<Attendant> {
    this.validateRequiredProperties();
    const attendant = new Attendant(
      this._id,
      this._props as AttendantProps,
      this._passwordHash,
    );
    this.addRelationshipsToEntities(attendant);
    return attendant;
  }

  protected validateRequiredProperties(): void {
    if (
      !this._props.name ||
      !this._props.email ||
      !this._props.address ||
      !this._props.contactInfo
    ) {
      throw new Error('Missing required properties to build Patient.');
    }
  }
  protected addRelationshipsToEntities(entity: Attendant): void {
    this.scheduling.forEach((scheduling) => entity.addScheduling(scheduling));
  }
}
