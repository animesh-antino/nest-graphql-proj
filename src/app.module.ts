import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserSettingsResolver } from './graphql/resolvers/UserSettingResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/models/User';
import { UserSetting } from './graphql/models/userSetting';
import { UsersModule } from './users/users.module';
import { UserResolver } from './users/UserResolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host:'localhost',
      port: 3306,
      username: 'root',
      password: '1234567890',
      database: 'graphql_tutorial',
      entities: [User, UserSetting],
      synchronize: true,

    }),
    UsersModule
  ],
  controllers: [],
  // providers: [UserResolver, UserSettingsResolver],
})
export class AppModule {}
