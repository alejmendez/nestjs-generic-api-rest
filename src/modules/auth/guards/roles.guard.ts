import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Roles } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  protected rolesAllowedInTheClass: Roles[] = [];
  protected rolesAllowedInTheHandler: Roles[] = [];
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    this.initRolesAllowed(context);

    const user = this.getCurrentUser(context);

    if (this.isPublic()) {
      return true;
    }

    return this.reviewPermissions(user);
  }

  initRolesAllowed(context: ExecutionContext) {
    this.rolesAllowedInTheClass = this.reflector.get<Roles[]>(
      ROLES_KEY,
      context.getClass(),
    );
    this.rolesAllowedInTheHandler = this.reflector.get<Roles[]>(
      ROLES_KEY,
      context.getHandler(),
    );
  }

  getCurrentUser(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    return user;
  }

  isPublic() {
    if (!this.rolesAllowedInTheClass && !this.rolesAllowedInTheHandler) {
      return true;
    }
    if (
      this.rolesAllowedInTheClass?.includes(Roles.AUTH) ||
      this.rolesAllowedInTheHandler?.includes(Roles.AUTH)
    ) {
      return true;
    }
    return false;
  }

  reviewPermissions(user: PayloadToken) {
    if (this.rolesAllowedInTheClass && this.rolesAllowedInTheHandler) {
      return this.validateByHandlerAndClass(user);
    }

    if (this.rolesAllowedInTheClass) {
      return this.isValid(user, this.rolesAllowedInTheClass);
    }

    if (this.rolesAllowedInTheHandler) {
      return this.isValid(user, this.rolesAllowedInTheHandler);
    }

    return true;
  }

  validateByHandlerAndClass(user) {
    this.isValid(user, this.rolesAllowedInTheClass);
    this.isValid(user, this.rolesAllowedInTheHandler);
    return true;
  }

  isValid(user, rolesAllowed) {
    const isValid = this.userIsAllowed(user, rolesAllowed);
    if (!isValid) {
      throw new UnauthorizedException('your role is wrong');
    }
    return true;
  }

  userIsAllowed(user, rolesAllowed) {
    return rolesAllowed.some((role) => role === user.role);
  }
}
