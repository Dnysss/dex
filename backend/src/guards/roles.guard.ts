import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../auth/dtos/loginPayload.dto';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { authorizationToLoginPayload } from 'src/utils/base-64-converter';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      this.logger.warn('Authorization header is missing');
      return false;
    }

    const token = authorization.split(' ')[1];
    const loginPayload: LoginPayload | undefined = authorizationToLoginPayload(authorization);

    if (!loginPayload) {
      this.logger.warn('Invalid token payload');
      return false;
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      this.logger.warn('Token verification failed');
      return false;
    }

    const hasRole = requiredRoles.some((role) => role === loginPayload.typeUser);

    if (!hasRole) {
      this.logger.warn(`User does not have the required roles: ${requiredRoles}`);
    }

    return hasRole;
  }
}
