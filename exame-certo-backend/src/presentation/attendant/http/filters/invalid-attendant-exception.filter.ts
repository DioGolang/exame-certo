import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidAttendantException } from '../../../../domain/exceptions/invalid-attendant.exception';
import { Response } from 'express';

@Catch(InvalidAttendantException)
export class InvalidAttendantExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidAttendantException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Invalid Attendant Data',
    });
  }
}
