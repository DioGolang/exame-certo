import { BadRequestException } from "@nestjs/common";

export class InvalidReportException extends BadRequestException{
  constructor(message: string) {
    super(message, "InvalidReportException");
  }
}