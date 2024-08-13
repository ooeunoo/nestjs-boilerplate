import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { HashUtil } from '../../shared/util/hash.util';
import { ErrorCode } from 'src/core/exception/error';
import { CustomException } from 'src/core/exception/custom_exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashUtil: HashUtil,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const existingUser = await this.userService.findByEmail(signUpInput.email);

    if (existingUser) {
      throw new CustomException(ErrorCode.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await this.hashUtil.hash(signUpInput.password);
    const user = await this.userService.create({
      ...signUpInput,
      password: hashedPassword,
    });
    const token = this.generateToken(user);
    return {
      access_token: token.access_token,
      user_id: user.id,
      email: user.email,
    };
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.userService.findByEmail(signInInput.email);
    if (!user) {
      throw new CustomException(ErrorCode.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await this.hashUtil.compare(
      signInInput.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.generateToken(user);
    return {
      access_token: token.access_token,
      user_id: user.id,
      email: user.email,
    };
  }

  private generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
