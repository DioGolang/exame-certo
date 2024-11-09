import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { InvalidNursingException } from '../../../../domain/exceptions/invalid-nursing.exception';
import { Response } from 'express';

@Catch(InvalidNursingException)
export class InvalidNursingExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidNursingException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus()
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message: message,
      error: 'Invalid Nursing Data',
    });
  }
}
