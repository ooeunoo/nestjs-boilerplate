import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignupModel {
  @Field()
  accessToken: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  email?: string;
}
