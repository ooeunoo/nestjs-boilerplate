import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignupModel {
  @Field()
  access_token: string;

  @Field({ nullable: true })
  user_id?: string;

  @Field({ nullable: true })
  email?: string;
}
