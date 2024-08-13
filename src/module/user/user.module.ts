import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entity/user.entity';
import { HashUtil } from '../../shared/util/hash.util';
import { UserRepository } from './user.repository';
import { userProviders } from './user.provider';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    ...userProviders,
    UserService,
    UserResolver,
    HashUtil,
    UserRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
