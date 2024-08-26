import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { InvalidDoctorException } from "../../domain/exceptions/invalid-doctor.exception";
import { Request, Response } from 'express';


@Catch(InvalidDoctorException)
export class InvalidDoctorExceptionFilter implements ExceptionFilter {
    catch(exception: InvalidDoctorException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus() ? exception.getStatus() : HttpStatus.BAD_REQUEST;

      response
        .status(status)
        .json({
          statusCode: status,
          message: exception.message,
          error: 'Invalid Doctor Data'
        });
    }
}