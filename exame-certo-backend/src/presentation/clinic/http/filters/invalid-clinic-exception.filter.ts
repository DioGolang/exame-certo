import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidClinicException } from '../../../../domain/exceptions/invalid-clinic.exception';
import { Response } from 'express';

@Catch(InvalidClinicException)
export class InvalidClinicExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidClinicException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Invalid Clinic Data',
    });
  }
}
