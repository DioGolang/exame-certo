import { SchedulingProps } from '../interfaces/props/scheduling-props.interface';

export class Scheduling {
  private readonly _id: string;
  private readonly _props: Readonly<SchedulingProps>;

  constructor(id: string, props: SchedulingProps) {
    this._id = id;
    this._props = { ...props };
    // this.validate();
  }

  // public validate(): void {
  //   const errors: string[] = [];
  //   ValidationUtils.checkField(this._props.date, 'Date is required', errors);
  //   ValidationUtils.checkField(this._props.patient, 'Patient is required', errors);
  //   ValidationUtils.checkField(this._props.doctor, 'Doctor is required', errors);
  //
  //   if (errors.length > 0) {
  //     throw new InvalidSchedulingException(errors.join('; '));
  //   }
  // }

  get id(): string {
    return this._id;
  }
}
