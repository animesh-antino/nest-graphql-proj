import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/graphql/models/User";
import { UserSetting } from "src/graphql/models/userSetting";
import { CreateUserSettingsInput } from "src/graphql/utils/CreateUserSettingsInput";
import { Repository } from "typeorm";

@Injectable()
export class UserSettingService{
    constructor(
        @InjectRepository(UserSetting) private userSettingsRepository: Repository<UserSetting>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    getUserSettingById(userId: number){
        return this.userSettingsRepository.findOneBy({userId})
    }

    async createUserSettings(createUserSettingsData: CreateUserSettingsInput){
        const findUser = await this.userRepository.findOneBy({
            id: createUserSettingsData.userId,
        })

        if(!findUser) throw new Error('User not Found');
        
        const newUserSetting = this.userSettingsRepository.create(createUserSettingsData)

        const savedSettings = await this.userSettingsRepository.save(newUserSetting);
    
        findUser.settings = savedSettings;
        await this.userRepository.save(findUser);

        return savedSettings;
    
    }
}