import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ unique: true })
  @Field(() => String, { description: '사용자 이메일' })
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String, { description: '사용자 이름', nullable: true })
  name?: string;

  @CreateDateColumn()
  @Field(() => Date, { description: '생성일' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: '수정일' })
  updatedAt: Date;
}
