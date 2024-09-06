import { Module } from '@nestjs/common';
import { BcryptPasswordHashImpl } from "../infra/services/bcrypt-password-hash-impl";
import { PasswordHash } from "../application/interfaces/hasher.interface";
import { PasswordUtils } from "./utils/password.utils";

@Module({
  providers: [
    {
      provide: 'PASSWORD_HASH',
      useClass: BcryptPasswordHashImpl,
    },
    {
      provide: 'PASSWORD_UTILS',
      useFactory: async (passwordHash: PasswordHash) => {
        PasswordUtils.configure(passwordHash);
        return PasswordUtils;
      },
      inject: ['PASSWORD_HASH'],
    },
  ],
  exports: ['PASSWORD_UTILS'],
})
export class SharedModule {}
