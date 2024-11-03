import { ServiceProps } from '../interfaces/props/service-props.interface';

export class Service {
  private readonly _id: string;
  private readonly _props: Readonly<ServiceProps>;
}