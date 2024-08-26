import { BadRequestException } from "@nestjs/common";


export class InvalidExamException extends BadRequestException {
  constructor(message: string) {
    super(message, "InvalidExamException");
  }
}