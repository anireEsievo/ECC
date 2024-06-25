// import necessary dependencies
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import constants from './constants';
import { UserService } from './user/user.service';

// this class will be injected using DI into any controller class where there are protected endpoints
// it serves as a middleware and can be attached to a route or group of routes
@Injectable()
export class AuthGuard implements CanActivate {
  // jwts will be decrypted and validated hence the jwt class is injected through DI
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // execution context provides request details(headers etc)
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // bearer token attached by the client
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new ForbiddenException();
    }
    // ensure the user is still on the same device making the request
    const user = await this.userService.findOne({ access_token: token });
    if (!user) throw new ForbiddenException();

    // verifying the token and assigning the payload to the request object
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: constants(),
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  // method to remove token from bearer string
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
