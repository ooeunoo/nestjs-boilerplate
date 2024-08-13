import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class SignUpInput {
  @Field(() => String, { description: '사용자 이름' })
  @IsString()
  @MinLength(2)
  name: string;

  @Field(() => String, { description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: '사용자 비밀번호' })
  @IsString()
  @MinLength(8)
  password: string;
}
