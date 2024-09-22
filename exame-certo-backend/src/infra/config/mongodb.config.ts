import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongodbConfig: MongooseModuleOptions = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/exame-certo',
};
