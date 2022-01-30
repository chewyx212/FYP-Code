import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { SignInPayload } from './payload.interface';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { UsersRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepo: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepo.createUser(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<SignInPayload> {
    const { email, password } = signInDto;
    const user = await this.userRepo.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const token = await this.jwtService.sign(payload);
      const signin: SignInPayload = { user, token };
      return signin;
    } else {
      throw new UnauthorizedException('Pleace check your login credential');
    }
  }
}
