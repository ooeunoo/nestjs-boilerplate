import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { JwtAuthGuard } from '../../core/guard/jwt-auth.guard';
import { CurrentUser } from '../../core/decorator/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    console.log(user);
    return user;
  }
}
