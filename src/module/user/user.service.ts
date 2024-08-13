import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../core/entity/user.entity';
import { User } from './model/user.model';
import { CreateUserInput } from './input/create_user.input';
import { UpdateUserInput } from './input/update_user.input';
import { HashUtil } from '../../shared/util/hash.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private hashUtil: HashUtil,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserInput);
    const savedUser = await this.userRepository.save(user);
    return this.#mapEntityToModel(savedUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map(this.#mapEntityToModel);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return this.#mapEntityToModel(user);
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserInput.password) {
      updateUserInput.password = await this.hashUtil.hash(
        updateUserInput.password,
      );
    }
    Object.assign(user, updateUserInput);
    const updatedUser = await this.userRepository.save(user);
    return this.#mapEntityToModel(updatedUser);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  #mapEntityToModel(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
