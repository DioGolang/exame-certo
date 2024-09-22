import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidPatientException } from '../../../../domain/exceptions/invalid-patient.exception';
import { Response } from 'express';

@Catch(InvalidPatientException)
export class InvalidPatientExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidPatientException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Invalid Patient Data',
    });
  }
}
