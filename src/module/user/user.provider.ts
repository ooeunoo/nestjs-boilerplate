import { Provider } from '@nestjs/common';
import { USER_REPOSITORY } from './user.constant';
import { UserRepository } from './user.repository';

export const userProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
];
