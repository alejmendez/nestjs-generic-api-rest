import { PaginationConfig } from './pagination.config';

export interface AppConfig {
  debug: boolean;
  appPort: number;
  appUrl: string;
  jwtSecret: string;
  pagination: PaginationConfig;
}
