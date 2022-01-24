import { SetMetadata } from '@nestjs/common';

import { Roles as RolesEnum } from '../models/roles.model';

export const ROLES_KEY = 'roles';

export const AllowedRoles = (...roles: RolesEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
