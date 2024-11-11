import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(RegisterNersingCommand)
export class RegisterNersingHandler {
  constructor() {}

  async execute(command: RegisterNersingCommand): Promise<void> {
    console.log('RegisterNersingHandler -> execute -> command', command);
  }
}
