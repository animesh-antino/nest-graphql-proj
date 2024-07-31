import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserSetting } from "../models/userSetting";
import { CreateUserSettingsInput } from "../utils/CreateUserSettingsInput";

@Resolver()
export class UserSettingsResolver{
    @Mutation(()=>UserSetting)
    createUserSettings(@Args('createUserSettingsData') createUserSettingsData: CreateUserSettingsInput){
        createUserSettingsData: CreateUserSettingsInput
        }
    
}