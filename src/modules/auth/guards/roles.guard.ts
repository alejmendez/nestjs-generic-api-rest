import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Roles } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rolesAllowedInTheClass = this.reflector.get<Roles[]>(
      ROLES_KEY,
      context.getClass(),
    );
    const rolesAllowedInTheHandler = this.reflector.get<Roles[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    if (!rolesAllowedInTheClass && !rolesAllowedInTheHandler) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;

    if (rolesAllowedInTheClass && rolesAllowedInTheHandler) {
      return this.validateByHandlerAndClass(
        user,
        rolesAllowedInTheClass,
        rolesAllowedInTheHandler,
      );
    }

    if (rolesAllowedInTheClass) {
      return this.validateByClass(user, rolesAllowedInTheClass);
    }

    if (rolesAllowedInTheHandler) {
      return this.validateByHandler(user, rolesAllowedInTheHandler);
    }

    return true;
  }

  validateByClass(user, rolesAllowedInTheClass): boolean {
    const isValid = rolesAllowedInTheClass.some((role) => role === user.role);
    if (!isValid) {
      throw new UnauthorizedException('your role is wrong');
    }
    return true;
  }

  validateByHandler(user, rolesAllowedInTheHandler): boolean {
    const isValid = rolesAllowedInTheHandler.some((role) => role === user.role);
    if (!isValid) {
      throw new UnauthorizedException('your role is wrong');
    }
    return true;
  }

  validateByHandlerAndClass(
    user,
    rolesAllowedInTheClass,
    rolesAllowedInTheHandler,
  ): boolean {
    const isValidClass = rolesAllowedInTheClass.some(
      (role) => role === user.role,
    );
    const isValidHandler = rolesAllowedInTheHandler.some(
      (role) => role === user.role,
    );
    if (!isValidClass || !isValidHandler) {
      throw new UnauthorizedException('your role is wrong');
    }
    return true;
  }
}
