import { Module } from '@nestjs/common';
import { UserResolver } from './UserResolver';
import { UserService } from './UserService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';
import { UserSettingService } from './UserSettingService';
import { UserSetting } from 'src/graphql/models/userSetting';
import { UserSettingsResolver } from 'src/graphql/resolvers/UserSettingResolver';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserSetting])],
    providers:[UserResolver, UserService, UserSettingService,UserSettingsResolver]
})
export class UsersModule {}
