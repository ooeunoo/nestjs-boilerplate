import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateUserInput } from './create_user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;
}
