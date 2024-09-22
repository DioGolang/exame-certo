// import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
// import { CreateClinicCommand } from './create-clinic.command';
// import { Inject } from '@nestjs/common';
// import { ClinicCommandRepository } from '../../../domain/repositories/clinic-command.repository';
//
// @CommandHandler(CreateClinicCommand)
// export class CreateClinicHandler
//   implements ICommandHandler<CreateClinicCommand>
// {
//   constructor(
//     @Inject('ClinicCommandRepository')
//     private readonly clinicRepository: ClinicCommandRepository,
//     @Inject('BuilderFactory')
//     private readonly clinicBuilder: BuilderFactory,
//   ) {}
// }
