import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => String, { description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: '사용자 비밀번호' })
  @IsString()
  password: string;
}
