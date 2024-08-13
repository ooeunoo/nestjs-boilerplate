import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SigninModel {
  @Field()
  accessToken: string;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  email?: string;
}
