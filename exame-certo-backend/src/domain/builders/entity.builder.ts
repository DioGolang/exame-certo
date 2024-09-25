// abstract class BaseBuilder<TProps, TEntity> {
//   protected _id: string;
//   protected _password?: string;
//   protected encryptedPassword?: string;
//   protected _props: Partial<TProps> = {};
//   protected _anamnesis: Anamnesis[] = [];
//   protected _exams: Exam[] = [];
//   protected _doctors: Doctor[] = [];
//
//   constructor(id: string, encryptedPassword?: string, password?: string) {
//     this._id = id;
//     this.encryptedPassword = encryptedPassword;
//     this._password = password;
//   }
//
//   public withEmail(email: string): this {
//     this._props.email = Email.create(email);
//     return this;
//   }
//
//   public withAddress(address: AddressDto): this {
//     this._props.address = Address.fromDto(address);
//     return this;
//   }
//
//   public withContactInfo(contactInfoDto: ContactInfoDto): this {
//     this._props.contactInfo = ContactInfo.fromDto(contactInfoDto);
//     return this;
//   }
//
//   public withAnamnesis(anamnesis: Anamnesis[]): this {
//     this._anamnesis = anamnesis;
//     return this;
//   }
//
//   public withExams(exam: Exam[]): this {
//     this._exams = exam;
//     return this;
//   }
//
//   public withDoctors(doctor: Doctor[]): this {
//     this._doctors = doctor;
//     return this;
//   }
//
//   public async getFinalPasswordHash(): Promise<string> {
//     return PasswordUtils.determinePasswordHash(this._password, this.encryptedPassword);
//   }
//
//   protected abstract validateRequiredProperties(): void;
//   protected abstract addRelationships(entity: TEntity): void;
//
//   public async build(): Promise<TEntity> {
//     this.validateRequiredProperties();
//     const finalPasswordHash = await this.getFinalPasswordHash();
//     const entity = this.createEntity(finalPasswordHash);
//     this.addRelationships(entity);
//     return entity;
//   }
//
//   protected abstract createEntity(finalPasswordHash: string): TEntity;
// }
