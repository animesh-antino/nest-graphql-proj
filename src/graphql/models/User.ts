import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSetting } from './userSetting';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'}) // this is so that we do not have to make saperate classes for typeorm and graphql
@ObjectType()
export class User {
  @PrimaryGeneratedColumn() //this is to tell typeorm that there is a column hich is going to be auto generated
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @Field({nullable: true})
  settings?: UserSetting;
}
