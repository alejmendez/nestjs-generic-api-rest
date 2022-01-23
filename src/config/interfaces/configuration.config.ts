import { DatabaseConfig } from './database.config';
import { AppConfig } from './app.config';

export interface ConfigurationConfig {
  database: DatabaseConfig;
  app: AppConfig;
}
