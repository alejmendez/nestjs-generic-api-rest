import { Global, Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';

import { enviroments } from '../enviroments';
import configuration from './configuration';
import validationSchema from './schema';

@Global()
@Module({
  imports: [
    Config.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [configuration],
      isGlobal: true,
      validationSchema,
    }),
  ],
})
export class ConfigModule {}
