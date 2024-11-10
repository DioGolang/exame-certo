import { ScreeningProps } from '../interfaces/props/screening-props.interface';

export class Screening {
  private readonly _id: string;
  private _props: Readonly<ScreeningProps>;

  constructor(id: string, props: ScreeningProps) {
    this._id = id;
    this._props = { ...props };
  }

  get id(): string {
    return this._id;
  }
}
