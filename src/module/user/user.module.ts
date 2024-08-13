import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { HashUtil } from '../../shared/util/hash.util';
import { UserEntity } from '../../core/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, HashUtil],
  exports: [UserService],
})
export class UserModule {}
