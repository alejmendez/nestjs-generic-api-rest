import { DatabaseConfig } from './database.config';
import { PaginationConfig } from './pagination.config';

export interface ConfigurationConfig {
  database: DatabaseConfig;
  debug: boolean;
  appPort: number;
  appUrl: string;
  jwtSecret: string;
  pagination: PaginationConfig;
}
