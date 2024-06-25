import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PasswordService } from './password/password.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
// import { createCipheriv, randomBytes, scrypt } from 'crypto';
// import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';

// this service contains methods for authenticating users
@Injectable()
export class AuthService {
  // injection of required services
  constructor(
    private configService: ConfigService,
    private usersService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  // confirms a user doesnt exist and creates a new one
  async register(signUpDto: SignUpDto) {
    const user = await this.usersService.findOne({
      user_name: signUpDto.userName,
    });
    if (user) {
      throw new ForbiddenException('User already Exists');
    }
    const hash = await this.passwordService.hashPassword(signUpDto.password);

    // const iv = randomBytes(16);
    // const crPassword = this.configService.get<string>('ENCRYPTION_PASSWORD');

    // // The key length is dependent on the algorithm.
    // // In this case for aes256, it is 32 bytes.
    // const key = (await promisify(scrypt)(crPassword, 'salt', 32)) as Buffer;

    // const cipher = createCipheriv('aes-256-ctr', key, iv);
    // const cipher2 = createCipheriv('aes-256-ctr', key, iv);

    // const encryptedPrivateKey = Buffer.concat([
    //   cipher.update(signUpDto.privateKey),
    //   cipher.final(),
    // ]);

    // const encryptedPublicKey = Buffer.concat([
    //   cipher2.update(signUpDto.publicKey),
    //   cipher2.final(),
    // ]);

    const dto = {
      user_name: signUpDto.userName,
      hash,
      public_key: signUpDto.publicKey,
      private_key: signUpDto.privateKey,
      // iv: iv.toString('hex'),
    };
    await this.usersService.create(dto);
    return signUpDto;
  }

  // signs in an existing user with a correct password
  async signIn(userName: string, password: string) {
    const user = await this.usersService.findOne({ user_name: userName });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await this.passwordService.comparePassword(
      password,
      user.hash,
    );

    if (!isMatch) {
      throw new UnauthorizedException('password mismatch');
    }

    const payload = { sub: user._id, userName: user.user_name };
    const access_token = await this.jwtService.signAsync(payload);

    const dto = {
      access_token,
      refresh_valid_till: Date.now() + 96 * 60 * 60 * 1000,
    };

    await this.usersService.update(user._id, dto);
    return {
      ...user,
      hash: undefined,
      refresh_valid_till: undefined,
      access_token,
    };
  }

  // refreshes the user and renews their access token if it has expired
  async refresh(token: string) {
    if (!token || token == ' ') {
      throw new UnauthorizedException('No access token in params');
    }
    const user = await this.usersService.findOne({ access_token: token });

    if (!user) throw new ForbiddenException('User not found');

    if (new Date(user.refresh_valid_till).getTime() < Date.now())
      throw new ForbiddenException('Refresh token expired');

    let newAccessToken: string;

    try {
      await this.jwtService.verifyAsync(token);
      newAccessToken = token;
    } catch (error: any) {
      if (error.name == 'TokenExpiredError') {
        const payload = { sub: user._id, userName: user.user_name };
        newAccessToken = await this.jwtService.signAsync(payload);
        const dto = {
          access_token: newAccessToken,
        };
        await this.usersService.update(user._id, dto);
      } else {
        throw new UnauthorizedException(error.message);
      }
    }
    return {
      ...user,
      hash: undefined,
      // private_key: undefined,
      refresh_valid_till: undefined,
      access_token: newAccessToken,
    };
  }

  // logs the user out of the session
  async logOut(id: string) {
    const dto = {
      access_token: '',
      refresh_valid_till: 0,
    };
    await this.usersService.update(id, dto);
    return {
      message: 'success',
    };
  }
}
