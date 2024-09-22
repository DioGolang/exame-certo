import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidDoctorException } from '../../../../domain/exceptions/invalid-doctor.exception';
import { Response } from 'express';

@Catch(InvalidDoctorException)
export class InvalidDoctorExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message;
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Invalid Doctor Data',
    });
  }
}
