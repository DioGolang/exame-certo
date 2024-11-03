import { ServiceProps } from '../interfaces/props/service-props.interface';
import { Procedure } from './procedure.entity';
import { Consultation } from './consultation.entity';

export class Service {
  private readonly _id: string;
  private readonly _props: Readonly<ServiceProps>;
  private readonly _procedure: Procedure[];
  private readonly _consultation: Consultation[];
}
