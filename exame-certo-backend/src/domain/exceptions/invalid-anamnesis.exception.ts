import { BadRequestException } from "@nestjs/common";

export class InvalidAnamnesisException extends BadRequestException{
  constructor(message: string) {
    super(message, "InvalidAnamnesisException");
  }
}