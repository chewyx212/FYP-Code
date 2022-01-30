import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto/auth.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInPayload } from './payload.interface';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto): Promise<SignInPayload> {
    return this.authService.signIn(signInDto);
  }

}
