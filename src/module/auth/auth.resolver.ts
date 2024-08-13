import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './input/signup.input';
import { SignInInput } from './input/signin.input';
import { SignupModel } from './model/signup.model';
import { SigninModel } from './model/signin.model';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignupModel)
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<SignupModel> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => SigninModel)
  async signIn(
    @Args('signInInput') signInInput: SignInInput,
  ): Promise<SigninModel> {
    return this.authService.signIn(signInInput);
  }
}
