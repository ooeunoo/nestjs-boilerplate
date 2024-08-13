import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { SignupModel } from './model/signup.model';
import { SigninModel } from './model/signin.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignupModel)
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<SignupModel> {
    const result = await this.authService.signUp(signUpInput);
    return result;
  }

  @Mutation(() => SigninModel)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<SigninModel> {
    return this.authService.signIn(signInInput);
  }
}
