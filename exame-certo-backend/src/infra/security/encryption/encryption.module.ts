import { Module } from '@nestjs/common';
import { BcryptPasswordHashImpl } from './bcrypt-password-hash-impl';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'PasswordHash',
      useClass: BcryptPasswordHashImpl,
    },
  ],
  exports: ['PasswordHash'],
})
export class EncryptionModule {}
