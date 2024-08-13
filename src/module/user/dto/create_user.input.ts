import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { PASSWORD_MIN_LENGTH } from '../../../shared/constant/app.constant';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(PASSWORD_MIN_LENGTH)
  password: string;

  @Field()
  @IsNotEmpty()
  name: string;
}
