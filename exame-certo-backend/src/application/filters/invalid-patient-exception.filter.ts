import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { InvalidPatientException } from "../../domain/exceptions/invalid-patient.exception";
import { ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(InvalidPatientException)
export class InvalidPatientExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidPatientException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus() ? exception.getStatus() : HttpStatus.BAD_REQUEST;

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        error: 'Invalid Patient Data'
      });
  }

}